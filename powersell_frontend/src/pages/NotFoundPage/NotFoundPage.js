import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";

import styles from "./notfound.module.css";

const NotFoundPage = () => {
  return (
    <div id={styles.pcWidth}>
      <Header text="NotFound"></Header>

      <div className={styles.main}>
      <div className={styles.content}>
        해당 주소는 존재하지 않는<br/> 페이지입니다
      </div>
      <div className={styles.buttonBox}>
        <Link to="/">
          {" "}
          <button>홈으로</button>
        </Link>
      </div>

      </div>
    </div>
  );
};

export default NotFoundPage;
