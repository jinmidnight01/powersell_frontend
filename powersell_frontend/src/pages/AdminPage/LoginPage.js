import { React, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import hostURL from "../../hostURL";

import Header from "../../components/Header";
import styles from "./admin.module.css";

const LoginPage = (e) => {
  const focus = useRef();
  const submitFocus = useRef();
  const navigator = useNavigate();

  useEffect(() => {
    focus.current.focus();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const inputs = {username: username, password: password};

    if (username === "woiwufvhn" && password === "eazwrdctfvy") {
      navigator("/AKIAXTK3G6H3T33QXQWE", { state: 200 });
    }
    else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    // axios
    // .post(`${hostURL}/api/login`, inputs)
    // .then((response) => {
    //   if (response.data === true) {
    //     navigator("/AKIAXTK3G6H3T33QXQWE", { state: 200 });
    //   }
    //   else {
    //     alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    //   }
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <div id={styles.pcWidth}>
      <Header text="로그인"></Header>
      <div className={styles.login_main}>
        <div className={styles.login_box}>
          <p>
            <input
              type="text"
              id="username"
              name="username"
              placeholder=" Username"
              required
              ref={focus}
            />
          </p>
          <p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" Password"
              required
            />
          </p>
          <button onClick={handleClick} ref={submitFocus}>제출</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;