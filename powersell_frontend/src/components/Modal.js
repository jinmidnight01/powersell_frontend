// Modal.js
import React, { useState } from "react";
import "../css/modal-mobile.css";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom"

import Button from "./Button";
function Modal(props) {
  function handlePurchaseAndNavigate(e) {
    e.preventDefault(); // prevents the default form submit action
    document.body.style.overflow = 'auto';
    navigate('/ordersuccess', { state: { product: props.product, quantity: quantity } });
  }
  const navigate = useNavigate();
  // 모달 오픈 여부
  const [modalState, setModalState] = useState("");


  // 우편 번호
  const [inputZipCodeValue, setInputZipCodeValue] = useState("");

  // 주소
  const [inputAddressValue, setInputAddressValue] = useState("");

  // 팝업창 열기
  const openPostCode = () => {
    setModalState(true);
  };

  function handleZipCode(e) {
    setInputZipCodeValue(e.target.value)
  }
  function handleAddress(e) {
    setInputAddressValue(e.target.value);
  }

  // 스타일 정의 code
  const postCodeStyle = {
    position: "fixed",
    top:"75%",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "50vh",
    display: "block",
  };
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };
  // onCompletePost 함수
  const onCompletePost = (data) => {
    setInputAddressValue(data.address);
    setInputZipCodeValue(data.zonecode);
    setModalState(false);

  };

  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [transformY, setTransformY] = useState(0);
  const [quantity, setQuantity] = useState(1); // 상태 변수 설정

  // 수량 증가 함수
  function increaseQuantity(e) {
    e.preventDefault();
    if (quantity < 2) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  }

  // 수량 감소 함수
  function decreaseQuantity(e) {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  }

  function closeModal() {
    props.closeModal();
  }

  function handleDragEnd() {
    if (transformY > window.innerHeight * 0.2) {
      // 20% 이상 내려가면 모달 닫기
      closeModal();
    } else {
      setTransformY(0); // 위치 초기화
    }
    setDragging(false);
  }

  function handleDragStart(e) {
    const clientY = e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    setDragging(true);
    setDragStartY(clientY);
  }

  function handleDragMove(e) {
    if (dragging) {
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - dragStartY;
      const resistanceValue = deltaY > 0 ? Math.sqrt(deltaY) : 0; // Only allow downwards drag

      if (deltaY < 0) return;

      setTransformY(resistanceValue);
    }
  }

  return (
    <>
      <div id="pc-width" className="Modal" onClick={closeModal}>
        <form
          className="modalBody"
          style={{ transform: `translateY(${transformY}px)` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="slider-bar-div"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="slider-bar"></div>
          </div>
          <div className="modal-content">
            {/* 첫 컨텐츠: 상품 정보, 수량 선택 */}
            <div className="first-content">
              <div className="product-info">
                <p className="current-price-small">{props.productName}</p>
                <p className="current-price-small">
                  {props.salePrice}
                  {"원 "}
                  <span className="original-price">
                    {props.originalPrice}
                    {""}
                  </span>
                </p>
              </div>

              <div className="quantity-selector">
                <button className="quantity-button" onClick={decreaseQuantity}>
                  -
                </button>
                <span>{quantity}</span>
                <button className="quantity-button" onClick={increaseQuantity}>
                  +
                </button>
              </div>
            </div>

            <hr />
            {/* 둘 컨텐츠: 배송지 정보 */}
            <div className="second-content">
              <h3 className="order-title">배송지</h3>
              <div className="input-group">
                <label>받는 사람</label>
                <input type="text" />
              </div>
              <div className="input-group">
                <label>연락처</label>
                <select>
                  <option>010</option>
                  <option>011</option>
                  <option>02</option>
                  <option>033</option>
                </select>
                <input type="number" />
              </div>
              <div className="input-group">
                <label>주소</label>
                <button
                  type="button"
                  onClick={openPostCode}
                  className="search_add"
                >
                  주소찾기
                </button>
                <input
                  onChange={handleZipCode}
                  value={inputZipCodeValue}
                  placeholder="우편번호"
                  type="text"
                />
              </div>
              <div className="input-group last">
                <label> </label>
                <input
                  onChange={handleAddress}
                  value={inputAddressValue}
                  placeholder="주소"
                  type="text"
                />
              </div>
              <div className="input-group last">
                <label> </label>
                <input type="text" placeholder="상세주소 입력" />
              </div>
            </div>

            <br />

            <div className="third-content">
              <h3 className="order-title">주문 확인용</h3>
              <div className="input-group">
                <label>비밀번호</label>
                <input type="password" />
              </div>
            </div>
          </div>
          <input
            onClick={handlePurchaseAndNavigate} 
            className="submit_button"
            type="submit"
            value="구매하기"
          ></input>
        </form>
      </div>
      {/* 우편주소 code */}
      
      <div className="postCode">
        {modalState ? (<DaumPostcode
          style={postCodeStyle}
          autoClose={false}
          onComplete={onCompletePost}
          onChange={onChangeOpenPost}
        ></DaumPostcode>) : null}
      </div>
    </>
  );
}

export default Modal;
