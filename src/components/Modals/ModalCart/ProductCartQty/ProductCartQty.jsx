import React from "react";
import { useDispatch } from "react-redux";
import { incrementQty, decrementQty, setQty } from "../../../../redux/shoppingCartSlice";
import "./ProductCartQty.css";

function ProductCartQty({ product, handleIncrement, handleDecrement }) {
  const handleQtyChange = (e) => {
    const newQty = Number(e.target.value);

    if (!isNaN(newQty) && newQty > 0) {
      handleDecrement(product.id, newQty);
    }
  };

  return (
    <div className="product-cart-qty d-flex align-items-center">
      <button
        className="btn btn-dec"
        onClick={() => handleDecrement(product.id)}
        disabled={product.quantity === 1}
      >
        -
      </button>

      <input
        type="number"
        value={product.quantity}
        onChange={(e) => handleQtyChange(e)}
        min="1"
        maxLength="4"
      />

      <button className="btn btn-inc" onClick={() => handleIncrement(product.id)}>
        +
      </button>
    </div>
  );
}

export default ProductCartQty;
