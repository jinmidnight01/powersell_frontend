import React from 'react'
import '../css/style-mobile.css'
import { Link } from 'react-router-dom'

function HomeHeader(props) {
  return (
    <header className="header">
        <div>
        <img className='mypage-button' src={props.img1} alt=""></img>
        </div>
        <div>
          <p className='title'>싸다9</p>
        </div>
        <div>
          <Link to={"/authentication"}>
          <img className='mypage-button' src={props.img2} alt=""></img>
          </Link>
        </div>
      </header>
  )
}

export default HomeHeader
