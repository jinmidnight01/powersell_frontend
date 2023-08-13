import { React, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";

import account from "../../images/orderSuccess/account.png";
import bag from "../../images/orderSuccess/shopping-bag.png";
import scooter from "../../images/orderSuccess/scooter.png";

import styles from "./OrderSuccessPage.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import orderData from "../../data/orderData";

// Authentication function
const OrderSuccessPage = () => {
  const location = useLocation();
  const { product, quantity } = location.state;
  const [number1, setNum1Value] = useState("");
  const [number2, setNum2Value] = useState("");
  const [number3, setNum3Value] = useState("");
  const [pw, setPwValue] = useState("");
  const [isPending, setIsPending] = useState(false);

  const onChange = (e) => {
    if (e.target.name === "number1") {
      setNum1Value(e.target.value);
    } else if (e.target.name === "number2") {
      setNum2Value(e.target.value);
    } else if (e.target.name === "number3") {
      setNum3Value(e.target.value);
    } else if (e.target.name === "password") {
      setPwValue(e.target.value);
    }
  };


  return (
    <div id="pcWidth">
      {/* header */}
      <Header text="주문 완료"></Header>

      {/* main */}
      <div className={styles.main}>
        <div className={styles.success_noti}>
          <h2>주문이 완료되었습니다</h2>
        </div>

        {/* 송금 계좌 */}
        <div>
          <div className={styles.receipt_Title}>
            <img src={account} alt=""></img>
            <div>송금 계좌</div>
          </div>
          <hr className={styles.line}/>
          <ul>
            <li>예금주: 박진효</li>
            <li>송금 계좌: 카카오뱅크 XXXX</li>
            <p>(30분 내 미입금 시 주문이 취소됩니다)</p>
          </ul>
        </div>

        {/* 결제 정보 */}
        <div>
          <div className={styles.receipt_Title}>
            <img src={bag} alt=""></img>
            <div>결제 정보</div>
          </div>
          <hr />
          {/* item title */}
            
              <div style={{marginBottom: '10px'}}>
                <div className={styles.order_itemTitle}>
                  <div>
                    <img src={product.thumbnail} alt={product.Name} />
                  </div>
                  <div>
                    <div className={styles.order_itemInfo_title}>
                      {product.name}
                    </div>
                    <div className={styles.order_itemInfo_number}>
                      {product.salePrice}원 / {quantity}개
                    </div>
                  </div>
                </div>
                <div className={styles.order_payment}>
                  <div>
                    <div>
                      <p>총 상품 금액</p>
                      <div>{(product.originalPrice * quantity).toLocaleString()}원</div>
                    </div>
                    <div>
                      <p>할인 금액</p>
                      <div>
                        {(product.originalPrice * quantity -
                          product.salePrice * quantity).toLocaleString()}
                        원
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className={styles.order_payment}>
                    <div>
                      <div>
                        <p className={styles.borderText}>최종 결제금액</p>
                        <div className={styles.borderText}>{(product.salePrice * quantity).toLocaleString()}원</div>
                      </div>
                    </div>
                  </div>
              </div>
            
        </div>

        {/* 주문 정보: REST API */}
        <div style={{marginBottom: '40px'}}>
          <div className={styles.receipt_Title}>
            <img src={scooter} alt=""></img>
            <div>주문 정보</div>
          </div>
          <hr />
          {orderData.map((datum) => (
            <ul key={datum.id}>
              <li>주문일시: {datum.orderTime}</li>
              <li>주문자: {datum.name}</li>
              <li>전화번호: {datum.phoneNumber}</li>
              <li>주소: {datum.address}</li>
              <li>비밀번호: {datum.password}</li>
            </ul>
          ))}
        </div>

        {/* confirm button (REST API) */}
        <Link to={"/"}>
        <Button text="돌아가기" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
