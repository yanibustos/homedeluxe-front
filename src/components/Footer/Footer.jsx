import React from "react";

import { Container } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="social-media-section">
        <h3 className="follow-us-text fw-bold">Follow us</h3>
        <div className="social-media-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </div>

      <Container className="footer-content">
        <div className="footer-column">
          <h3 className="fw-bold">Company</h3>
          <Link to="/about-us">
            <p>About us</p>
          </Link>
          <Link to="/terms-conditions">
            <p>Terms & Conditions</p>
          </Link>
          <Link to="/privacy">
            <p>Privacy & Policy</p>
          </Link>
        </div>

        <div className="footer-column">
          <h3 className="fw-bold">Account</h3>
          <Link to="/manage-account">
            <p>Manage Account</p>
          </Link>
          <Link to="/returns-exchanges">
            <p>Returns & Exchanges</p>
          </Link>
          <Link to="/redeem-gift-card">
            <p>Redeem a Gift Card</p>
          </Link>
        </div>

        <div className="footer-column">
          <h3 className="fw-bold">Connect</h3>
          <Link to="/contact-us">
            <p>Contact Us</p>
          </Link>
          <Link to="">
            <p>My Purchases</p>
          </Link>
          <Link to="">
            <p>Frequently Asked Questions</p>
          </Link>
        </div>

        <div className="footer-column subscribe-section">
          <h3 className="fw-bold">Subscribe to our Mailing List</h3>
          <p className="no-hover">Get the latest updates and offers directly in your inbox.</p>
          <form
            className="subscribe-form"
            onSubmit={(e) => {
              e.preventDefault();
              toast.warning("Sorry! This function is under development...");
            }}
          >
            <input type="email" placeholder="Enter your email" className="email-input" />
            <button type="submit" className="subscribe-btn">
              Send
            </button>
          </form>
        </div>
      </Container>

      <div className="footer-bottom">
        <hr />
        <p className="pt-4">Copyright © 2025 Hack Academy.</p>
      </div>
    </div>
  );
}

export default Footer;
