import { React, useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import ProductListPage from "./ProductListPage";
import OrderListPage from "./OrderListPage";

import backIcon from "../../images/icons/left.png";

import styles from "../../css/admin.module.css";

const AdminPage = () => {
  const [title, setTitle] = useState("주문 목록");
  const navigate = useNavigate();
  const location = useLocation();

  // prevent direct access
  useEffect(() => {
    if (location.state !== 200) {
      navigate("/login");
    }
  }, [location.state, navigate]);

  return (
    <div id={styles.pcWidth}>
      {/* header */}
      <header className={styles.adminHeader}>
        <Link to={"/"} className={styles.imgBox}>
          <img src={backIcon} alt="뒤로가기"></img>
        </Link>

        <div>{title}</div>
        {/* toggle button */}
        <label className={styles.switch}>
          <input type="checkbox" onClick={() => { title === "주문 목록" ? setTitle("상품/후기 목록") : setTitle("주문 목록") }}></input>
          <span className={styles.slider} id={styles.round}></span>
        </label>
      </header>

      {/* main */}

      {/* Order List Page */}
      <div style={title === "주문 목록" ? { display: "block" } : { display: "none" }}>
        <OrderListPage status={location.state} />
      </div>

      {/* Product List Page */}
      <div style={title === "상품/후기 목록" ? { display: "block" } : { display: "none" }}>
        <ProductListPage status={location.state} />
      </div>

    </div>
  );
};

export default AdminPage;
