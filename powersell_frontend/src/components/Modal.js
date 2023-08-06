// Modal.js
import React, {useState} from "react";
import "../css/modal.css";
import Button from "./Button";
function Modal(props) {
  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [transformY, setTransformY] = useState(0);
  const [quantity, setQuantity] = useState(1); // 상태 변수 설정

  // 수량 증가 함수
  function increaseQuantity() {
    if (quantity < 2) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  }

  // 수량 감소 함수
  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  }


  function closeModal() {
    props.closeModal();
  }

  function handleDragStart(e) {
    setDragging(true);
    setDragStartY(e.clientY);
  }

  function handleDragMove(e) {
    if (dragging) {
      const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
      const deltaY = clientY - dragStartY;
      const resistanceValue = deltaY > 0 ? Math.sqrt(deltaY) : 0; // Only allow downwards drag
  
      setTransformY(resistanceValue);
    }
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
      setTransformY(deltaY);
    }
  }

  return (
    <div id="pc-width">
      <div className="Modal" onClick={closeModal}>
        <div
          className="modalBody"
          style={{ transform: `translateY(${transformY}px)` }}
          onClick={(e) => e.stopPropagation()}
        >
          <div onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}>
          <div
            className="slider-bar"
            
          ></div>
          </div>
          <div className="modal-content">
            {/* 첫 컨텐츠: 상품 정보, 수량 선택 */}
            <div className="first-content">
              <div className="product-info">
                <p className="current-price-small">{props.productName}</p>
                <p className="current-price-small">
                  {props.salePrice}{" "}
                  <span className="original-price">{props.originalPrice}</span>
                </p>
              </div>

              <div className="quantity-selector">
                <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button className="quantity-button" onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <hr />
            {/* 둘 컨텐츠: 배송지 정보 */}
            <div className="second-content">
              <h3 className="order-title">배송지</h3>
              <form>
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
                  <input type="text" />
                </div>
                <div className="input-group">
                  <label>주소</label>
                  <button className="search_add">주소찾기</button>
                  <input type="text" disabled />
                </div>
                <div className="input-group">
                  <label> </label>
                  <input type="text" placeholder="상세주소 입력" />
                </div>
              </form>
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
          <input className="submit_button" type="submit" value="구매하기"></input>

        </div>
      </div>
    </div>
  );
}

export default Modal;
