import { React, useState, useEffect } from "react";
import axios from "axios";

import StatusButton from "./StatusButton";

import hostURL from "../../hostURL";

import styles from "../../css/admin.module.css";
import spinner from "../../images/icons/spinner.gif";

const OrderListPage = (props) => {
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(0);

  // 회차, 배송상태, 상품명, 상품개수, 주문자명, 전화번호
  const [inputs, setInputs] = useState({
    testOrderSelected: "전체",
    statusSelected: "배송상태",
    productSelected: "상품명",
    countSelected: "상품개수",
    searchName: "",
    searchNumber: "",
  });

  const { testOrderSelected, statusSelected, productSelected, countSelected, searchName, searchNumber } = inputs;
  
  // input 객체 생성
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // filter dictionary
  const filterDict = {
    testOrderDict : {
      "BONUS": "BONUS",
      "4회차": "4회차",
      "3회차": "3회차",
      "2회차": "2회차",
      "1회차": "1회차",
      "전체": "전체",
    },
    statusDict : {
      배송상태: "",
      입금대기: "WAITING",
      배송중: "DELIVERING",
      배송완료: "ARRIVED",
      주문취소: "CANCELED",
    },
    productDict : {
      상품명: "",
      삼다수: "제주 삼다수 2L (6개입)",
      햇반: "햇반 백미밥 210g (3개입)",
      컵밥: "오뚜기 컵밥 오삼불고기덮밥 310g",
      라면: "농심 신라면 (5개입)",
      곰곰란: "곰곰 구운란 10구",
      구운란: "[EEE] 무항생제 맥반석 구운계란 (15구)"
    },
    countDict : {
      상품개수: "",
      "1개": 1,
      "2개": 2,
    }
  }

  // filtered result
  const filteredResult = [...result]
    .sort((a, b) => {
      if (a.orderDate > b.orderDate) return -1;
      if (a.orderDate < b.orderDate) return 1;
      return 0;
    })
    .filter((order) => {
      switch (testOrderSelected) {
        case "BONUS":
          return (
            order.orderDate >= "2023-11-20T20:59:00" &&
            order.orderDate <= "2023-11-26T23:59:59"
          );
        case "4회차":
          return (
            order.orderDate >= "2023-09-18T20:59:00" &&
            order.orderDate <= "2023-09-24T23:59:59"
          );
        case "3회차":
          return (
            order.orderDate >= "2023-09-11T20:59:00" &&
            order.orderDate <= "2023-09-17T23:59:59"
          );
        case "2회차":
          return (
            order.orderDate >= "2023-09-04T20:59:00" &&
            order.orderDate <= "2023-09-10T23:59:59"
          );
        case "1회차":
          return (
            order.orderDate >= "2023-08-28T20:59:00" &&
            order.orderDate <= "2023-09-03T23:59:59"
          );
        default:
          return true;
      }
    })
    .filter((order) => {
      if (statusSelected === "배송상태") {
        return true;
      }
      return order.orderStatus === filterDict.statusDict[statusSelected];
    })
    .filter((order) => {
      if (productSelected === "상품명") {
        return true;
      }
      return order.item.name === filterDict.productDict[productSelected];
    })
    .filter((order) => {
      if (countSelected === "상품개수") {
        return true;
      }
      return order.count === filterDict.countDict[countSelected];
    })
    .filter((order) => {
      if (searchName === "") {
        return true;
      }
      return order.name
        .toString()
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchName.toLocaleLowerCase().replace(" ", ""));
    })
    .filter((order) => {
      if (searchNumber === "") {
        return true;
      }
      return order.number
        .toString()
        .replace(" ", "")
        .toLocaleLowerCase()
        .includes(searchNumber.toLocaleLowerCase().replace(" ", ""));
    });

  // product count
  let productCount = 0;
  for (let i = 0; i < filteredResult.length; i++) {
    productCount += filteredResult[i].count;
  }

  // total cost
  let cost = 0;
  for (let i = 0; i < filteredResult.length; i++) {
    cost += filteredResult[i].item.originalPrice * filteredResult[i].count;
  }

  // total revenue
  let revenue = 0;
  for (let i = 0; i < filteredResult.length; i++) {
    revenue += filteredResult[i].orderPrice;
  }

  // REST API 1-1: get all orders
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
      {/* first sort selectBox */}
      <div className={styles.firstSelectBox}>
        <select onChange={onChange} name="testOrderSelected" value={testOrderSelected}>
          {Object.keys(filterDict.testOrderDict).map((testOrder) => (
            <option value={testOrder} key={testOrder}>
              {testOrder}
            </option>
          ))}
        </select>
        <select onChange={onChange} name="statusSelected" value={statusSelected}>
          {Object.keys(filterDict.statusDict).map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <select onChange={onChange} name="productSelected" value={productSelected}>
          {Object.keys(filterDict.productDict).map((product) => (
            <option value={product} key={product}>
              {product}
            </option>
          ))}
        </select>
      </div>

      {/* second sort selectBox */}
      <div className={styles.secondSelectBox}>
        <select onChange={onChange} name="countSelected" value={countSelected}>
          <option value="상품개수">상품개수</option>
          <option value="1개">1개</option>
          <option value="2개">2개</option>
        </select>
        <input type="text" placeholder="주문자명" name="searchName" value={searchName} onChange={onChange} />
        <input type="text" placeholder="전화번호" name="searchNumber" value={searchNumber} onChange={onChange} />
      </div>

      {/* order & payment count */}
      <div className={styles.orderCount}>
        <span>
          주문: {filteredResult.length}개 / 상품: {productCount}개
        </span>
      </div>
      <div className={styles.paymentCount}>
        <span>
          비용: {cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 / 매출: {revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
        </span>
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
                      {order.orderDate.replace("T", " ").slice(0, 24)}
                    </div>
                    <div>
                      <span>주소</span>: ({order.zipcode}) {order.address}{" "}
                      {order.dongho}
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
