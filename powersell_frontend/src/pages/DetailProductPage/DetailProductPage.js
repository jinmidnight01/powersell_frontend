import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SlideUpModal from '../../components/SlideupModal';

import products from '../../data/product';
import '../../css/style.css';


import backIcon from '../../images/detail/left.png';
import share from '../../images/detail/share.jpg';
function DetailProductPage() {

  const params = useParams();
  const productId = params.productId;

  const product = products.find(product => product.id === parseInt(productId));

  if (!product) {
    return <p>상품을 찾을 수 없습니다</p>;
  }

  const [item, setItem] = useState([]);

  const [showModal, setShowModal] = useState(false);
  
  return (
    <div className="product-detail">
      <header className="detail-header">
        <Link to={'/'}>
          <img src={backIcon} alt="뒤로가기" className="back-icon" />
        </Link>
        <p className="header-title">상세 페이지</p>
      </header>

      <img src={product.thumbnail} alt={product.name} className="product-image" />

      <div className="product-details">
        <div className='nameNshare'>
        <p className="product-name">{product.name}</p>
        <img className="share-icon" src={share}></img>        
        </div>
        <p className="discounted-price">
          <span className="discount-rate">{product.discountRate}% </span>
          <span className="original-price">{product.originalPrice}원</span>
        </p>
        <p className="current-price">{product.salePrice}원</p>
      </div>
      <hr style={{border: "3px solid #e5e5e5"}}/>
      <div className='product-description'>
        <p>상품설명 이러쿵저러쿵 쌸라쌸라</p>
        <p>1인당 최대 구매 수량: 3개</p>
        <p>환불규정 ? </p>
        <p>뢕트react뢕트react</p>
        <p>to do: 반응형 / db 연결 / 디자인 보완</p>
        <button onClick={() => setShowModal(true)} className="purchase-button">구매하기</button>
        <SlideUpModal 
        show={showModal} 
        productName={product.name} 
        discountedPrice={product.discountedPrice} 
        originalPrice={product.originalPrice} 
      />
      </div>
    </div>
  );
}

export default DetailProductPage