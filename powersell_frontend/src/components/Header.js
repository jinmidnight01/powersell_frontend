import React from "react";
import { Link } from "react-router-dom";

import backIcon from "../images/icons/left.png";

import "../css/header.css";

const Header = ({ text }) => {
  return (
    <header className="header-component">
      <Link className="imgBox" to={"/"}>
        <img src={backIcon} alt="뒤로가기" />
      </Link>
      <div>
        <div>{text}</div>
      </div>
    </header>
  );
};

export default Header;
