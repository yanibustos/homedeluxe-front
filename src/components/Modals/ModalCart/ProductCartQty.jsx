import React from "react";
import { useDispatch } from "react-redux";

import { incrementQty, decrementQty, setQty } from "../../../redux/shoppingCartSlice";

function ProductCartQty({ product }) {
  const dispatch = useDispatch();

  const handleIncrement = (productId) => {
    dispatch(incrementQty(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQty(productId));
  };

  const handleQtyChange = (id, qty) => {
    const newQty = Number(qty);

    if (!isNaN(newQty) && newQty > 0) {
      dispatch(setQty({ id, qty: newQty }));
    }
  };

  return (
    <div className="d-flex">
      <button
        className="btn-dec"
        onClick={() => handleDecrement(product.id)}
        disabled={product.quantity === 1}
      >
        -
      </button>
      <input
        type="text"
        maxLength="4"
        value={product.quantity}
        onChange={(e) => handleQtyChange(product.id, e.target.value)}
        name="quantity"
      ></input>
      <button className="btn-inc" onClick={() => handleIncrement(product.id)}>
        +
      </button>
    </div>
  );
}

export default ProductCartQty;
