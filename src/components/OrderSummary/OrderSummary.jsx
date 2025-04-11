import React from "react";
import ProductCartQty from "../commons/ProductCartQty/ProductCartQty";

import "./OrderSummary.css";

const OrderSummary = ({ shoppingCart, orderSummary, handleRemoveItemClick }) => {
  return (
    <div className="order-summary">
      <h4 className="order-summary-title mb-4 text-center">Order Summary</h4>

      <div className="d-flex flex-column gap-3">
        {shoppingCart.map((item) => (
          <div key={item.id} className="card py-4 px-3 shadow-sm position-relative">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div className="text-center">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "80px", objectFit: "cover" }}
                />
              </div>

              <div className="text-center text-md-start">
                <h6 className="mb-1">{item.name}</h6>
                <span className="text-muted small">USD {Number(item.price).toFixed(2)} each</span>
              </div>

              <div className="text-center">
                <span className="small mb-1 d-block">Quantity</span>
                <ProductCartQty product={item} />
              </div>

              <div className="text-center">
                <span className="small d-block">USD</span>
                <span>{(Number(item.price) * item.quantity).toFixed(2)}</span>
              </div>

              <div className="d-none d-md-block position-absolute top-0 end-0 m-2">
                <button
                  onClick={() => handleRemoveItemClick(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#dc3545",
                    fontSize: "0.85rem",
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>

              <div className="d-block d-md-none mt-2 text-center">
                <button
                  onClick={() => handleRemoveItemClick(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#dc3545",
                    fontSize: "0.85rem",
                  }}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="p-3 border rounded shadow-sm bg-light">
        <div className="d-flex justify-content-between mb-2">
          <span>Subtotal</span>
          <span>USD {orderSummary.subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Shipping</span>
          <span>USD {orderSummary.shipping.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between mb-2">
          <span>Taxes</span>
          <span>USD {orderSummary.taxes.toFixed(2)}</span>
        </div>
        <hr />
        <div className="d-flex justify-content-between fw-bold fs-5">
          <span>Total</span>
          <span>USD {orderSummary.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
