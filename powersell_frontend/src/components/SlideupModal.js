import React, { useState } from 'react';

function SlideUpModal(props) {
  return (
    <div className={`modal-overlay ${props.show ? 'active' : ''}`}>
      <div className="modal">
        <div className="slider-bar"></div>
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
