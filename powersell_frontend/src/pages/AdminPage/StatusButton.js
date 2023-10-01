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

  // intial button style
  const initialStyle = {
    WAITING: ButtonStyle,
    DELIVERING: ButtonStyle,
    ARRIVED: ButtonStyle,
    CANCELED: ButtonStyle
  };

  switch (orderStatus) {
    case "WAITING":
      initialStyle.WAITING = clickedButtonStyle;
      break;
    case "DELIVERING":
      initialStyle.DELIVERING = clickedButtonStyle;
      break;
    case "ARRIVED":
      initialStyle.ARRIVED = clickedButtonStyle;
      break;
    case "CANCELED":
      initialStyle.CANCELED = clickedButtonStyle;
      break;
    default:
      break;
  }

  const [styleInput, setStyleInput] = useState(initialStyle);
  const { WAITING, DELIVERING, ARRIVED, CANCELED } = styleInput;
  
  // REST API 1-4: change order status
  const onClick = (e) => {
    setStyleInput({
      WAITING: ButtonStyle,
      DELIVERING: ButtonStyle,
      ARRIVED: ButtonStyle,
      CANCELED: ButtonStyle
    });

    axios
    .patch(`${hostURL}/api/admin/orders/${orderId}`, { status: e.target.value })
    .then((response) => {
      setStyleInput((prev) => ({...prev, [e.target.value]: clickedButtonStyle}));
      reloadFlag === 0 ? setReloadFlag(1) : setReloadFlag(0);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div style={orderDelivery}>
      <button
        onClick={onClick}
        style={WAITING}
        value="WAITING"
      >
        입금대기
      </button>
      <button
        onClick={onClick}
        style={DELIVERING}
        value="DELIVERING"
      >
        배송중
      </button>
      <button
        onClick={onClick}
        style={ARRIVED}
        value="ARRIVED"
      >
        배송완료
      </button>
      <button
        onClick={onClick}
        style={CANCELED}
        value="CANCELED"
      >
        주문취소
      </button>
    </div>
  );
};

export default StatusButton;
