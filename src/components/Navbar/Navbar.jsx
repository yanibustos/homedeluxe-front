import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartIcon from "../commons/CartIcon/CartIcon";
import ModalCart from "../Modals/ModalCart/ModalCart";
import totalQty from "../../helpers/totalQty";
import totalPrice from "../../helpers/totalPrice";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { logout } from "../../redux/userSlice";

import "./Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Navbar() {
  const [show, setShow] = useState(false);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isHomePath = pathname === "/";
  const navRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 992px)");
  const navigate = useNavigate();

  const handleShowModal = () => {
    setShow(true);
  };

  const signOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (isHomePath) {
          navRef.current.classList.toggle("nav-transparent", window.scrollY <= 59);
          navRef.current.classList.toggle("nav-dark", window.scrollY > 59);
        } else {
          navRef.current.classList.add("nav-dark");
          navRef.current.classList.add("sticky-top");
          navRef.current.classList.remove("nav-transparent");
          navRef.current.classList.remove("fixed-top");
        }
      }
    };

    if (isHomePath) {
      navRef.current.classList.remove("nav-dark");
      navRef.current.classList.remove("sticky-top");
      navRef.current.classList.add("nav-transparent");
      navRef.current.classList.add("fixed-top");
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePath]);

  return (
    <nav ref={navRef} className="navbar navbar-expand-lg sticky-top w-100 nav-dark">
      {!isMobile ? (
        <div className="container d-flex align-items-center">
          <Link className="navbar-brand p-0" to="/">
            <img className="object-contain" src="../img/logo-white.png" alt="Home Deluxe" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <ul className="navbar-nav me-auto d-flex align-items-center gap-4">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products/featured">
                Featured
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About this project
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto d-flex align-items-center gap-4">
            <li className="dropdown">
              <button
                className="btn btn-transparent dropdown-toggle nav-item"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle={user.accessToken ? "dropdown" : ""}
                aria-expanded={user.accessToken ? "true" : "false"}
                onClick={() => (!user.accessToken ? navigate("/login") : {})}
              >
                {user.accessToken ? `${user.firstname} ${user.lastname}` : "My Account"}
              </button>
              {user.accessToken && (
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="account/orders">
                      My Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="account/wishlist">
                      My Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/" onClick={signOut}>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="nav-item d-flex">
              <span className="nav-link" onClick={handleShowModal}>
                <span className="position-relative">
                  <CartIcon />
                  {shoppingCart.length !== 0 && (
                    <span className="position-absolute top-0 start-0 cart-qty">
                      {totalQty(shoppingCart)}
                      <span className="visually-hidden">products quantity</span>
                    </span>
                  )}
                </span>
                {shoppingCart.length !== 0 && (
                  <span className="total-price-wrapper">
                    <span className="ms-2 currency text-uppercase">usd</span>
                    <span className="ms-1">{totalPrice(shoppingCart)}</span>
                  </span>
                )}
              </span>

              <span className="me-2">
                <ModalCart show={show} setShow={setShow} />
              </span>
            </li>
          </ul>
        </div>
      ) : (
        <MobileNavbar />
      )}
    </nav>
  );
}

export default Navbar;
