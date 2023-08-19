import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/style-mobile.css";

import hostURL from "../../hostURL";

import user from "../../images/icons/user.png";
import banner from "../../images/home/banner.jpg";
import { Link } from "react-router-dom";
import HomeHeader from "./../../components/HomeHeader";
import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.png";

function LandingPage() {
  const [feedback, setFeedback] = useState("");
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // item image
  const itemImage = (order) => {
    switch (order.name) {
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

  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    async function rendering_item() {
    axios.get(`${hostURL}/api/items`)
    .then((response) => {
      setItemList(response.data)
    })
    .catch((error) => {
      console.log("Error fetching items: ", error.response.data); 
    });
  }
  rendering_item();
}, []);
  
  async function submitFeedback() {
    if (feedback.trim() === "") {
      alert("피드백을 입력해주세요!");
      return;
    }
    const inputs = {content: feedback}
    axios.post(`${hostURL}/api/admin/feedbacks`, inputs)
    .then((response) => {
      alert("피드백이 전송되었습니다. 감사합니다 :-)");
      setFeedback('')
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <div id="pc-width" className="app">
      {/* Header */}
      <HomeHeader img2={user} />

      {/* Banner */}
      <a href="https://jazzy-note-a6d.notion.site/15ce9c9fd951457d9da722eafc8c3131?pvs=4" className="banner">
        <img src={banner} alt="Promotion Banner" />
      </a>

      {/* Products */}
      <div className="products">
        {itemList.map((product) => (
          <div key={product.itemId} className="product">
            <Link className="product-link" to={`/product/${product.itemId}`}>
              <img
                className="product-img"
                src={itemImage(product)}
                alt={product.name}
              />
              <div className="description">
                <p className="product-name">
                  {product.stockQuantity === 0 && (
                    <span className="soldout">품절</span>
                  )}
                  {product.name}
                </p>
                <p className="original-price">{product.originalPrice}원</p>
                <h2 className="discount">
                  {product.discountRate}% {product.price}원
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <hr />
      </div>
      {/* Footer */}
      <div className="footer">
        <h3 className="footerMessage">💌powersell팀에게 남기고 싶은 말💌</h3>
        <textarea
          onChange={handleFeedbackChange}
          value={feedback}
          className="feedback-input"
          type="text"
          placeholder="짧은 한 줄 소감도 큰 도움이 됩니다!"
        />
        <input
          type="button"
          className="submit-button"
          value="제출하기"
          onClick={submitFeedback}
        />
      </div>
    </div>
  );
}

export default LandingPage;
