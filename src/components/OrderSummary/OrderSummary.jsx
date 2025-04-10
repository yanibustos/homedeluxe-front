import React from "react";
import ProductCartQty from "../commons/ProductCartQty/ProductCartQty";

const OrderSummary = ({ shoppingCart, orderSummary, handleRemoveItemClick }) => {
  return (
    <div className="order-summary">
      <h4 className="order-summary-title mb-4">Order Summary</h4>
      <ul className="list-group">
        {shoppingCart.map((item) => (
          <li
            key={item.id}
            className="container list-group-item d-flex flex-wrap justify-content-between align-items-center p-3 position-relative"
          >
            <div className="row">
              <div className="col-2 mb-3 mb-sm-0">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="img-thumbnail"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-4 p-2">
                <span className="product-name">{item.name}</span>
              </div>
              <div className="col-3 text-center p-2">
                <span>Quantity</span>
                <ProductCartQty product={item} />
              </div>
              <div className="col-3 co text-center p-2">
                <span className="d-block">USD</span>
                <span>{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
            <button
              className="btn btn-sm position-absolute top-50 end-0 translate-middle-y"
              onClick={() => handleRemoveItemClick(item.id)}
              style={{
                marginRight: "10px",
                padding: "8px 12px",
              }}
            >
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Subtotal
          <span>USD {orderSummary.subtotal.toFixed(2)}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Shipping
          <span>USD {orderSummary.shipping.toFixed(2)}</span>
        </li>
        <hr />
        <li className="list-group-item d-flex justify-content-between align-items-center pb-4">
          <strong>Total</strong>
          <strong>USD {orderSummary.total.toFixed(2)}</strong>
        </li>
      </ul>
    </div>
  );
};

export default OrderSummary;
