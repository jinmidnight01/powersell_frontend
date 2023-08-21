import { React, useEffect, useParams, useState } from "react";
import axios from "axios";

import hostURL from "../../hostURL";

const ProductModal = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
    onClose();
  };

  return (
    <div>
      {/* ... 모달의 다른 부분 ... */}
      <input name="name" value={updatedProduct.name} onChange={handleInputChange} />
      <input name="originalPrice" value={updatedProduct.originalPrice} onChange={handleInputChange} />
      <input name="price" value={updatedProduct.price} onChange={handleInputChange} />
      <input name="stockQuantity" value={updatedProduct.stockQuantity} onChange={handleInputChange} />
      <input name="startDate" value={updatedProduct.startDate} onChange={handleInputChange} />
      <input name="endDate" value={updatedProduct.endDate} onChange={handleInputChange} />




      {/* ... 다른 input 필드들 ... */}
      <div>
      <button onClick={handleSave}>저장</button>
      <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};


export default ProductModal;
