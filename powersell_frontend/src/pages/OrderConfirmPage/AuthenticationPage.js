import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header";

import phoneNumber from "../../images/orderConfirm/phoneNumber.png";
import key from "../../images/orderConfirm/key.png";
import kakaotalk from "../../images/orderConfirm/kakaotalk.png";

import styles from "../../css/style-orderconfirm.module.css";

// Authentication function
const AuthenticationPage = () => {
  const [number1, setNum1Value] = useState("010");
  const [number2, setNum2Value] = useState("");
  const [number3, setNum3Value] = useState("");
  const [pw, setPwValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  // input box
  const onChange = (e) => {
    switch (e.target.name) {
      case "number1":
        setNum1Value(e.target.value);
        return;
      case "number2":
        setNum2Value(e.target.value);
        return;
      case "number3":
        setNum3Value(e.target.value);
        return;
      case "password":
        setPwValue(e.target.value);
        return;
      default:
        return;
    }
  };

  // submit button
  const handleSubmit = async (e) => {
    // prevent input value reset
    e.preventDefault();

    // change button from 조회 to 조회 중...
    setIsPending(true);

    // input requirements
    const flag1 = number2.length !== 3 && number2.length !== 4;
    const flag2 = number3.length !== 4;
    const flag3 = pw.length !== 4;

    if (flag1 || flag2 || flag3) {
      alert(
        "※ 아래 양식을 지켜주세요\n\nㆍ전화번호 중간자리: 3~4자리\nㆍ전화번호 끝자리: 4자리\nㆍ비밀번호: 4자리"
      );
      setIsPending(false);
      return;
    }

    // POST request
    const number = number1 + number2 + number3;
    const inputs = { number: number, pw: pw };
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    await sleep(500);

    axios
      .post("/api/orders/detail", inputs)
      .then((response) => {
        if (response.data.length === 0) {
          alert("해당 주문 내역이 없습니다");
          setIsPending(false);
          return;
        }
        navigate("/orderconfirm", { state : response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div id="pc-width">
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
        <div className={styles.auth_phoneBox}>
          <select name="number1" value={number1} onChange={onChange}>
            <option value="010">010</option>
            <option value="070">070</option>
            <option value="011">011</option>
            <option value="02">02</option>
            <option value="031">031</option>
          </select>
          <hr></hr>
          <input
            name="number2"
            value={number2}
            onChange={onChange}
            type="number"
            required
            placeholder="0000"
            inputMode="numeric"
          ></input>
          <hr></hr>
          <input
            name="number3"
            value={number3}
            onChange={onChange}
            type="number"
            required
            placeholder="0000"
            inputMode="numeric"
          ></input>
        </div>

        {/* password */}
        <div className={styles.auth_pwTitle}>
          <img src={key} alt=""></img>
          <div>비밀번호 (4자리 숫자)</div>
        </div>
        <div className={styles.auth_pwBox}>
          <input
            name="password"
            value={pw}
            onChange={onChange}
            type="number"
            inputMode="numeric"
            required
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

// REST API: fetch
// fetch('http://localhost:8080/test/', {
// method: 'POST',
// headers: { "Content-Type": "application/json" },
// body: JSON.stringify(inputs)
// }).then(() => {
// console.log('new order added');
// })

// <button onClick={() => {
//     setIsPending(true);
//     axios.post("https://jsonplaceholder.typicode.com/posts/", {
//         // number: {number},
//         // pw: {pw}
//     }).then((response) => {
//         console.log(response.data);
//         setIsPending(false);
//     }).catch((error) => {
//         console.log(error);
//     });
// }}>

// const handleClick = async(e) => {
//     // prevent page refresh
//     e.preventDefault();

//     // change button from 조회 to 조회 중...
//     setIsPending(true);
//     await sleep(1000);

//     navigate('/orderconfirm', {state: inputs});
// }
