import { React, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header";
import styles from "./admin.module.css";

const LoginPage = (e) => {
  const focus = useRef();
  const navigator = useNavigate();

  useEffect(() => {
    focus.current.focus();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
      navigator("/admin", { state: 200 });
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
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
          <button onClick={handleClick}>제출</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

//   const handleClick = (e) => {
//     const username = document.getElementById("username");
//     const password = document.getElementById("number2");
//     const inputs = { username: username, password: password };
//     const CircularJSON = require("circular-json");

//     axios
//       .post(`${hostURL}/login`, {
//         headers: { "Content-Type": "application/json" },
//         body: CircularJSON.stringify(inputs),
//       })
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const [loginPageHTML, setloginPageHTML] = useState("");

//   axios.get(`${hostURL}/login`).then((response) => {
//     setloginPageHTML(response.data);
//   });

//   const createMarkup = () => {
//     const temp = loginPageHTML;
//     console.log(temp);
//     const form = temp.querySelector(".form-signin");
//     form.setAttribute("action", `${hostURL}/login`);
//     console.log(form);

//     return { __html: loginPageHTML };
//   };
//   window.onload = function () {
//     const form = document.querySelector(".form-signin");
//     form.setAttribute("action", `${hostURL}/login`);
//   };

// var myForm = document.querySelector(".form-signin");
// myForm.setAttribute("action", `${hostURL}/login`);

// const navigator = useNavigate();
// const handleClick = (e) => {
//     navigator("/");
// }

// try {
//     myForm.setAttribute("action", `${hostURL}/login`);
// } catch (e) {
//     myForm = document.querySelector(".form-signin");
//     myForm.setAttribute("action", `${hostURL}/login`);
// }

//   const location = useLocation();
//   const navigate = useNavigate();
//   const loginHTML = location.state.loginHTML || "";

//   const handleClick = (e) => {
//     navigate("/");
//   };

//   const form = document.querySelector(".form-signin");
//   form.setAttribute("action", `${hostURL}/login`);
//   console.log(form);
//   form.addEventListener("click", {handleClick})
//   console.log(form);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const form = document.querySelector(".form-signin");
//     console.log(form);
// const username = document.getElementById("username").value;
// const password = document.getElementById("password").value;
// const inputs = { username, password };

// const csrfToken = document.cookie.match(
//   new RegExp("XSRF-TOKEN=([^;]+)")
// );
// const headers = {
//   "X-XSRF-TOKEN": csrfToken,
//   "Content-Type": "application/json",
// };

// axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

// axios
//   .post(`${hostURL}/login`, {
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify(inputs)
//   })
//   .then((response) => {
//     console.log(inputs);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//   };
