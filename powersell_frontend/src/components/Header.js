import React from 'react'
import '../css/style-mobile.css'
import '../css/style-pc.css'


function Header(props) {
  return (
    <header className="header">
        <div>
        <img className='mypage-button' src={props.img1}></img>
        </div>
        <div>
          <p className='title'>싸다9</p>
        </div>
        <div>
          <img className='mypage-button' src={props.img2}></img>
        </div>
      </header>
  )
}

export default Header