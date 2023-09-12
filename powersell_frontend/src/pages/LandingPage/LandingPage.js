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
import 구운란 from "../../images/home/구운란.jpg";
import 곰곰 from "../../images/home/곰곰.png";
import spinner from "../../images/icons/spinner.gif";

function LandingPage() {
  const [feedback, setFeedback] = useState("");
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const [isLoading, setLoading] = useState(true);
  const [isFeedbackLoading, setFeedbackLoading] = useState(false);

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
      case "[EEE] 무항생제 맥반석 구운계란 (15구)":
        return 구운란;
      case "곰곰 구운란 10구":
        return 곰곰;
      default:
        return null;
    }
  };

  const [tempList, setItemList] = useState([]);

  useEffect(() => {
    async function rendering_item() {
      axios
        .get(`${hostURL}/api/items`)
        .then((response) => {
          setItemList(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching items: ", error.response.data);
        });
    }
    rendering_item();
  }, []);
  let itemList = []
  for (let i = 0; i < tempList.length; i++) {
    switch (tempList[i].itemId) {
      case 5:
        continue;
      case 457:
        continue;
      case 458:
        continue;
      case 459:
        continue;
      case 460:
        continue;
      case 461:
        continue;
      default:
        itemList.push(tempList[i]);
    }
  }

  function submitFeedback() {
    if (feedback.trim() === "") {
      alert("피드백을 입력해주세요!");
      return;
    }
    setFeedbackLoading(true);
    const inputs = { content: feedback };
    axios
      .post(`${hostURL}/api/feedbacks`, inputs)
      .then(() => {
        alert("피드백이 전송되었습니다. 감사합니다 :-)");
        setFeedback("");
        setFeedbackLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="pc-width" className="app">
      <div className="wrap">
        {/* Header */}
        <HomeHeader img2={user} />

        {/* Banner */}
        <a
          href="https://jazzy-note-a6d.notion.site/9-EVENT-15ce9c9fd951457d9da722eafc8c3131?pvs=4"
          className="banner"
        >
          <img src={banner} alt="Promotion Banner" />
        </a>

        {/* Products */}
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
          itemList.length === 0 ? (
          <div className="productRenewal">
            서비스 정비 중...
          </div>
          ) : (
          <div className="products">
            {itemList.map((product) => (
              <div key={product.itemId} className="product">
                <Link
                  className="product-link"
                  to={`/product/${product.itemId}`}
                >
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
                    <h2 className="discount">80% {product.price}원</h2>
                  </div>
                </Link>
              </div>
            ))}
          </div> )
        )}
        <div>
          <hr />
        </div>
        {/* Footer */}
        <div className="footer">
          <h3 className="footerMessage">💌powersell팀에게 남기고 싶은 말💌</h3>
          {isFeedbackLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ margin: "20px 0" }}
                src={spinner}
                alt="로딩 중..."
                width="15%"
              />
            </div>
          ) : (
            <textarea
              onChange={handleFeedbackChange}
              value={feedback}
              className="feedback-input"
              type="text"
              placeholder="짧은 한 줄 소감도 큰 도움이 됩니다!"
            />
          )}
          <input
            type="button"
            className="submit-button"
            value="제출하기"
            onClick={submitFeedback}
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>
          © Yonsei Workstation team: Powersell
          <br /> All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
