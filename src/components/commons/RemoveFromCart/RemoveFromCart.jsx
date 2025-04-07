import React from "react";
import { useDispatch } from "react-redux";

import { removeFromcart } from "../../../redux/shoppingCartSlice";

import "./RemoveFromCart.css";

function RemoveFromCart({ productId, size = 16, color = "#555555" }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromcart(productId));
  };

  return (
    <div className="trash-icon-container">
      <svg
        onClick={handleRemove}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        width={size}
        height={size}
        className="cursor-pointer"
        color={color}
      >
        <path d="M3 6h18M19 6l-1 14H6L5 6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M10 11v6M14 11v6" />
      </svg>
    </div>
  );
}

export default RemoveFromCart;
