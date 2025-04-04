import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { removeFromcart } from "../../../redux/shoppingCartSlice";
import CloseModalBtn from "./CloseModalBtn/CloseModalBtn";
import ProductCartQty from "./ProductCartQty/ProductCartQty";
import currencyFormatter from "../../../helpers/formatPrice";
import totalPrice from "../../../helpers/totalPrice";
import totalQty from "../../../helpers/totalQty";

import "./ModalCart.css";

function ModalCart({ show, setShow }) {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const isEmpty = shoppingCart.length === 0;

  const handleClose = () => setShow(false);

  const handleRemove = (productId) => {
    dispatch(removeFromcart(productId));
  };

  return (
    <div className="modalCart-container">
      <Modal show={show} onHide={handleClose} fullscreen="sm-down" size={"md"}>
        <Modal.Body className="d-flex justify-content-center modal-container">
          {!isEmpty ? (
            <div className="details w-100 d-flex flex-column">
              <div className="container header">
                <div className="row fw-bold pb-2 align-items-center">
                  <div className="col-7 text-uppercase ps-0">
                    Articles ({totalQty(shoppingCart)})
                  </div>
                  <div className="col-2 text-uppercase qty p-0">Quantity</div>
                  <div className="col-2 text-uppercase price text-end">Price</div>
                </div>
              </div>
              <div className="container content position-relative">
                {shoppingCart.map((item) => (
                  <div className="row product d-flex" key={item.id}>
                    <div className="col-7 ps-0">
                      <Link to={`products/${item.slug}`} className="text-decoration-none d-flex">
                        <img src={item.image} alt={item.name} className="me-2" />
                        <div>
                          <p className="mb-0 fw-bold">{item.name}</p>
                          <p className="sku">{item.sku}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="col-2 qty-wrapper text-center px-0">
                      <ProductCartQty product={item} />
                    </div>
                    <div className="col-2 text-center px-0 d-flex justify-content-end">
                      <span className="price-value d-flex me-2">
                        <span className="currency text-uppercase">usd</span>
                        <span>{currencyFormatter(item.price * item.quantity)}</span>
                      </span>
                      <div className="d-flex trash-wrapper">
                        <i className="bi bi-trash" onClick={() => handleRemove(item.id)}></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="footer mt-auto">
                <div className="amount d-flex flex-column justify-content-center align-items-center position-relative pt-3">
                  <p className="fw-bold mb-3">
                    Order Total: <span className="currency text-uppercase">usd </span>
                    {totalPrice(shoppingCart)}
                  </p>
                  <Link to="/checkout" className="btn-standard btn01 text-decoration-none">
                    Complete Purchase
                  </Link>
                  <CloseModalBtn handleClose={handleClose} />
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex flex-column">
              <p id="empty-cart" className="m-0 p-0">
                You haven’t added any products yet.
              </p>
              <CloseModalBtn handleClose={handleClose} />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalCart;
