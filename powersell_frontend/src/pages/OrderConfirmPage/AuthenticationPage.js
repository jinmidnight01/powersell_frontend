import React from 'react';

import Header from '../../components/Header';

import phoneNumber from '../../images/orderConfirm/phoneNumber.png';
import key from '../../images/orderConfirm/key.png';
import kakaotalk from '../../images/orderConfirm/kakaotalk.png';

import '../../css/style-jinhyo.css';

const AuthenticationPage = () => {
    return (
        <div id="pc-width">
            {/* header */}
            <Header text="주문 조회"></Header>

            {/* main */}
            <div>
                <h3 className="auth-noti">주문 조회를 위한 본인 인증이 필요합니다</h3>

                {/* phoneNumber */}
                <div className="auth-phoneTitle">
                    <img src={phoneNumber} alt=""></img>
                    <div>전화번호</div>
                </div>
                <div className="auth-phoneBox">
                    <input type="text"></input><hr></hr>
                    <input type="text"></input><hr></hr>
                    <input type="text"></input>
                </div>

                {/* password */}
                <div className="auth-pwTitle">
                    <img src={key} alt=""></img>
                    <div>주문조회 비밀번호 (4자리)</div>
                </div>
                <div className="auth-pwBox">
                    <input type="password"></input>
                </div>

                {/* kakaotalk */}
                <div className='kakaoTitle'>
                    ※ 주문조회 비밀번호를 잊으신 경우,<br></br>
                    아래 카카오톡 채널로 문의주시기 바랍니다
                </div>
                <a href="https://google.com">
                    <img src={kakaotalk} alt="" className="kakaoImg"></img>
                </a><br></br>

                {/* confirm button */}
                <div className="auth-buttonBox">
                    <button>
                        조회
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationPage;