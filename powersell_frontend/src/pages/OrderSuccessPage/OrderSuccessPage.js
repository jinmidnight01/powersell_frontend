import { React } from "react";
import { useLocation } from "react-router-dom";

import Header from "../../components/Header";

import account from "../../images/orderSuccess/account.png";
import bag from "../../images/orderSuccess/shopping-bag.png";
import scooter from "../../images/orderSuccess/scooter.png";

import styles from "./OrderSuccessPage.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import order_info from '../../data/order_info.json'

import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.jpg";

// Authentication function
const OrderSuccessPage = () => {
  const location = useLocation();

  // 나중의 혜은 파이팅 ~! 
  const {successData, pw} = location.state;
   

  // item image
  const itemImage = (order) => {
    switch (order.item.name) {
      case "제주 삼다수 2L (6개입)":
        return 삼다수;
      case "농심 신라면 (5개입)":
        return 신라면;
      case "오뚜기 컵밥 오삼불고기덮밥 310g":
        return 컵밥;
      case "햇반 백미밥 210g (3개입)":
        return 햇반;
      case "곰곰 구운란 10구":
        return 구운란;
      default:
        return null;
    }
  };

  return (
    <div id="pc-width">
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
                    <img src={itemImage(order_info[0])} alt={order_info[0].item.name} />
                  </div>
                  <div>
                    <div className={styles.order_itemInfo_title}>
                      {order_info[0].item.name}
                    </div>
                    <div className={styles.order_itemInfo_number}>
                      {order_info[0].item.price}원 / {order_info[0].count}개
                    </div>
                  </div>
                </div>
                <div className={styles.order_payment}>
                  <div>
                    <div>
                      <p>총 상품 금액</p>
                      <div>{(order_info[0].item.originalPrice * order_info[0].count).toLocaleString()}원</div>
                    </div>
                    <div>
                      <p>할인 금액</p>
                      <div>
                        {(order_info[0].item.originalPrice * order_info[0].count -
                          order_info[0].item.price * order_info[0].count).toLocaleString()}
                        원
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className={styles.order_payment}>
                    <div>
                      <div>
                        <p className={styles.borderText}>최종 결제금액</p>
                        <div className={styles.borderText}>{(order_info[0].item.price * order_info[0].count).toLocaleString()}원</div>
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
            <ul>
              <li>주문일시: {order_info[0].orderDate}</li>
              <li>주문자: {order_info[0].name}</li>
              <li>전화번호: {order_info[0].number}</li>
              <li>주소: {order_info[0].address}</li>
              <li>비밀번호: {pw.slice(0,2)}xx</li>
            </ul>
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
