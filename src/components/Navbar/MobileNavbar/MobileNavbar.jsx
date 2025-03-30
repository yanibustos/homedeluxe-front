import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartIcon from "../../commons/CartIcon/CartIcon";
import totalQty from "../../../helpers/totalQty";
import ModalCart from "../../Modals/ModalCart/ModalCart";
import { logout } from "../../../redux/userSlice";

import "./MobileNavbar.css";

const MobileNavbar = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleShowModal = () => {
    setShow(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const signOut = () => {
    setIsSidebarOpen(false);
    dispatch(logout());
  };

  return (
    <div className="mobile-navbar container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="offcanvasNavbar"
        onClick={toggleSidebar}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="logo flex-grow-1">
        <Link to="/">
          <img className="logo-img" src="../../img/logo-white.png" alt="Home Deluxe" />
        </Link>
      </div>

      <div
        className={`offcanvas offcanvas-start d-flex ${isSidebarOpen ? "show" : "hide"}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            onClick={toggleSidebar}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1">
            <li className="nav-item">
              <Link className="nav-link my-account d-flex" to="/profile">
                <span className="user-icon-wrapper me-2">
                  <i className="bi bi-person-fill fs-5"></i>
                </span>
                My Account
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products" onClick={toggleSidebar}>
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products/featured" onClick={toggleSidebar}>
                Featured
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={toggleSidebar}>
                About this project
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile" onClick={toggleSidebar}>
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={signOut}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="cart-icon" onClick={handleShowModal}>
        <CartIcon />
        <span className="cart-qty">{totalQty(shoppingCart)}</span>
      </div>
      <ModalCart show={show} setShow={setShow} />
    </div>
  );
};

export default MobileNavbar;
