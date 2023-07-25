import React, { useRef, useState } from 'react';
import '../css/modal.css'

function SlideUpModal(props) {
    const modalRef = useRef(null);
    const [startY, setStartY] = useState(0);

  const handleDrag = (e) => {
    const modalElem = modalRef.current;
    modalElem.style.transition = 'none';
    let movedY = e.clientY - startY;
    modalElem.style.transform = `translateY(${movedY}px)`;
  };
  const handleDragStart = (e) => {
    e.preventDefault();
    setStartY(e.clientY);
  };
  const handleDragEnd = () => {
    const modalElem = modalRef.current;
    modalElem.style.transition = 'transform 0.3s ease-out';
    modalElem.style.transform = 'translateY(0)';
    setStartY(0);  // 드래그가 끝났으므로 초기화
  };
  
  return (
    <div className={`modal-overlay ${props.show ? 'active' : ''}`}>
      <div className="modal" ref={modalRef}>
        <div className="slider-bar" 
          onDragStart={handleDragStart}
          onDrag={handleDrag} 
          onDragEnd={handleDragEnd}
          draggable="true"></div>
        <div className="modal-content">
          <h2>{props.productName}</h2>
          <div className="price-section">
            <div>
              <span className="discounted-price">{props.discountedPrice}</span>
              <span className="original-price">{props.originalPrice}</span>
            </div>
            <div className="quantity-selector">
              <button>-</button>
              <span>1</span>
              <button>+</button>
            </div>
          </div>
          <hr />
          <h3>배송지</h3>
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
            <button>주소 찾기</button>
            <input type="text" disabled />
            <input type="text" disabled />
          </div>
          <div className="input-group">
            <input type="text" placeholder="상세주소 입력" />
          </div>
          <h3>주문 확인용</h3>
          <div className="input-group">
            <label>비밀번호</label>
            <input type="password" />
          </div>
          <button className="buy-button">구매하기</button>
        </div>
      </div>
    </div>
  );
}

export default SlideUpModal;
