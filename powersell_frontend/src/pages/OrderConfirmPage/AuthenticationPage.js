import { React, useEffect, useState } from 'react';
import axios from "axios";

import Header from '../../components/Header';

import phoneNumber from '../../images/orderConfirm/phoneNumber.png';
import key from '../../images/orderConfirm/key.png';
import kakaotalk from '../../images/orderConfirm/kakaotalk.png';

import '../../css/style-jinhyo.css';

// Authentication function
const AuthenticationPage = () => {
    const [number1, setNum1Value] = useState('');
    const [number2, setNum2Value] = useState('');
    const [number3, setNum3Value] = useState('');
    const [pw, setPwValue] = useState('');
    const [isPending, setIsPending] = useState(false);

    const onChange = (e) => {
        if (e.target.name === 'number1') {setNum1Value(e.target.value);}
        else if (e.target.name === 'number2') {setNum2Value(e.target.value);}
        else if (e.target.name === 'number3') {setNum3Value(e.target.value);}
        else if (e.target.name === 'password') {setPwValue(e.target.value);}
    };

    const number = number1 + number2 + number3;

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
                    <input name="number1" onChange={onChange} type="text"></input><hr></hr>
                    <input name="number2" onChange={onChange} type="text"></input><hr></hr>
                    <input name="number3" onChange={onChange} type="text"></input>
                </div>

                {/* password */}
                <div className="auth-pwTitle">
                    <img src={key} alt=""></img>
                    <div>주문조회 비밀번호 (4자리)</div>
                </div>
                <div className="auth-pwBox">
                    <input name="password" onChange={onChange} type="password"></input>
                </div>

                {/* kakaotalk */}
                <div className='kakaoTitle'>
                    ※ 주문조회 비밀번호를 잊으신 경우,<br></br>
                    아래 카카오톡 채널로 문의주시기 바랍니다
                </div>
                <a href="https://google.com">
                    <img src={kakaotalk} alt="" className="kakaoImg"></img>
                </a><br></br>

                {/* confirm button (REST API) */}
                <div className="auth-buttonBox">
                    { !isPending &&
                    <button onClick={() => {
                        setIsPending(true);
                        axios.post("https://jsonplaceholder.typicode.com/posts/", {
                            number: {number},
                            pw: {pw}
                        }).then((response) => {
                            console.log(response.data);
                            setIsPending(false);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }}>
                        조회
                    </button>}
                    { isPending && <button disabled>조회 중...</button>}
                </div>

            </div>
        </div>
    );
};

export default AuthenticationPage;