import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header";
import hostURL from "../../hostURL";

import phoneNumber from "../../images/orderConfirm/phoneNumber.png";
import key from "../../images/orderConfirm/key.png";
import kakaotalk from "../../images/orderConfirm/kakaotalk.png";

import styles from "./orderconfirm.module.css";

// Authentication function
const AuthenticationPage = () => {
  const refNum2 = useRef(); const refNum3 = useRef(); const refPw = useRef();
  const reg = /^[0-9]{4}$/;
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const inputNoti = {
    display: "none",
    fontSize: "11px",
    marginLeft: "30px",
    marginTop: "7px",
    color: "#fa7979",
    fontWeight: "bold",
  };

  useEffect(() => {
    refNum2.current.focus();
  }, []);

  // function: input focus (1)
  const num2ToNum3 = () => {
    const number2 = document.getElementById("number2");
    const number3 = document.getElementById("number3");
    const pw = document.getElementById("pw");

    if (reg.test(number2.value)) {
      if (reg.test(number3.value)) {
        if (!reg.test(pw.value)) {
          refPw.current.focus();
        }
      }
      else {
        refNum3.current.focus();
      }
    }
  };

  // function: input focus (2)
  const num3ToPw = () => {
    const number3 = document.getElementById("number3");
    const pw = document.getElementById("pw");

    if (reg.test(number3.value)) {
      if (!reg.test(pw.value)) {
        refPw.current.focus();
      }
    }
  }

  // function: submit
  const handleSubmit = (e) => {
    const number1 = document.getElementById("number1");
    const number2 = document.getElementById("number2");
    const number3 = document.getElementById("number3");
    const pw = document.getElementById("pw");

    const flagNum2 = /^[0-9]{3,4}$/.test(number2.value);
    const flagNum3 = reg.test(number3.value);
    const flagPw = reg.test(pw.value);

    // prevent page reset
    e.preventDefault();

    // change button from 조회 to 조회 중...
    setIsPending(true);

    // urge input change
    if (!flagNum2 || !flagNum3 || !flagPw) {
      // password noti, password change
      if (!flagPw) {
        document.getElementById("pwNoti").style.display = "block";
        pw.style.borderColor = "#fa7979";
        pw.style.borderWidth = "2px";
        refPw.current.focus();
      } else {
        document.getElementById("pwNoti").style.display = "none";
        pw.style.borderColor = "rgb(205, 205, 205)";
      }

      // number noti change
      if (!flagNum2 || !flagNum3) {
        document.getElementById("numberNoti").style.display = "block";
      } else {
        document.getElementById("numberNoti").style.display = "none";
      }
      // number3 change
      if (!flagNum3) {
        number3.style.borderColor = "#fa7979";
        number3.style.borderWidth = "2px";
        refNum3.current.focus();
      } else {
        number3.style.borderColor = "rgb(205, 205, 205)";
      }
      // number2 change
      if (!flagNum2) {
        number2.style.borderColor = "#fa7979";
        number2.style.borderWidth = "2px";
        refNum2.current.focus();
      } else {
        number2.style.borderColor = "rgb(205, 205, 205)";
      }

      setIsPending(false);
      return;
    }
    postRequest(number1.value, number2.value, number3.value, pw.value);
  };

  // function: POST request
  const postRequest = async (number1, number2, number3, pw) => {
    const number = number1 + number2 + number3;
    const inputs = { number: number, pw: pw };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(500);

    // REST API 1-3
    axios
      .post(`${hostURL}/api/orders/detail`, inputs)
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          alert("해당 주문 내역이 없습니다");
          setIsPending(false);
          return;
        }
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
      <form className={styles.auth_form}>
        <h3 className={styles.auth_noti}>
          주문 조회를 위해 본인 인증을 해주세요
        </h3>

        {/* phoneNumber */}
        <div className={styles.auth_phoneTitle}>
          <img src={phoneNumber} alt=""></img>
          <div>전화번호</div>
        </div>
        <div id="numberNoti" style={inputNoti}>
          ※ 중간은 3~4자리, 끝은 4자리 숫자로 입력해주세요
        </div>
        <div className={styles.auth_phoneBox}>
          <select id="number1" name="number1" defaultValue="010">
            <option value="010">010</option>
            <option value="070">070</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
          </select>
          <hr></hr>
          <input
            id="number2"
            name="number2"
            onInput={num2ToNum3}
            type="text"
            required
            placeholder="0000"
            inputMode="numeric"
            ref={refNum2}
            maxLength={4}
          ></input>
          <hr></hr>
          <input
            id="number3"
            name="number3"
            onInput={num3ToPw}
            type="text"
            required
            placeholder="0000"
            inputMode="numeric"
            ref={refNum3}
            maxLength={4}
          ></input>
        </div>

        {/* password */}
        <div className={styles.auth_pwTitle}>
          <img src={key} alt=""></img>
          <div>비밀번호 (4자리 숫자)</div>
        </div>
        <div id="pwNoti" style={inputNoti}>
          ※ 4자리 숫자로 입력해주세요
        </div>
        <div className={styles.auth_pwBox}>
          <input
            id="pw"
            name="pw"
            type="text"
            inputMode="numeric"
            required
            ref={refPw}
            maxLength={4}
          ></input>
        </div>

        {/* kakaotalk */}
        <div className={styles.kakaoTitle}>
          ※ 주문조회 비밀번호를 잊으신 경우,<br></br>
          아래 카카오톡 채널로 문의주시기 바랍니다
        </div>
        <a href="https://google.com">
          <img src={kakaotalk} alt="" className={styles.kakaoImg}></img>
        </a>
        <br></br>

        {/* confirm button (REST API) */}
        <div className={styles.auth_buttonBox}>
          {!isPending && (
            <button type="submit" onClick={handleSubmit}>
              조회
            </button>
          )}
          {isPending && <button disabled>조회 중...</button>}
        </div>
      </form>
    </div>
  );
};

export default AuthenticationPage;
