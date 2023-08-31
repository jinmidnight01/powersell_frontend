import { React, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Header from "../../components/Header";

import account from "../../images/orderSuccess/account.png";
import bag from "../../images/orderSuccess/shopping-bag.png";
import scooter from "../../images/orderSuccess/scooter.png";
import copyText from "../../images/icons/copyText.png";

import styles from "./OrderSuccessPage.module.css";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.jpg";

// Authentication function
const OrderSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [successData, setSuccessData] = useState(null);
  const [pw, setPw] = useState(null);

  // response data
  useEffect(() => {
    if (location.state === null) {
      navigate("/");
    } else {
      setSuccessData(location.state.successData);
      setPw(location.state.pw);
    }
  }, [location, navigate]);

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
      case "[EEE] 무항생제 맥반석 구운계란 (15구)":
        return 구운란;
      default:
        return null;
    }
  };
  if (!successData) {
    return;
    // return <p style={{ marginTop: "10%", textAlign: "center" }}></p>;
  }

  return (
    <div id={styles.pcWidth}>
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
          <hr className={styles.line} />
          <p style={{color:"red", textAlign: "left", fontSize:"12px", marginLeft: "10px"}}>※ 주문 후 30분 내 미입금시 주문 취소됩니다</p>
          <ul style={{marginTop: "5px"}}>
            <li>
              <span>예금주</span>: 박진효
            </li>
            <li>
              <span>송금계좌</span>:{" "}
              <CopyToClipboard
                text="3333277508505"
                onCopy={() => alert("계좌가 복사되었습니다")}
              >
                <span>
                  <span
                    style={{
                      textDecoration: "underline",
                    }}
                  >
                    카카오뱅크 3333277508505
                  </span>
                  <img
                    src={copyText}
                    alt="copy"
                    width={14}
                    style={{ cursor: "pointer", marginLeft: "7px" }}
                  />
                </span>
              </CopyToClipboard>
              <div style={{marginTop: "3px"}}>
                (입금자명을{" "}
                <span style={{ fontWeight: "bold" }}>'{successData.name}'</span>로
                해주세요)
              </div>
            </li>
          </ul>
        </div>

        {/* 결제 정보 */}
        <div>
          <div className={styles.receipt_Title}>
            <img src={bag} alt=""></img>
            <div>결제 정보</div>
          </div>
          <hr className={styles.line} />
          {/* item title */}

          <div style={{ marginBottom: "10px", marginTop: "15px" }}>
            <div className={styles.order_itemTitle}>
              <div>
                <img src={itemImage(successData)} alt={successData.item.name} />
              </div>
              <div>
                <div className={styles.order_itemInfo_title}>
                  {successData.item.name}
                </div>
                <div className={styles.order_itemInfo_number}>
                  {successData.item.price}원 / {successData.count}개
                </div>
              </div>
            </div>
            <div className={styles.order_payment}>
              <div>
                <div>
                  <p>총 상품 금액</p>
                  <div>
                    {(
                      successData.item.originalPrice * successData.count
                    ).toLocaleString()}
                    원
                  </div>
                </div>
                <div>
                  <p>할인 금액</p>
                  <div>
                    {(
                      successData.item.originalPrice * successData.count -
                      successData.item.price * successData.count
                    ).toLocaleString()}
                    원
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.order_payment}>
              <div>
                <div>
                  <p className={styles.borderText}>최종 결제금액</p>
                  <div className={styles.borderText}>
                    {(
                      successData.item.price * successData.count
                    ).toLocaleString()}
                    원
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 주문 정보: REST API */}
        <div style={{ marginBottom: "40px", marginTop: "5px" }}>
          <div className={styles.receipt_Title}>
            <img src={scooter} alt=""></img>
            <div>주문 정보</div>
          </div>
          <hr className={styles.line} />
          <ul>
            <li>
              <span>주문일시</span>:{" "}
              {successData.orderDate.replace("T", " ").slice(0, 24)}
            </li>
            <li>
              <span>주문자</span>: {successData.name}
            </li>
            <li>
              <span>전화번호</span>: {successData.number}
            </li>
            <li>
              <span>주소</span>: {successData.address} {successData.dongho}
            </li>
            <li>
              <span>비밀번호</span>: {pw.slice(0, 2)}xx
            </li>
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
