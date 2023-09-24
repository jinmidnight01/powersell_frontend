import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import styles from "../../css/OrderFailPage.module.css";
import Button from "../../components/Button";

import warning from "../../images/orderFail/warning.png";

function OrderFailPage() {
  return (
    <div id={styles.pcWidth}>
      {/* header */}
      <Header text="주문 실패"></Header>

      {/* main */}
      <div className={styles.main}>
        <div className={styles.warning_div}>
          <img className={styles.warning} src={warning} alt="경고"/>
        </div>
        <div className={styles.fail_noti}>
          <h2>상품이 품절되었습니다😢</h2>
          <p>이용해주셔서 감사합니다.</p>
        </div>

        <div className={styles.button_container}>
        <Link to={"/"}>
          <Button text="돌아가기" />
        </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderFailPage;
