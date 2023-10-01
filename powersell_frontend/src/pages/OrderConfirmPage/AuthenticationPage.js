import { React, useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header";
import hostURL from "../../hostURL";

import phoneNumber from "../../images/orderConfirm/phoneNumber.png";
import key from "../../images/orderConfirm/key.png";
import kakaotalk from "../../images/orderConfirm/kakaotalk.png";
import spinner from "../../images/icons/spinner.gif";

import styles from "../../css/orderconfirm.module.css";

// Authentication function
const AuthenticationPage = () => {
  const refNum2 = useRef(); const refNum3 = useRef(); const refPw = useRef(); const submitFocus = useRef();
  const [isPosting, setIsPosting] = useState(false);
  const navigate = useNavigate();

  // 전화번호, 비밀번호
  const [inputs, setInputs] = useState({
    number1: "010",
    number2: "",
    number3: "",
    pw: "",
  });

  const { number1, number2, number3, pw } = inputs;

  // input 객체 생성
  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  
  // function: input focus
  const reg = useMemo(() => /^[0-9]{4}$/, []);
  useEffect(() => {
    if ((/^[0-9]{2,3}$/).test(number1)) {
      refNum2.current.focus();
    };
  }, [number1, reg]);

  useEffect(() => {
    if (reg.test(number2)) {
      refNum3.current.focus();
    };
  }, [number2, reg]);

  useEffect(() => {
    if (reg.test(number3)) {
      refPw.current.focus();
    };
  }, [number3, reg]);

  useEffect(() => {
    if (reg.test(pw)) {
      submitFocus.current.focus();
    };
  }, [pw, reg]);

  // style
  const [styleInputs, setStyleInputs] = useState({
    numberNotiStyle: {},
    number2Style: {},
    number3Style: {},
    pwNotiStyle: {},
    pwStyle: {}
  });

  const { numberNotiStyle, number2Style, number3Style, pwNotiStyle, pwStyle } = styleInputs;

  // REST API 1-3: post authentication data
  const handleSubmit = (e) => {
    const flagNum2 = /^[0-9]{3,4}$/.test(number2);
    const flagNum3 = reg.test(number3);
    const flagPw = reg.test(pw);

    // prevent page reset
    e.preventDefault();

    // loading start
    setIsPosting(true);

    // input 형식 검사
    if (!flagNum2 || !flagNum3 || !flagPw) {
      setStyleInputs({
        ...styleInputs,
        numberNotiStyle: flagNum2 && flagNum3 ? {display: "none"} : {display: "block"},
        number2Style: flagNum2 ? {borderColor: "rgb(205, 205, 205)"} : {borderColor: "#fa7979", borderWidth: "2px"},
        number3Style: flagNum3 ? {borderColor: "rgb(205, 205, 205)"} : {borderColor: "#fa7979", borderWidth: "2px"},
        pwNotiStyle: flagPw ? {display: "none"} : {display: "block"},
        pwStyle: flagPw ? {borderColor: "rgb(205, 205, 205)"} : {borderColor: "#fa7979", borderWidth: "2px"}
      });
      setIsPosting(false);
      return;
    }

    // 주문 인증 POST
    const number = number1 + number2 + number3;
    const inputs = { number: number, pw: pw };

    axios
      .post(`${hostURL}/api/orders/detail`, inputs)
      .then((response) => {
        // 주문 내역이 없는 경우
        if (response.data.length === 0) {
          alert("해당 주문 내역이 없습니다");
          setIsPosting(false);
          return;
        }
        // 주문 내역이 있는 경우
        navigate("/orderconfirm", { state: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id={styles.pcWidth}>
      {/* header */}
      <Header text="주문 조회"></Header>

      {/* main */}
      <form style={isPosting ? {opacity: "0.5"} : {}} className={styles.auth_form}>
        <h3 className={styles.auth_noti}>
          주문 조회를 위해 본인 인증을 해주세요
        </h3>

        {/* phoneNumber */}
        <div className={styles.auth_phoneTitle}>
          <div>
            <img src={phoneNumber} alt=""></img>
          </div>
          <div>
            <div>전화번호</div>
          </div>
        </div>
        <div className={styles.auth_inputNoti} style={numberNotiStyle}>
          ※ 중간은 3~4자리, 끝은 4자리 숫자로 입력해주세요
        </div>
        <div className={styles.auth_phoneBox}>
          <select name="number1" onChange={onChange} value={number1} disabled={isPosting ? true : false}>
            <option value="010">010</option>
            <option value="070">070</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
          </select>
          <hr></hr>
          <input
            name="number2"
            onChange={onChange} 
            type="text"
            required
            placeholder="0000"
            inputMode="numeric"
            ref={refNum2}
            maxLength={4}
            disabled={isPosting ? true : false}
            value={number2}
            style={number2Style}
          ></input>
          <hr></hr>
          <input
            name="number3"
            onChange={onChange} 
            type="text"
            required
            placeholder="0000"
            inputMode="numeric"
            ref={refNum3}
            maxLength={4}
            disabled={isPosting ? true : false}
            value={number3}
            style={number3Style}
          ></input>
        </div>

        {/* password */}
        <div className={styles.auth_pwTitle}>
          <div>
            <img src={key} alt=""></img>
          </div>
          <div>
            <div>비밀번호 (4자리 숫자)</div>
          </div>
        </div>
        <div className={styles.auth_inputNoti} style={pwNotiStyle}>
          ※ 4자리 숫자로 입력해주세요
        </div>
        <div className={styles.auth_pwBox}>
          <input
            name="pw"
            onChange={onChange} 
            type="text"
            inputMode="numeric"
            required
            ref={refPw}
            maxLength={4}
            disabled={isPosting ? true : false}
            value={pw}
            style={pwStyle}
          ></input>
        </div>

        {/* kakaotalk */}
        <div className={styles.kakaoTitle}>
          ※ 주문조회 비밀번호를 잊으신 경우,<br></br>
          아래 카카오톡 채널로 문의주시기 바랍니다
        </div>
        <a href="https://pf.kakao.com/_LExmlG" className="iconButton">
          <img src={kakaotalk} alt="" className={styles.kakaoImg}></img>
        </a>
        <br></br>

        {/* confirm button (REST API) */}
        <div className={styles.auth_buttonBox}>
          {!isPosting && (
            <button type="submit" onClick={handleSubmit} ref={submitFocus}>
              조회
            </button>
          )}
          {isPosting && <button style={{cursor:"default"}} disabled>조회 중...</button>}
        </div>
      </form>

      {isPosting ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                top: "300px",
                left: "0",
                right: "0",
              }}
            >
              <img
                style={{ opacity: 1 }}
                src={spinner}
                alt="로딩 중..."
                width="70px"
              />
            </div>
          ) : (
            <></>
          )}
    </div>
  );
};

export default AuthenticationPage;
