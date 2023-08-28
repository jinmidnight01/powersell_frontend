import { React, useState, useEffect } from "react";
import axios from "axios";

import StatusButton from "./StatusButton";
import hostURL from "../../hostURL";

import styles from "./admin.module.css";
import spinner from "../../images/icons/spinner.gif";

const OrderListPage = (props) => {
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState("전체");
  const [isLoading, setIsLoading] = useState(true);
  const selectDict = {
    전체: "",
    입금대기: "WAITING",
    배송중: "DELIVERING",
    배송완료: "ARRIVED",
    주문취소: "CANCELED",
  };

  // function: select standard
  const handleSelect = (e) => {
    setSelected(e.target.value);
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
      {/* sort selectBox */}
      <div style={{display:"flex", justifyContent:"space-between"}}>
        <select onChange={handleSelect} value={selected} style={{marginLeft: "15px"}}>
          {Object.keys(selectDict).map((status) => (
            <option value={status} key={status}>
              {status}
            </option>
          ))}
        </select>
        <span style={{marginRight: "15px"}}>주문: {result.length}개</span>
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
        {[...result]
          .sort((a, b) => {
            if (a.orderDate > b.orderDate) return -1;
            if (a.orderDate < b.orderDate) return 1;
            return 0;
          })
          .filter((order) => {
            if (selected === "전체") {
              return true;
            }
            return order.orderStatus === selectDict[selected];
          })
          .map((order) => (
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
                      <span>주문 일시</span>: {order.orderDate.replace("T", " ").slice(0, 19)}
                    </div>
                    <div>
                      <span>주소</span>: {order.address} {order.dongho}
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
      </div>)}
    </div>
  );
};

export default OrderListPage;
