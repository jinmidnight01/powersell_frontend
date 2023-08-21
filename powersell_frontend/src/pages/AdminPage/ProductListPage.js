import { React, useState, useEffect } from "react";

import axios from "axios";

import hostURL from "../../hostURL";

import styles from "./admin.module.css";
import ProductModal from "./ProductModal";

const ProductListPage = (props) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isClicked, setIsClicked] = useState(0);
  const [toggleStatus, setToggleStatus] = useState("+");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // REST API 2-1
  useEffect(() => {
    if (props.status === 200) {
      axios
        .get(`${hostURL}/api/items`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.status, isClicked]);

  // function: toggle button
  const toggle = () => {
    const btnElement = document.getElementById("addProductToggle");
    const form = document.getElementById("form");

    if (btnElement.value === "+") {
      setToggleStatus("-");
      form.style.display = "block";
    } else {
      setToggleStatus("+");
      form.style.display = "none";
    }
  };

  // function: input value update
  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "originalPrice":
        setOriginalPrice(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      case "stockQuantity":
        setStockQuantity(e.target.value);
        break;
      case "startDate":
        setStartDate(e.target.value);
        break;
      case "endDate":
        setEndDate(e.target.value);
        break;
      default:
        break;
    }
  };

  // function: product update
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };
  const combinedClickHandler = (product) => {
    handleProductClick(product);
  };
  const handleSave = (updatedProduct) => {
    axios
      .put(`${hostURL}/api/items/${updatedProduct.itemId}`, updatedProduct)
      .then((response) => {
        if (isClicked === 0) {
          setIsClicked(1);
        } else {
          setIsClicked(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // REST API 2-2
  const handleClick = () => {
    if (name.length === 0 || startDate.length === 0 || endDate.length === 0) {
      alert("모든 항목을 입력해주세요")
      return;
    }
    const inputs = {
      // itemId: 6,
      name: name,
      originalPrice: Number(originalPrice),
      price: Number(price),
      stockQuantity: Number(stockQuantity),
      startDate: startDate.replace("T", " "),
      endDate: endDate.replace("T", " "),
    };
    console.log(typeof(inputs.originalPrice))

    axios
      .post(`${hostURL}/api/admin/items`, inputs)
      .then((response) => {
        setName("");
        setOriginalPrice(0);
        setPrice(0);
        setStockQuantity(0);
        setStartDate("");
        setEndDate("");
        setToggleStatus("-");
        if (isClicked === 0) {
          setIsClicked(1);
        } else {
          setIsClicked(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // REST API 3-1
  useEffect(() => {
    if (props.status === 200) {
      axios
        .get(`${hostURL}/api/admin/feedbacks`)
        .then((response) => {
          setFeedbacks(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.status]);

  return (
    <div className={styles.product_main}>
      {/* 상품 수정 Modal */}
      {selectedProduct && (
        <div className={styles.productUpdate}>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onSave={handleSave}
            onChange={handleOnChange}
          />
        </div>
      )}

      {/* 상품 목록 */}
      <h2>1. 상품 목록</h2>
      <div className={styles.productTitle}>
        <div>ID</div>
        <div>상품명</div>
        <div>원가</div>
        <div>정가</div>
        <div>재고</div>
      </div>

      {/* 상품 */}
      {[...products].map((product) => {
        let productNewName;
        switch (product.name) {
          case "제주 삼다수 2L (6개입)":
            productNewName = "삼다수";
            break;
          case "농심 신라면 (5개입)":
            productNewName = "신라면";
            break;
          case "햇반 백미밥 210g (3개입)":
            productNewName = "햇반";
            break;
          case "오뚜기 컵밥 오삼불고기덮밥 310g":
            productNewName = "컵밥";
            break;
          case "곰곰 구운란 10구":
            productNewName = "구운란";
            break;
          default:
            productNewName = product.name;
            break;
        }

        return (
          <div
            onClick={() => combinedClickHandler(product)}
            key={product.itemId}
          >
            <div className={styles.productStyle}>
              <div>{product.itemId}</div>
              <div>{productNewName}</div>
              <div>{product.originalPrice}</div>
              <div>{product.price}</div>
              <div>{product.stockQuantity}</div>
            </div>
          </div>
        );
      })}

      {/* 상품 추가 */}
      <input
        type="button"
        id="addProductToggle"
        className={styles.addProductToggle}
        onClick={toggle}
        value={toggleStatus}
      ></input>
      <div id="form" className={styles.addProduct}>
        <div>
          <div>ㆍ품명:</div>
          <input
            name="name"
            onChange={handleOnChange}
            type="text"
            placeholder=" ex. 제주 삼다수 2L (6개입)"
            value={name}
          ></input>
        </div>
        <div>
          <div>ㆍ원가:</div>
          <input
            name="originalPrice"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 6600"
            value={originalPrice}
          ></input>
        </div>
        <div>
          <div>ㆍ정가:</div>
          <input
            name="price"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 1400"
            value={price}
          ></input>
        </div>
        <div>
          <div>ㆍ재고:</div>
          <input
            name="stockQuantity"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 25"
            value={stockQuantity}
          ></input>
        </div>
        <div>
          <div>ㆍ오픈:</div>
          <input
            name="startDate"
            onChange={handleOnChange}
            type="datetime-local"
            step="1"
            value={startDate}
          ></input>
        </div>
        <div>
          <div>ㆍ마감:</div>
          <input
            name="endDate"
            onChange={handleOnChange}
            type="datetime-local"
            step="1"
            value={endDate}
          ></input>
        </div>
        <button onClick={handleClick}>등록</button>
      </div>

      {/* 후기 목록 */}
      <div className={styles.interval}></div>
      <h2>2. 후기 목록</h2>
      <div className={styles.feedbackTitle}>
        <div>ID</div>
        <div>후기</div>
      </div>

      {/* 후기 */}
      {[...feedbacks].reverse().map((feedback) => (
        <div key={feedback.id} className={styles.feedbackStyle}>
          <div>{feedback.id}</div>
          <div>{feedback.content}</div>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage;
