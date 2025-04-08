import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [showAccount, setShowAccount] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const toggleAccount = () => {
    setShowAccount(!showAccount);
  };

  return (
    <div className="mobile-navbar container px-3">
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
        className={`offcanvas-backdrop ${isSidebarOpen ? "show" : "d-none"}`}
        onClick={toggleSidebar}
      ></div>
      <div
        className={`offcanvas offcanvas-start d-flex ${isSidebarOpen ? "show" : "hide"}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1">
            <li className="nav-item d-flex">
              <div className="nav-link my-account d-flex flex-column p-0">
                <button
                  type="button"
                  className="btn btn-link nav-link my-account d-flex"
                  onClick={() => {
                    !user.accessToken ? navigate("/account/profile") : toggleAccount();
                  }}
                >
                  <span className="user-icon-wrapper me-2">
                    <i className="bi bi-person-fill fs-5"></i>
                  </span>
                  {user.accessToken ? `${user.firstname} ${user.lastname}` : "My Account"}
                  {user.accessToken && (
                    <div className="btnItem" data-show={showAccount ? "on" : ""}></div>
                  )}
                </button>
                {user.accessToken && showAccount && (
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne">
                    <div>
                      <Link to="/account/profile" className="nav-link" onClick={toggleSidebar}>
                        My Profile
                      </Link>
                      <Link to="/account/orders" className="nav-link" onClick={toggleSidebar}>
                        My Orders
                      </Link>
                      <Link to="/account/wishlist" className="nav-link" onClick={toggleSidebar}>
                        My Wishlist
                      </Link>
                      <Link
                        className="nav-link"
                        to="/"
                        onClick={() => {
                          signOut();
                          toggleSidebar();
                        }}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
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
          </ul>
        </div>
      </div>

      <div className="cart-icon" onClick={handleShowModal}>
        <CartIcon />
        {shoppingCart.length !== 0 && <span className="cart-qty">{totalQty(shoppingCart)}</span>}
      </div>
      <ModalCart show={show} setShow={setShow} />
    </div>
  );
};

export default MobileNavbar;
