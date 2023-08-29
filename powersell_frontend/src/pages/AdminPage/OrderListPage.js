import { React, useState, useEffect } from "react";
import axios from "axios";

import StatusButton from "./StatusButton";

import hostURL from "../../hostURL";

import styles from "./admin.module.css";
import spinner from "../../images/icons/spinner.gif";

const OrderListPage = (props) => {
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState("배송전체");
  const [productSelected, setProductSelected]= useState("상품전체");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchCount, setSearchCount] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchNumber, setSearchNumber] = useState("");
  const selectDict = {
    배송전체: "",
    입금대기: "WAITING",
    배송중: "DELIVERING",
    배송완료: "ARRIVED",
    주문취소: "CANCELED",
  };
  const productDict = {
    상품전체: "",
    삼다수: "제주 삼다수 2L (6개입)",
    햇반: "햇반 백미밥 210g (3개입)",
    컵밥: "오뚜기 컵밥 오삼불고기덮밥 310g",
    라면: "농심 신라면 (5개입)",
    구운란: "곰곰 구운란 10구",
  };
  const filteredResult = [...result]
    .sort((a, b) => {
      if (a.orderDate > b.orderDate) return -1;
      if (a.orderDate < b.orderDate) return 1;
      return 0;
    })
    .filter((order) => {
      const page1 = document.getElementById("page1");
      const page2 = document.getElementById("page2");
      if (page === 2) {
        page1.style.backgroundColor = "white";
        page2.style.backgroundColor = "#fa7979";
        return order.orderDate >= "2023-09-04 21:00:00" && order.orderDate <= "2023-09-10 23:59:59";
      }
      else {
        page1.style.backgroundColor = "#fa7979";
        page2.style.backgroundColor = "white";
        return order.orderDate >= "2023-08-28 21:00:00" && order.orderDate <= "2023-09-03 23:59:59";
      }
    })
    .filter((order) => {
      if (selected === "배송전체") {
        return true;
      }
      return order.orderStatus === selectDict[selected];
    })
    .filter((order) => {
      if (productSelected === "상품전체") {
        return true;
      }
      return order.item.name === productDict[productSelected];
    })
    .filter((order) => {
      if (searchCount === "") {
        return true;
      }
      return order.count.toString().replace(" ","").toLocaleLowerCase().includes(searchCount.toLocaleLowerCase().replace(" ",""));
    })
    .filter((order) => {
      if (searchName === "") {
        return true;
      }
      return order.name.toString().replace(" ","").toLocaleLowerCase().includes(searchName.toLocaleLowerCase().replace(" ",""));
    })
    .filter((order) => {
      if (searchNumber === "") {
        return true;
      }
      return order.number.toString().replace(" ","").toLocaleLowerCase().includes(searchNumber.toLocaleLowerCase().replace(" ",""));
    });

  // product count
  let productCount = 0;
  for (let i = 0; i < filteredResult.length; i++) {
    productCount += filteredResult[i].count;
  }

  // function: select standard
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const productSelect = (e) => {
    setProductSelected(e.target.value);
  };

  // search function
  const onChangeCount = (e) => {
    setSearchCount(e.target.value);
  };
  const onChangeName = (e) => {
    setSearchName(e.target.value);
  };
  const onChangeNumber = (e) => {
    setSearchNumber(e.target.value);
  };

  // REST API 1-1
  const [reloadFlag, setReloadFlag] = useState(0);
  useEffect(() => {
    if (props.status === 200) {
      axios
        .get(`${hostURL}/api/admin/orders`)
        .then((response) => {
          setResult(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.status, reloadFlag]);

  return (
    <div className={styles.order_main}>
      {/* test order */}
      <div className={styles.testOrder}>
        <div id="page1" onClick={() => setPage(1)}><div>1</div></div>
        <div id="page2" onClick={() => setPage(2)}><div>2</div></div>
      </div>

      {/* sort selectBox */}
      <div className={styles.selectBox}>
        <div>
          <select onChange={handleSelect} value={selected}>
            {Object.keys(selectDict).map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
          <select onChange={productSelect} value={productSelected}>
            {Object.keys(productDict).map((product) => (
              <option value={product} key={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
        <span>주문/상품: {filteredResult.length}/{productCount}</span>
      </div>

      {/* search bar */}
      <div className={styles.searchBar}>
        <input type="text" placeholder="주문개수" onChange={onChangeCount}/>
        <input type="text" placeholder="주문자명" onChange={onChangeName}/>
        <input type="text" placeholder="전화번호" onChange={onChangeNumber}/>
      </div>

      {/* total order list */}
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ margin: "150px 0" }}
            src={spinner}
            alt="로딩 중..."
            width="15%"
          />
        </div>
      ) : (
        <div className={styles.order_list}>
          {/* item */}
          {filteredResult.map((order) => (
            <div key={order.orderId} className={styles.order_box}>
              <div className={styles.order_item}>
                {/* item title */}
                <div className={styles.order_itemTitle}>
                  <div>
                    <div>{order.orderId}</div>
                  </div>
                  <div>
                    <div>{order.item.name}</div>
                    <div>
                      {order.item.price}원 / {order.count}개
                    </div>
                  </div>
                </div>

                {/* delivery */}
                <StatusButton
                  orderId={order.orderId}
                  orderStatus={order.orderStatus}
                  reloadFlag={reloadFlag}
                  setReloadFlag={setReloadFlag}
                />

                {/* order information */}
                <div className={styles.order_information}>
                  <hr></hr>
                  <div>
                    <div>
                      <span>주문자</span>: {order.name}
                    </div>
                    <div>
                      <span>전화번호</span>: {order.number}
                    </div>
                    <div>
                      <span>주문 일시</span>:{" "}
                      {order.orderDate.replace("T", " ").slice(0, 19)}
                    </div>
                    <div>
                      <span>주소</span>: ({order.zipcode}) {order.address} {order.dongho}
                    </div>
                  </div>
                </div>

                {/* payment */}
                <div className={styles.order_payment}>
                  <hr></hr>
                  <div>
                    <div>
                      <p>총 상품 금액</p>
                      <div>{order.item.originalPrice * order.count}원</div>
                    </div>
                    <div>
                      <p>할인 금액</p>
                      <div>
                        {order.item.originalPrice * order.count -
                          order.orderPrice}
                        원
                      </div>
                    </div>
                    <div>
                      <p>최종 결제금액</p>
                      <div>{order.orderPrice}원</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
