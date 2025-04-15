import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import CartIcon from "../commons/CartIcon/CartIcon";
import ModalCart from "../Modals/ModalCart/ModalCart";
import totalQty from "../../helpers/totalQty";
import totalPrice from "../../helpers/totalPrice";
import MobileNavbar from "./MobileNavbar/MobileNavbar";
import useMediaQuery from "../../hooks/useMediaQuery";
import { Dropdown } from "react-bootstrap";

import "./Navbar.css";

function Navbar() {
  const [show, setShow] = useState(false);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const user = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const isHomePath = pathname === "/";
  const isAboutPath = pathname === "/about";
  const navRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 992px)");

  const handleShowModal = () => {
    setShow(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (isHomePath || isAboutPath) {
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

    if (isHomePath || isAboutPath) {
      navRef.current.classList.remove("nav-dark");
      navRef.current.classList.remove("sticky-top");
      navRef.current.classList.add("nav-transparent");
      navRef.current.classList.add("fixed-top");
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePath, isAboutPath]);

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
            {user.accessToken ? (
              <Dropdown>
                <Dropdown.Toggle className="nav-item user-menu" id="user-dropdown">
                  {user.firstname} {user.lastname}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/account/profile">
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/account/orders">
                    My Orders
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/account/wishlist">
                    My Wishlist
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/logout">
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  My Account
                </Link>
              </li>
            )}

            <li className="nav-item d-flex">
              <span className="nav-link pe-0 d-flex" onClick={handleShowModal}>
                <span className="position-relative">
                  <CartIcon size={20} />
                  {shoppingCart.length !== 0 && (
                    <span className="position-absolute top-0 start-0 cart-qty">
                      {totalQty(shoppingCart)}
                      <span className="visually-hidden">products quantity</span>
                    </span>
                  )}
                </span>
                {shoppingCart.length !== 0 && (
                  <span className="total-price-wrapper mt-auto">
                    <span className="ms-2 currency text-uppercase">usd</span>
                    <span className="ms-1">{totalPrice(shoppingCart)}</span>
                  </span>
                )}
              </span>

              <ModalCart show={show} setShow={setShow} />
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
