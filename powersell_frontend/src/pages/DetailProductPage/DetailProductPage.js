import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/product";
import "../../css/style-mobile.css";

// import share from "../../images/detail/share.jpg";

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
    if (isClicked) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}, [isClicked]);


  if (!product) {
    return <p>상품을 찾을 수 없습니다</p>;
  }

  return (
    <div id="pcWidth">
      <Header text="상품 내용"></Header>

      <img
        src={product.thumbnail}
        alt={product.name}
        className="product-image"
      />

      <div className="product-details">
        <div className="nameNshare">
          <p className="product-name">{product.name}</p>
          {/* <img className="share-icon" src={share}></img> */}
        </div>
        <p className="discounted-price">
          <span className="discount-rate">{product.discountRate}% </span>
          <span className="original-price">{product.originalPrice}원</span>
        </p>
        <p className="current-price">{product.salePrice}원</p>
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

          <p><i className="borderText">✔️ Agreement.</i></p>
          <br></br>
          <p>- 할인 상품은 교환/환불이 불가합니다. 입금 및 재고 확인 직후 품절
            표기되므로 발송 전이라도 변경/취소가 불가합니다 </p>
          <br></br>

          <p>- 주문 시각으로부터 <span className="borderText">30분</span> 내 미입금 시 주문이 자동 취소됩니다.
          </p>
          
          <br></br>
          <p>
            - 미리 공지사항에 고지해 둔 내용을 소비자가 충분히 숙지하지 않아
            발생되는 일에 대해 판매자가 책임지지 않습니다.
          </p>
          <br></br>          
          <br></br>

          <p><i className="borderText">🛻 Delivery.</i></p>
          <br></br>
          <p>-배송지 변경은 주문 시각으로부터 24시간 이내에만 가능합니다. 카카오톡
            채널로 문의를 남겨주세요.
          </p>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
      <div className="button-container">
        <Button
          className={product.soldout ? "negative_button" : "positive-button"}
          onClick={!product.soldout ? () => setClicked(!isClicked) : null}
          text={product.soldout ? "품절" : "구매하기"}
        />
      </div>
      {isClicked && (
        <div className="modal-div">
          <div className="modal-background"> </div>
          <Modal
            closeModal={() => {setClicked(!isClicked); document.body.style.overflow = 'auto';}}
            productName={product.name}
            salePrice={product.salePrice}
            originalPrice={product.originalPrice}
            product={product}
          ></Modal>
        </div>
      )}
    </div>
  );
}

export default DetailProductPage;
