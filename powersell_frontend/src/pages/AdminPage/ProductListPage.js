import { React, useState, useEffect } from "react";

import axios from "axios";

import styles from "./admin.module.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [name, setName] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(0);
  const [isClicked, setIsClicked] = useState(0);
  const [toggleStatus, setToggleStatus] = useState("+");

  // REST API 2-1
  useEffect(() => {
    axios
      .get(`/api/items`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isClicked]);

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
      default:
        break;
    }
  };

  // REST API 2-2
  const handleClick = () => {
    const inputs = {
      itemId: 6,
      name: name,
      originalPrice: originalPrice,
      price: price,
      stockQuantity: stockQuantity,
    };

    axios
      .post(`/api/admin/items`, inputs)
      .then((response) => {
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
    axios
      .get(`/api/admin/feedbacks`)
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.product_main}>
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
          <div key={product.itemId} className={styles.productStyle}>
            <div>{product.itemId}</div>
            <div>{productNewName}</div>
            <div>{product.originalPrice}</div>
            <div>{product.price}</div>
            <div>{product.stockQuantity}</div>
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
          <div>ㆍ상품명:</div>
          <input
            name="name"
            onChange={handleOnChange}
            type="text"
            placeholder=" ex. 삼다수"
          ></input>
        </div>
        <div>
          <div>ㆍ원가:</div>
          <input
            name="originalPrice"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 6600"
          ></input>
        </div>
        <div>
          <div>ㆍ정가:</div>
          <input
            name="price"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 1400"
          ></input>
        </div>
        <div>
          <div>ㆍ재고:</div>
          <input
            name="stockQuantity"
            onChange={handleOnChange}
            type="number"
            placeholder=" ex. 25"
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
