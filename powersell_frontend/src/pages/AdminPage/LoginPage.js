import { React, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import hostURL from "../../hostURL";

import Header from "../../components/Header";
import styles from "../../css/admin.module.css";

const LoginPage = (e) => {
  const focus = useRef();
  const navigator = useNavigate();
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const { id, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    focus.current.focus();
  }, []);

  // REST API 4-1: login
  const handleClick = (e) => {
    e.preventDefault();

    axios
    .post(`${hostURL}/api/check`, inputs)
    .then((response) => {
      if (response.data.result === 'True') {
        navigator("/admin", { state: response.status });
      }
      else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    })
    .catch((error) => {
      console.log(error);
    });
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
              name="id"
              placeholder=" Username"
              required
              ref={focus}
              value={id}
              onChange={onChange}
            />
          </p>
          <p>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" Password"
              required
              value={password}
              onChange={onChange}
            />
          </p>
          <button onClick={handleClick}>제출</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;