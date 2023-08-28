import { React, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Header from "../../components/Header";

import 삼다수 from "../../images/home/삼다수.jpg";
import 신라면 from "../../images/home/신라면.jpg";
import 컵밥 from "../../images/home/컵밥.jpg";
import 햇반 from "../../images/home/햇반.jpg";
import 구운란 from "../../images/home/구운란.jpg";
import copyText from "../../images/icons/copyText.png";

import styles from "./orderconfirm.module.css";

// OrderConfirm function
const OrderConfirmPage = () => {
  const output = useLocation().state;
  const navigate = useNavigate();

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
        break;
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
          {[...output]
            .sort((a, b) => {
              if (a.orderDate > b.orderDate) return -1;
              if (a.orderDate < b.orderDate) return 1;
              return 0;
            })
            .map((order) => (
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
                            <div>
                              {order.item.originalPrice * order.count}원
                            </div>
                          </div>
                          <div>
                            <p>할인 금액</p>
                            <div>
                              {order.item.originalPrice * order.count -
                                order.orderPrice}
                              원
                            </div>
                          </div>
                          <div>
                            <p>최종 결제금액</p>
                            <div>{order.orderPrice}원</div>
                          </div>
                        </div>
                      </div>

                      {/* order information */}
                      <div className={styles.order_information}>
                        <hr></hr>
                        <div>
                          <div>
                            <span>주문자</span>: {order.name}
                          </div>
                          <div>
                            <span>전화번호</span>: {order.number}
                          </div>
                          <div>
                            <span>주문 일시</span>:{" "}
                            {order.orderDate.replace("T", " ").slice(0, 19)}
                          </div>
                          <div>
                            <span>주소</span>: {order.address} {order.dongho}
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
                {order.orderStatus === "WAITING" ||
                order.orderStatus === null ? (
                  <div className={styles.order_noti}>
                    <hr></hr>
                    <div>
                      <div>
                        아직 <span>입금 대기</span> 단계이신가요?
                      </div>
                      <div>※ 주문 후 30분 내 미입금시 주문 취소됩니다</div>
                      <div>
                        <span>ㆍ</span>예금주: <span>박진효</span>
                      </div>
                      <div>
                        <span>ㆍ</span>계좌:{" "}
                        <CopyToClipboard
                          text="3333277508505"
                          onCopy={() => alert("계좌가 복사되었습니다")}
                        >
                          <span>
                            <span
                              style={{
                                textDecoration: "underline",
                              }}
                            >
                              카카오뱅크 3333277508505
                            </span>
                            <img
                              src={copyText}
                              alt="copy"
                              width={14}
                              style={{ cursor: "pointer", marginLeft: "7px" }}
                            />
                          </span>
                        </CopyToClipboard>
                      </div>
                      <div>
                        (입금자명을{" "}
                        <span style={{ color: "black" }}>'{order.name}'</span>로
                        해주세요)
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
