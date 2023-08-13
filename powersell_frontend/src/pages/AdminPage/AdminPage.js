import { React, useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';

import ProductListPage from './ProductListPage';
import OrderListPage from './OrderListPage';

import backIcon from '../../images/icons/left.png';

import styles from './admin.module.css';

const AdminPage = () => {   
    const [title, setTitle] = useState("주문 목록");
    const navigate = useNavigate();

    // show orderlist first
    useEffect(() => {
        navigate("orderlist")
    }, []);

    // function: toggle
    const toggle = () => {
        if (title === "주문 목록") {
            setTitle("상품/후기 목록");
            navigate("productlist");
        }
        else if (title === "상품/후기 목록") {
            setTitle("주문 목록")
            navigate("orderlist");
        }
    }

    return (
        <div id={styles.pcWidth} >
            {/* header */}
            <header className={styles.adminHeader}>
                <div>
                    <Link to={"/"}>
                        <img src={backIcon} alt="뒤로가기"></img>
                    </Link>
                </div>
                <div>
                    {title}
                </div>
                {/* toggle button */}
                <label className={styles.switch}>
                    <input type="checkbox" onClick={toggle}></input>
                    <span className={styles.slider} id={styles.round}></span>
                </label>
            </header>  

            {/* main */}
            <Routes>
                {/* Order List Page */}
                <Route path="/orderlist" element={<OrderListPage />}></Route>
                {/* Product List Page */}
                <Route path="/productlist" element={<ProductListPage />}></Route>
            </Routes>         
        </div>
    );
};

export default AdminPage;