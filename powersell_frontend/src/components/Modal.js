// Modal.js
import React, { useState, useEffect, useRef } from "react";
import styles from "../css/modal-mobile.module.css";
import DaumPostcode from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import hostURL from "../hostURL";

function Modal(props) {
  
  const navigate = useNavigate();
  // 모달 오픈 여부
  const [modalState, setModalState] = useState("");

  // 수량
  const [quantity, setQuantity] = useState(1); // 상태 변수 설정
  // 주문자명
  const [name, setName] = useState("");
  // 지역번호
  const [preNum, setPreNum] = useState("010");
  // 전화번호
  const [phoneNumber, setPhoneNumber] = useState("");
  // 우편 번호
  const [zipCode, setZipCode] = useState("");
  // 주소
  const [address, setAddress] = useState("");
  // 상세 주소
  const [dongho, setDongho] = useState("");
  // 비밀번호
  const [pw, setPw] = useState("");
  // 상품 판매 여부
  const [eventIng, setEventIng] = useState(true);
  // 구매 버튼 실행 여부
  const [isClicked, setClicked] = useState(false);

  // input box
  const onChange = (e) => {
    let value = e.target.value;
    switch (e.target.name) {
      case "name":
        setName(value); // 문자와 공백만 허용
        return;
      case "preNum":
        setPreNum(value);
        return;
      case "phoneNumber":
        value = value.replace(/[^0-9]/g, "");
        setPhoneNumber(value);
        return;
      case "dongho":
        setDongho(value);
        return;
      case "pw":
        value = value.replace(/[^0-9]/g, "");
        setPw(value);
        return;
      default:
        return;
    }
  };

  // 구매하기 버튼
  async function handleSubmit(e) {
    e.preventDefault();
    // '-'가 포함되어 있는지 확인
    const hasDash = phoneNumber.includes("-");
    const flag1 = phoneNumber.length !== 7 && phoneNumber.length !== 8;
    const flag2 = pw.length !== 4;

    if (
      !name ||
      !preNum ||
      !phoneNumber ||
      !zipCode ||
      !address ||
      !dongho ||
      !pw
    ) {
      alert("※ 모든 정보를 입력해주세요.");
      return;
    } else if (hasDash) {
      alert("(-)를 제외한 숫자만 입력해주세요.");
      return;
    } else if (flag1 || flag2) {
      alert("※ 아래 양식을 지켜주세요\n\nㆍ전화번호: 7~8자리ㆍ비밀번호: 4자리");
      return;
    } else {
      const number = preNum + phoneNumber;
      const totalAdd = address;
      const inputs = {
        itemId: props.product.itemId,
        count: quantity,
        name: name,
        number: number,
        zipcode: zipCode,
        address: totalAdd,
        dongho: dongho,
        pw: pw,
      };

      setClicked(true);
      props.setPosting(true);

      axios
        .post(`${hostURL}/api/orders`, inputs)
        .then((response) => {
          document.body.style.overflow = "auto";
          const successData = response.data;
          // eventIng 값을 업데이트
          if (successData.eventIng !== undefined) {
            setEventIng(successData.eventIng);
          }
          navigate("/ordersuccess", {
            state: { successData: successData, pw: pw },
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            navigate("/orderfail");
          } else {
            console.log(error);
          }
        });
    }
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // 스타일 정의 code
  const postCodeStyle = {
    position: "fixed",
    top: "75%",
    bottom: 0,
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowWidth >= 400 ? "400px" : "100%",
    height: "100%",
    display: "block",
  };
  

  // 팝업창 열기
  const openPostCode = () => {
    setModalState(true);
  };

  // onCompletePost 함수
  const onCompletePost = (data) => {
    setAddress(data.address);
    setZipCode(data.zonecode);
    setModalState(false);
  };

  const [dragging, setDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [transformY, setTransformY] = useState(0);

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
      // const resistanceValue = deltaY > 0 ? Math.sqrt(deltaY) * 5 : 0;  // 더 큰 상수를 곱하여 움직임을 더 크게 만듭니다.
      // console.log("DeltaY:", deltaY, "Resistance Value:", resistanceValue); // 디버깅
      if (deltaY < 0) return;
      setTransformY(deltaY*0.9);

      // setTransformY(resistanceValue);
    }
  }
  useEffect(() => {
    console.log('Transform Y:', transformY);
  }, [transformY]);

  const product = props.product;
  useEffect(() => {
    axios
      .get(`${hostURL}/api/items/${props.product.itemId}`)
      .then((response) => {
        const itemData = response.data;
        if (itemData.eventIng !== undefined) {
          setEventIng(itemData.eventIng);
        }
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }, [props.product.itemId]);
  // const nameRef = useRef();
  // const phoneNumberRef = useRef();
  // const donghoRef = useRef();
  // const pwRef = useRef();
  // useEffect(() => {
  //   if (modalState) {
  //     // 모달이 열렸을 때만 포커스를 줍니다. 'props.open'은 모달이 열렸는지 알려주는 prop입니다.
  //     nameRef.current.focus();
  //   }
  // }, [modalState]);

  // const moveToNextInput = (currentRef, nextRef) => {
  //   if (currentRef.current.value.length > 0) {
  //     nextRef.current.focus();
  //   }
  // };

  return (
    <>
      {isClicked ? (
        <div></div>
      ) : (
        <div id={styles.pc_width} className={styles.Modal} onClick={closeModal}>
          <form
            className={styles.modalBody}
            style={{ transform: `translateY(${transformY}px)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={styles.slider_bar_div}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className={styles.slider_bar}></div>
            </div>
            <div className={styles.modal_content}>
              {/* 첫 컨텐츠: 상품 정보, 수량 선택 */}
              <div className={styles.first_content}>
                <div className={styles.product_info}>
                  <p className={styles.current_price_small}>{product.name}</p>
                  <p className={styles.current_price_small}>
                    {product.price}
                    {"원 "}
                    <span className={styles.original_price}>
                      {product.originalPrice}
                      {"원"}
                    </span>
                  </p>
                </div>

                <div className={styles.quantity_selector}>
                  <button
                    className={styles.quantity_button}
                    onClick={decreaseQuantity}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className={styles.quantity_button}
                    onClick={increaseQuantity}
                  >
                    +
                  </button>
                </div>
              </div>

              <hr />
              {/* 둘 컨텐츠: 배송지 정보 */}
              <div className={styles.second_content}>
                <h3 className={styles.order_title}>배송지</h3>

                {/* <p style={{ color: "red", textAlign: "left" }}>
                  {errorMessage}
                </p> */}

                <div className={styles.input_group}>
                  <label>받는 사람</label>
                  <input
                    // ref={nameRef}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      onChange(e);
                      // moveToNextInput(nameRef, phoneNumberRef);
                    }}
                  />
                </div>
                <div className={styles.input_group}>
                  <label>연락처</label>
                  <select name="preNum" value={preNum} onChange={onChange}>
                    <option value="010">010</option>
                    <option value="070">070</option>
                    <option value="011">011</option>
                    <option value="02">02</option>
                    <option value="031">031</option>
                  </select>
                  <input
                    ref={phoneNumberRef}
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      onChange(e);
                      // moveToNextInput(phoneNumberRef, donghoRef);
                    }}
                    placeholder="(-) 없이 숫자만 입력해주세요"
                  />
                </div>
                <div className={styles.input_group}>
                  <label>주소</label>
                  <button
                    type="button"
                    onClick={openPostCode}
                    className={styles.search_add}
                  >
                    주소찾기
                  </button>
                  <input
                    onChange={onChange}
                    value={zipCode}
                    type="text"
                    name="inputZipCodeValue"
                    disabled
                  />
                </div>
                <div className={`${styles.input_group} ${styles.last}`}>
                  <label> </label>
                  <input
                    onChange={onChange}
                    value={address}
                    type="text"
                    name="inputAddressValue"
                    disabled
                  />
                </div>
                <div className={`${styles.input_group} ${styles.last}`}>
                  <label> </label>
                  <input
                    // ref={donghoRef}
                    type="text"
                    placeholder="상세주소 입력"
                    name="dongho"
                    value={dongho}
                    onChange={(e) => {
                      onChange(e);
                      // moveToNextInput(donghoRef, pwRef);
                    }}
                  />
                </div>
              </div>

              <br />

              <div className={styles.third_content}>
                <h3 className={styles.order_title}>
                  주문 확인용 {/* <span>*4자리 숫자로 설정해 주세요</span> */}
                </h3>
                <div className={styles.input_group}>
                  <label>비밀번호</label>
                  <input
                    // ref={pwRef}
                    type="password"
                    name="pw"
                    value={pw}
                    onChange={onChange}
                    placeholder="4자리 숫자로 설정해 주세요"
                  />
                </div>
              </div>
            </div>
            <input
              onClick={handleSubmit}
              className={`${styles.submit_button} ${
                !eventIng ? styles.negative_button : ""
              }`}
              type="submit"
              value={eventIng ? "구매하기" : "오픈 준비 중입니다"}
              disabled={!eventIng}
            />
          </form>
        </div>
      )}

      {/* 우편주소 code */}
      <div className={styles.postCode}>
        {modalState ? (
          <DaumPostcode
            className={styles.postCodeStyle}
            style={postCodeStyle}
            autoClose={false}
            onComplete={onCompletePost}
          ></DaumPostcode>
        ) : null}
      </div>
    </>
  );
}

export default Modal;
