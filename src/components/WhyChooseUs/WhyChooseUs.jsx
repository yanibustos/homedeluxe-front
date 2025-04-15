import React from "react";
import { FaTruck, FaCouch, FaCreditCard, FaStar } from "react-icons/fa";

import "./WhyChooseUs.css";

function WhyChooseUs() {
  return (
    <div className="why-choose-us-container d-flex pt-5 position-relative">
      <div className="container content mt-auto">
        <div className="d-flex flex-column-reverse flex-lg-row">
          <div className="col-12 col-lg-6 d-flex align-self-center">
            <div className="d-flex flex-column justify-content-start">
              <h3 className="heading mb-3 pt-5 text-center text-lg-start">Why Shop With Us</h3>
              <p className="mb-4">
                Experience unique furniture and timeless design. Discover why we're the right choice
                for your dream home.
              </p>
              <div className="row">
                <div className="col-6 mb-3 d-flex align-items-start gap-2">
                  <span className="icon-wrapper">
                    <FaCouch size={20} className="text-white" />
                  </span>
                  <div>
                    <span className="fw-bold">Premium Quality</span>
                    <p className="mb-0 small">
                      Crafted with top-tier materials for long-lasting comfort.
                    </p>
                  </div>
                </div>
                <div className="col-6 mb-3 d-flex align-items-start gap-2">
                  <span className="icon-wrapper">
                    <FaTruck size={20} className="text-white" />
                  </span>
                  <div>
                    <span className="fw-bold">Fast Shipping</span>
                    <p className="mb-0 small">Get your furniture delivered quickly and safely.</p>
                  </div>
                </div>
                <div className="col-6 mb-3 d-flex align-items-start gap-2">
                  <span className="icon-wrapper">
                    <FaCreditCard size={20} className="text-white" />
                  </span>
                  <div>
                    <span className="fw-bold">Flexible Payments</span>
                    <p className="mb-0 small">Easy installment plans to suit your budget.</p>
                  </div>
                </div>
                <div className="col-6 mb-3 d-flex align-items-start gap-2">
                  <span className="icon-wrapper">
                    <FaStar size={20} className="text-white" />
                  </span>
                  <div>
                    <span className="fw-bold">Top-Rated Service</span>
                    <p className="mb-0 small">Our customers love us—and so will you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 d-flex">
            <img src="./img/choose1.png" alt="Image" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChooseUs;
