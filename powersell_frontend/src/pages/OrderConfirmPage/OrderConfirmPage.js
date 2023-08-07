import { React, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Header from "../../components/Header";

import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.jpg";

import styles from "../../css/style-orderconfirm.module.css";
import order_list from "../../data/order_list.json";

// OrderConfirm function
const OrderConfirmPage = () => {
  const output = useLocation().state;
  const navigate = useNavigate();
  console.log(output);

  // prevent direct URL access
  useEffect(() => {
    if (output === null) {
      navigate("/authentication");
    }
  });

  // item image
  const itemImage = (order) => {
    switch (order.item.name) {
      case "제주 삼다수 2L (6개입)":
        return 삼다수;
      case "농심 신라면 (5개입)":
        return 신라면;
      case "오뚜기 컵밥 오삼불고기덮밥 310g":
        return 컵밥;
      case "햇반 백미밥 210g (3개입)":
        return 햇반;
      case "곰곰 구운란 10구":
        return 구운란;
      default:
        return null;
    }
  };

  return (
    <div id={styles.pcWidth}>
      {/* Header */}
      <Header text="주문 조회"></Header>

      {/* main */}
      <div className={styles.order_main}>
        <div>주문 내역</div>
        <div className={styles.order_list}>
          {/* item */}
          {[...order_list].reverse().map((order) => (
            <div key={order.orderId} className={styles.order_box}>
              <div className={styles.order_item}>
                {/* item title */}
                <div className={styles.order_itemTitle}>
                  <div>
                    <img src={itemImage(order)} alt={order.item.name} />
                  </div>
                  <div>
                    <div>{order.item.name}</div>
                    <div>
                      {order.item.price}원 / {order.count}개
                    </div>
                  </div>
                </div>

                {order.orderStatus !== "CANCELED" ? (
                  <>
                    {/* delivery */}
                    <div className={styles.order_delivery}>
                      {order.orderStatus === "ARRIVED" ? (
                        <progress value="100" min="0" max="100"></progress>
                      ) : order.orderStatus === "DELIVERING" ? (
                        <progress value="50" min="0" max="100"></progress>
                      ) : (
                        <progress value="10" min="0" max="100"></progress>
                      )}
                      <div>
                        <div>입금대기</div>
                        <div>배송중</div>
                        <div>배송완료</div>
                      </div>
                    </div>

                    {/* payment */}
                    <div className={styles.order_payment}>
                      <hr></hr>
                      <div>
                        <div>
                          <p>총 상품 금액</p>
                          <div>{order.item.originalPrice * order.count}원</div>
                        </div>
                        <div>
                          <p>할인 금액</p>
                          <div>
                            {order.item.originalPrice * order.count -
                              order.item.price * order.count}
                            원
                          </div>
                        </div>
                        <div>
                          <p>최종 결제금액</p>
                          <div>{order.item.price * order.count}원</div>
                        </div>
                      </div>
                    </div>

                    {/* order information */}
                    <div className={styles.order_information}>
                      <hr></hr>
                      <div>
                        <div>
                          <span>주문 일시</span>: {order.orderDate}
                        </div>
                        <div>
                          <span>주소</span>: ({order.zipcode}) {order.dongho}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* order cancel */}
                    <div className={styles.order_cancel}>
                      <div>
                        <span>주문 일시</span>: {order.orderTime}
                      </div>
                      <div>※ 해당 주문은 취소되었습니다</div>
                    </div>
                  </>
                )}
              </div>

              {/* payment notification */}
              {order.orderStatus === "WAITING" ? (
                <div className={styles.order_noti}>
                  <hr></hr>
                  <div>
                    <div>
                      아직 <span>입금 대기</span> 단계이신가요?
                    </div>
                    <div>※ 미입금 고객의 경우 배송이 시작되지 않습니다</div>
                    <div>
                      <span>ㆍ</span>예금주: <span>박진효</span>
                    </div>
                    <div>
                      <span>ㆍ</span>계좌: <span>카카오뱅크 </span>
                      <CopyToClipboard
                        text="3333277508505"
                        onCopy={() => alert("계좌가 복사되었습니다")}
                      >
                        <span>3333277508505</span>
                      </CopyToClipboard>
                    </div>
                    <div>
                      (주문 후 <span>30분 내 미입금시 주문 취소</span>됩니다)
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmPage;

// REST API: axios
// useEffect(() => {
//   axios.post("api/orders/detail", {
//     "number": number,
//     "pw": pw
//   })
//   .then((response) => {
//     console.log(response.data);
//   }).catch((error) => {
//     console.log(error);
//   });
// }, []);

// REST API
// const [hi, setPosts] = useState([]); // posts = [
// const getPosts = async() => {
//     const posts = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
//     setPosts(posts.data);
// };

// useEffect(() => {
//     getPosts();
//     // let reqOptions = {
//     //     url: "https://jsonplaceholder.typicode.com/posts/1",
//     //     method: "POST",
//     //     data: [
//     //         {
//     //         "number":"hi",
//     //         "pw":12
//     //         },
//     //     ]
//     // }

//     // async function get() {
//     //     const result = await axios.get(reqOptions.url);
//     //     console.log(result.data);
//     // }
//     // get();
// }, []);

// console.log(hi);

// let reqOptions = {
//     url: "https://jsonplaceholder.typicode.com/posts/",
//     method: "POST",
//     data: [
//         {
//         "number":"hi",
//         "pw":12
//         },
//     ]
// }

// let response = async function() {await axios.request(reqOptions)};
// console.log(response.data);

// const [texts, setTexts] = useState([]);

// let reqOptions = {
//   url: "https://jsonplaceholder.typicode.com/posts/",
//   method: "POST",
//   data: [
//     {
//       "userId": 1,
//       "id":1,
//       "title":"jin",
//       "body":12
//     },
//     {
//       "userId": 1,
//       "id":2,
//       "title": "sang",
//       "body":13
//     }
//   ],
// }

// let response = await axios.request(reqOptions);
// console.log(response.data);

// useEffect(() => {
//   // REST API: axios
//   axios.post("api/test", {
//     "number": number,
//     "pw": pw
//   })
//   .then((response) => {
//     console.log(response.data);
//   }).catch((error) => {
//     console.log(error);
//   });
// }, [number, pw]);

// useEffect(() => {

//     let reqOptions = {
//         url: "https://jsonplaceholder.typicode.com/posts/",
//         method: "GET",
//         data: [
//             {
//             "number":"hi",
//             "pw":12
//             },
//         ]
//     }

//     async function get() {
//         const result = await axios.get(reqOptions.url);
//         console.log(result.data);
//     }
//     get();
// }, []);

// let [mydata, setData] = useState([]);

// useEffect(() => {
//   axios
//     .get("https://de4ff32e-dfa6-43ed-91ca-c66d483f5068.mock.pstmn.io/list")
//     .then((result) => {
//       setData(result.data);
//     })
//     .catch(() => {});
// }, []);

// async function postData() {
//     try {
//         //응답 성공
//         const response = await axios.post('https://de4ff32e-dfa6-43ed-91ca-c66d483f5068.mock.pstmn.io/orderconfirm',{
//             //보내고자 하는 데이터
//             number: "01055664630",
//             pw: "1234"
//         });
//         console.log(response);
//     } catch (error) {
//         //응답 실패
//         console.error(error);
//     }
// }

// postData();

// console.log(mydata);

// return (
//   <div className={styles.App">
//     {/* {mydata.map((i) => {
//       return (
//         <>
//           <p>이름 : {i.name}</p>
//           <p>나이 : {i.age}</p>
//         </>
//       );
//     })} */}
//   </div>
// );
