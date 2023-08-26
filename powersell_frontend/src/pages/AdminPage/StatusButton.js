import { React, useState } from "react";
import axios from "axios";

import hostURL from "../../hostURL";

const StatusButton = (props) => {
  const { orderId, orderStatus, reloadFlag, setReloadFlag } = props;

  // styles
  const orderDelivery = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
  };

  const ButtonStyle = {
    backgroundColor: "white",
    color: "black",
    borderRadius: "7px",
    fontSize: "12px",
    border: "1px solid rgb(181, 181, 181)",
    padding: "1px 0",
    cursor: "pointer",
    width: "62px",
    height: "26px"
  };

  const clickedButtonStyle = {
    backgroundColor: "#fa7979",
    color: "white",
    borderColor: "transparent",
    borderRadius: "7px",
    fontSize: "12px",
    padding: "1px 0",
    cursor: "pointer",
    width: "62px",
    height: "26px"
  };

  // style flag
  const initialStyle = [ButtonStyle, ButtonStyle, ButtonStyle, ButtonStyle];
  switch (orderStatus) {
    case "WAITING":
      initialStyle[0] = clickedButtonStyle;
      break;
    case "DELIVERING":
      initialStyle[1] = clickedButtonStyle;
      break;
    case "ARRIVED":
      initialStyle[2] = clickedButtonStyle;
      break;
    case "CANCELED":
      initialStyle[3] = clickedButtonStyle;
      break;
    default:
      break;
  }
  const [style1, setStyle1] = useState(initialStyle[0])
  const [style2, setStyle2] = useState(initialStyle[1])
  const [style3, setStyle3] = useState(initialStyle[2])
  const [style4, setStyle4] = useState(initialStyle[3])

  // REST API 1-4: WAITING
  const handleClickWaiting = () => {
    axios
      .patch(`${hostURL}/api/admin/orders/${orderId}`, { status: "WAITING" })
      .then((response) => {
        setStyle1(clickedButtonStyle);
        setStyle2(ButtonStyle);
        setStyle3(ButtonStyle);
        setStyle4(ButtonStyle);
        reloadFlag === 0 ? setReloadFlag(1) : setReloadFlag(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // REST API 1-4: DELIVERING
  const handleClickDelivering = () => {
    console.log(orderId)
    axios
      .patch(`${hostURL}/api/admin/orders/${orderId}`, { status: "DELIVERING" })
      .then((response) => {
        setStyle1(ButtonStyle);
        setStyle2(clickedButtonStyle);
        setStyle3(ButtonStyle);
        setStyle4(ButtonStyle);
        reloadFlag === 0 ? setReloadFlag(1) : setReloadFlag(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // REST API 1-4: ARRIVED
  const handleClickArrived = () => {
    axios
      .patch(`${hostURL}/api/admin/orders/${orderId}`, { status: "ARRIVED" })
      .then((response) => {
        setStyle1(ButtonStyle);
        setStyle2(ButtonStyle);
        setStyle3(clickedButtonStyle);
        setStyle4(ButtonStyle);
        reloadFlag === 0 ? setReloadFlag(1) : setReloadFlag(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // REST API 1-4: CANCELED
  const handleClickCanceled = () => {
    axios
      .patch(`${hostURL}/api/admin/orders/${orderId}`, { status: "CANCELED" })
      .then((response) => {
        setStyle1(ButtonStyle);
        setStyle2(ButtonStyle);
        setStyle3(ButtonStyle);
        setStyle4(clickedButtonStyle);
        reloadFlag === 0 ? setReloadFlag(1) : setReloadFlag(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={orderDelivery}>
      <button
        onClick={handleClickWaiting}
        style={style1}
      >
        입금대기
      </button>
      <button
        onClick={handleClickDelivering}
        style={style2}
      >
        배송중
      </button>
      <button
        onClick={handleClickArrived}
        style={style3}
      >
        배송완료
      </button>
      <button
        onClick={handleClickCanceled}
        style={style4}
      >
        주문취소
      </button>
    </div>
  );
};

export default StatusButton;
