import { React, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import hostURL from "../../hostURL";

const LoginPage = (e) => {
    const handleClick = (e) => {
        const username = document.getElementById("username");
        const password = document.getElementById("number2");
        const inputs = { username: username, password: password };
        const CircularJSON = require('circular-json');

        axios
        .post(`${hostURL}/login`, {
            headers: {"Content-Type": "application/json"},
            body: CircularJSON.stringify(inputs)
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

  return (
    <div className="container">
        <div className="form-signin">
            <h2 className="form-signin-heading">Please sign in</h2>
            <p>
                <label htmlFor="username" className="sr-only">Username</label>
                <input type="text" id="username" name="username" className="form-control" placeholder="Username" required="" autoFocus="" />
            </p>
            <p>
                <label htmlFor="password" className="sr-only">Password</label>
                <input type="password" id="password" name="password" className="form-control" placeholder="Password" required="" />
            </p>
            <button onClick={handleClick} className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </div>
    </div>
  );
};

export default LoginPage;

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

