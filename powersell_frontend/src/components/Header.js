import React from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../images/icons/left.png';

import '../css/header.css';

const Header = ({text}) => {
    return (
        <header className='header-component'>
            <Link to={"/"}>
            <img src={backIcon} alt="뒤로가기"/>
            </Link>
            <p>{text}</p>
        </header>
    );
};

export default Header;
