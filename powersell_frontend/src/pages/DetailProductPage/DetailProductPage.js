import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/product";
import "../../css/style-mobile.css";
import "../../css/style-pc.css";

import share from "../../images/detail/share.jpg";

import Header from "../../components/Header";
import Modal from "./../../components/Modal";
import Button from "../../components/Button";

function DetailProductPage(props) {
  const params = useParams();
  const productId = params.productId;

  const product = products.find(
    (product) => product.id === parseInt(productId)
  );

  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    document.body.style = `overflow: hidden`;
    return () => (document.body.style = `overflow: auto`);
  }, []);

  if (!product) {
    return <p>상품을 찾을 수 없습니다</p>;
  }

  return (
    <div>
      <div id="pc-width" className="product-detail">
        <Header text="상품 내용"></Header>

        <img
          src={product.thumbnail}
          alt={product.name}
          className="product-image"
        />

        <div className="product-details">
          <div className="nameNshare">
            <p className="product-name">{product.name}</p>
            <img className="share-icon" src={share} alt=""></img>
          </div>
          <p className="discounted-price">
            <span className="discount-rate">{product.discountRate}% </span>
            <span className="original-price">{product.originalPrice}원</span>
          </p>
          <p className="current-price">{product.salePrice}원</p>
        </div>
        <hr style={{ border: "3px solid #e5e5e5" }} />
        <div className="product-description">
          <p>상품설명 이러쿵저러쿵 쌸라쌸라</p>
          <p>1인당 최대 구매 수량: 3개</p>
          <p>환불규정 ? </p>
          <p>뢕트react뢕트react</p>
          <p>to do: 반응형 / db 연결 / 디자인 보완</p>
          <Button onClick={() => setClicked(!isClicked)} text="구매하기" />

          {isClicked && (
            <Modal
              closeModal={() => setClicked(!isClicked)}
              productName={product.name}
              salePrice={product.salePrice}
              originalPrice={product.originalPrice}
            ></Modal>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailProductPage;
