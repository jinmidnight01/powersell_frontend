import React, { useRef, useState } from 'react';
import '../css/modal.css'

function BottomSheet() {
    <div className="modal-background">
        <div className="bottomsheet-modal"
             onMouseDown={handleModalStartDrag}
             onMouseMove={handleModalDrag}
             onMouseUp={handleModalEndDrag}>
        <div className="slider-bar"></div>
        {/* ... 여기에 주문서 내용을 추가 ... */}
        </div>
    </div>
    }

export default BottomSheet;
