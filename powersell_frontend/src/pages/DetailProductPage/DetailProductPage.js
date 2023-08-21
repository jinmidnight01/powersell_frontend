import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CopyToClipboard from "react-copy-to-clipboard";
import "../../css/style-mobile.css";
import share from "../../images/detail/share.jpg";
import kakaotalk from "../../images/orderConfirm/kakaotalk.png";
import notion from "../../images/icons/notion.png";

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
  if (!product) {
    return (
      <>
        <p style={{ marginTop: "10%", textAlign: "center" }}>
          상품이 없습니다.
        </p>
      </>
    );
  }
  const isOutOfStock = product.stockQuantity === 0;
  const kakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("92b357c41da16ab9f3e0fa7f98cfbc30");
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "딸기 치즈 케익",
          description: "#케익 #딸기 #삼평동 #카페 #분위기 #소개팅",
          imageUrl:
            "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
          link: {
            mobileWebUrl: "https://developers.kakao.com",
            webUrl: "https://developers.kakao.com",
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
          {
            title: "앱으로 보기",
            link: {
              mobileWebUrl: "https://developers.kakao.com",
              webUrl: "https://developers.kakao.com",
            },
          },
        ],
      });
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
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        // title: product.name,
        title: "꾸꾸까까",
        url: "https://www.naver.com",
      });
    } else {
      kakaoButton();
    }
  };

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
            🛒 1회 최대 구매 수량은 <span className="borderText">2개</span>
            입니다
          </p>
          <br></br>
          <br></br>

          <p>
            <i className="borderText">✔️ 주요 내용</i>
          </p>
          <br></br>

          <p>
            <span style={{ fontWeight: "bold" }}>1. 배송/주문 안내</span>
            <br />- 모든 주문들을 취합하여, 매일{" "}
            <span className="borderText">자정</span>에{" "}
            <span className="borderText">쿠팡</span>을 통해 일괄 주문합니다
            <br />- 마이페이지에서 주문조회를 통해{" "}
            <span className="borderText">배송상황</span>을 확인하실 수 있습니다{" "}
          </p>
          <br></br>

          <p>
            <span style={{ fontWeight: "bold" }}>2. 입금 안내</span>
            <br />- 주문 시각으로부터 <span className="borderText">
              30분
            </span>{" "}
            내 미입금 시 주문이 자동 취소됩니다.
          </p>
          <br></br>

          <p>
            <span style={{ fontWeight: "bold" }}>3. 교환/환불 안내</span>
            <br />
            - 단순 변심으로 인한 교환/환불은 <span style={{ fontWeight: "bold" }}>불가</span>합니다
          </p>
          <br></br>

          <p style={{fontStyle: "italic", color: "grey"}}>
            ※ 미리 공지사항에 고지해 둔 내용을 소비자가 충분히 숙지하지 않아
            발생되는 일에 대해 판매자가 책임지지 않습니다.
          </p>
          <br></br>
          <br></br>

          <p>
            <i className="borderText">⚠️ 추가 내용</i>
          </p>
          <br></br>
          <div>
            문의 사항이 있을 시 아래{" "}
            <span className="borderText">노션 링크</span>나{" "}
            <span className="borderText">카카오톡 채널</span>을 통해 자세한
            내용을 확인해주세요
            <br />
            <p style={{marginTop: "15px"}}>
              <a href="https://www.notion.so/SALE-EVENT-15ce9c9fd951457d9da722eafc8c3131?pvs=4">
                <img src={notion} style={{marginRight: "15px"}} width={42} alt=""></img>
              </a>
              <a href="https://google.com">
                <img src={kakaotalk} width={42} alt=""></img>
              </a>
            </p>
          </div>
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
