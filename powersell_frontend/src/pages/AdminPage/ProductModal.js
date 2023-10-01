import { React, useState } from "react";

import styles from "../../css/admin.module.css";
import close from "../../images/icons/close.png";

const ProductModal = ({ product, onClose, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // input 객체 재생성
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(updatedProduct);
  };

  return (
    <div className={styles.productModal}>
      <section>
        <img className={styles.shutDown} src={close} alt="닫기" onClick={onClose} />
      </section>
      <div>
        <div>ㆍ품명:</div>
        <input
          name="name"
          onChange={handleInputChange}
          type="text"
          placeholder=" ex. 제주 삼다수 2L (6개입)"
          value={updatedProduct.name}
        ></input>
      </div>
      <div>
        <div>ㆍ원가:</div>
        <input
          name="originalPrice"
          onChange={handleInputChange}
          type="number"
          placeholder=" ex. 6600"
          value={updatedProduct.originalPrice}
        ></input>
      </div>
      <div>
        <div>ㆍ정가:</div>
        <input
          name="price"
          onChange={handleInputChange}
          type="number"
          placeholder=" ex. 1400"
          value={updatedProduct.price}
        ></input>
      </div>
      <div>
        <div>ㆍ재고:</div>
        <input
          name="stockQuantity"
          onChange={handleInputChange}
          type="number"
          placeholder=" ex. 25"
          value={updatedProduct.stockQuantity}
        ></input>
      </div>
      <div>
        <div>ㆍ오픈:</div>
        <input
          name="startDate"
          onChange={handleInputChange}
          type="datetime-local"
          step="1"
          value={updatedProduct.startDate}
        ></input>
      </div>
      <div>
        <div>ㆍ마감:</div>
        <input
          name="endDate"
          onChange={handleInputChange}
          type="datetime-local"
          step="1"
          value={updatedProduct.endDate}
        ></input>
      </div>
      <button className={styles.saveButton} onClick={handleSave}>
        수정
      </button>
    </div>
  );
};

export default ProductModal;
