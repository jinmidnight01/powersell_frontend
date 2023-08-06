import { React, useEffect, useState } from 'react';
import axios from "axios";

import Header from '../../components/Header';

import orderData from '../../data/orderData';

import '../../css/style-jinhyo.css';

const OrderConfirmPage = () => {

    // const orderList = [...orderData].reverse();

    // return (
    //     <div id="pc-width">
    //         {/* Header */}
    //         <Header text="주문 조회"></Header>

    //         {/* main */}
    //         <div className="order-main">
    //             <div>주문 내역</div>
    //             <div className="order-list">

    //                 {/* item */}
    //                 {[...orderList].map(order => (
    //                 <div key={order.id} className="order-item">

    //                     {/* item title */}
    //                     <div className='order-itemTitle'>
    //                         <div>
    //                             <img src={order.thumbnail} alt={order.itemName} />
    //                         </div>
    //                         <div>
    //                             <div className="order-itemInfo-title">{order.itemName}</div>
    //                             <div className="order-itemInfo-number">{order.price}원 / {order.count}개</div>
    //                         </div>
    //                     </div>

    //                     {order.orderStatus !== "CANCELED" ?
    //                     <>
    //                         {/* delivery */}
    //                         <div className="order-delivery">
    //                             {order.orderStatus === "ARRIVED" ? <progress value="100" min="0" max="100"></progress>
    //                             : order.orderStatus === "DELIVERING" ? <progress value="50" min="0" max="100"></progress>
    //                             : <progress value="10" min="0" max="100"></progress>}                             
    //                             <div>
    //                                 <div>입금대기</div>
    //                                 <div>배송중</div>
    //                                 <div>배송완료</div>
    //                             </div>
    //                         </div>

    //                         {/* payment */}
    //                         <div className="order-payment">
    //                             <hr></hr>
    //                             <div>
    //                                 <div>
    //                                     <p>총 상품 금액</p>
    //                                     <div>{order.originalPrice * order.count}원</div>
    //                                 </div>
    //                                 <div>
    //                                     <p>할인 금액</p>
    //                                     <div>{order.originalPrice * order.count - order.price * order.count}원</div>
    //                                 </div>
    //                                 <div>
    //                                     <p>최종 결제금액</p>
    //                                     <div>{order.price * order.count}원</div>
    //                                 </div>
    //                             </div>
    //                         </div>   

    //                         {/* order information */}
    //                         <div className="order-information">
    //                             <hr></hr>
    //                             <div>
    //                                 <div><span>주문 일시</span>: {order.orderTime}</div>
    //                                 <div><span>주소</span>: {order.address}</div>
    //                             </div>
    //                         </div>
    //                     </> :

    //                     <>
    //                         {/* order cancel */}
    //                         <div className="order-cancel">
    //                             <div><span>주문 일시</span>: {order.orderTime}</div>
    //                             <div>※ 해당 주문은 취소되었습니다</div>
    //                         </div>
    //                     </>}

    //                 </div>
    //                 ))}
    //             </div>
    //         </div>
    //     </div>

    // );
    let [mydata, setData] = useState([]);

    // useEffect(() => {
    //   axios
    //     .get("https://de4ff32e-dfa6-43ed-91ca-c66d483f5068.mock.pstmn.io/list")
    //     .then((result) => {
    //       setData(result.data);
    //     })
    //     .catch(() => {});
    // }, []);

    async function postData() {
        try {
            //응답 성공 
            const response = await axios.post('https://de4ff32e-dfa6-43ed-91ca-c66d483f5068.mock.pstmn.io/orderconfirm',{
                //보내고자 하는 데이터 
                number: "01055664630",
                pw: "1234"
            });
            console.log(response);
        } catch (error) {
            //응답 실패
            console.error(error);
        }
    }

    postData();

    console.log(mydata);
  
    return (
      <div className="App">
        {mydata.map((i) => {
          return (
            <>
              <p>이름 : {i.name}</p>
              <p>나이 : {i.age}</p>
            </>
          );
        })}
      </div>
    );
};

export default OrderConfirmPage;