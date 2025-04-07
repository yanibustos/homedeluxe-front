import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { incrementQty, decrementQty, setQty } from "../../../redux/shoppingCartSlice";
import RemoveFromCart from "../RemoveFromCart/RemoveFromCart";

import "./ProductCartQty.css";

function ProductCartQty({ product, inCard = false }) {
  const dispatch = useDispatch();
  const [inputQty, setInputQty] = useState(product.quantity);

  const handleIncrement = () => {
    dispatch(incrementQty(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQty(product.id));
  };

  const handleQtyChange = (qty) => {
    setInputQty(qty);

    const newQty = Number(qty);

    if (!isNaN(newQty) && newQty > 0) {
      dispatch(setQty({ id: product.id, qty: newQty }));
    }
  };

  useEffect(() => {
    setInputQty(product.quantity);
  }, [product.quantity]);

  return (
    <div className="product-cart-qty d-flex">
      {!inCard || product.quantity > 1 ? (
        <button className="btn-dec" onClick={handleDecrement} disabled={product.quantity === 1}>
          -
        </button>
      ) : (
        <RemoveFromCart productId={product.id} size={inCard && 18} color={inCard && "#000"} />
      )}
      <input
        type="text"
        maxLength="2"
        value={inputQty}
        onChange={(e) => handleQtyChange(e.target.value)}
        name="quantity"
      ></input>
      <button className="btn-inc" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}

export default ProductCartQty;
