import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "../../css/style-mobile.css";

import share from "../../images/detail/share.jpg";

import hostURL from "../../hostURL";

import Header from "../../components/Header";
import Modal from "./../../components/Modal";
import Button from "../../components/Button";
import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.png";

function DetailProductPage() {
  const params = useParams();
  const productId = params.productId;
  const [product, setProduct] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function rendering_item_detail(id) {
      axios
        .get(`${hostURL}/api/items/${id}`)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log("Error fetching items: ", error.response.data);
        })
        .finally(() => {
          setLoading(false); // 로딩 종료
        });
    }
    rendering_item_detail(productId);
  }, [productId]);

  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isClicked]);

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
  if (isLoading) {
    return <p style={{ marginTop: "10%", textAlign: "center" }}>로딩 중...</p>;
  }
  // if (!product) {
  //   return <p style={{marginTop: '10%', textAlign: 'center'}}>상품이 없습니다.</p>;
  // }
  // const isOutOfStock = product.stockQuantity === 0;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        // title: product.name,
        title: "hi",
        url: "https://www.naver.com",
      });
    } else {
      alert("공유하기가 지원되지 않는 환경 입니다.");
    }
  };

  if (!product) {
    return (
      <div>
        <p style={{ marginTop: "10%", textAlign: "center" }}>
          상품이 없습니다.
        </p>
        <img
          onClick={handleShare}
          className="share-icon"
          src={share}
          alt=""
        ></img>
      </div>
    );
  }
  const isOutOfStock = product.stockQuantity === 0;

  return (
    <div id="pc-width">
      <Header text="상품 내용"></Header>

      <img
        src={itemImage(product)}
        alt={product.name}
        className="product-image"
      />

      <div className="product-details">
        <div className="nameNshare">
          <p className="product-name">{product.name}</p>
          <img
            onClick={handleShare}
            className="share-icon"
            src={share}
            alt=""
          ></img>
        </div>
        <p className="discounted-price">
          <span className="discount-rate">{product.discountRate}% </span>
          <span className="original-price">{product.originalPrice}원</span>
        </p>
        <p className="current-price">{product.price}원</p>
      </div>
      <hr style={{ border: "4px solid #e5e5e5" }} />
      <div className="product-description">
        <p className="borderText noticeTitle">
          <i>Notice.</i>
        </p>
        <br></br>
        <br></br>
        <div className="noticeContent">
          <p>
            🛒 1인당 최대 구매 수량은 <span className="borderText">2개</span>
            입니다
          </p>
          <br></br>
          <br></br>

          <p>
            <i className="borderText">✔️ Agreement.</i>
          </p>
          <br></br>
          <p>
            - 할인 상품은 교환/환불이 불가합니다. 입금 및 재고 확인 직후 품절
            표기되므로 발송 전이라도 변경/취소가 불가합니다{" "}
          </p>
          <br></br>

          <p>
            - 주문 시각으로부터 <span className="borderText">30분</span> 내
            미입금 시 주문이 자동 취소됩니다.
          </p>

          <br></br>
          <p>
            - 미리 공지사항에 고지해 둔 내용을 소비자가 충분히 숙지하지 않아
            발생되는 일에 대해 판매자가 책임지지 않습니다.
          </p>
          <br></br>
          <br></br>

          <p>
            <i className="borderText">🛻 Delivery.</i>
          </p>
          <br></br>
          <p>
            -배송지 변경은 주문 시각으로부터 24시간 이내에만 가능합니다.
            카카오톡 채널로 문의를 남겨주세요.
          </p>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
      <div className="button-container">
        <Button
          className={isOutOfStock ? "negative_button" : "positive-button"}
          onClick={() => {
            if (!isOutOfStock) {
              setClicked(!isClicked);
            }
          }}
          text={isOutOfStock ? "품절" : "구매하기"}
        />
      </div>
      {isClicked && (
        <div className="modal-div">
          <div className="modal-background"> </div>
          <Modal
            closeModal={() => {
              setClicked(!isClicked);
              document.body.style.overflow = "auto";
            }}
            product={product}
          ></Modal>
        </div>
      )}
    </div>
  );
}

export default DetailProductPage;
