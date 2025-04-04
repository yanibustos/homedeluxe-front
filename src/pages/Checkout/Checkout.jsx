import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import BlackButton from "../../components/commons/BlackButton/BlackButton";
import ShippingForm from "../../components/ShippingForm/ShippingForm";
import ProductCartQty from "../../components/Modals/ModalCart/ProductCartQty/ProductCartQty";
import RemoveModal from "../../components/Modals/RemoveModal/RemoveModal";

import "./Checkout.css";

const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number must be numeric")
    .required("Phone number is required"),
  country: Yup.string().required("Country is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().matches(/^\d+$/, "Zip code must be numeric").required("Zip code is required"),
  nameOnCard: Yup.string().required("Name on Card is required"),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
    .required("Card Number is required"),
  expiry: Yup.string()
    .matches(/^\d{4}$/, "Expiration date must be in MMYY format")
    .required("Expiration Date is required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be exactly 3 digits")
    .required("CVV is required"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [orderSummary, setOrderSummary] = useState({
    items: [
      {
        id: 1,
        name: "Product 1",
        price: 30.0,
        quantity: 2,
        image:
          "https://f.fcdn.app/imgs/4de0fb/www.divino.com.uy/div/1706/original/catalogo/239467002_0/1500-1500/sillon-3-cuerpos-tela-gris-luares.jpg",
      },
      {
        id: 2,
        name: "Product 2",
        price: 15.0,
        quantity: 1,
        image:
          "https://balton.com.uy/cdn/shop/files/base-de-cama-queen-basic-off-white-dalla-costa-2352-large.jpg?v=1719857680",
      },
    ],
    subtotal: 75.0,
    shipping: 10.0,
    total: 85.0,
  });

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    zip: "",
    nameOnCard: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const checkFormValidity = async () => {
      const valid = await validationSchema.isValid(formData);
      setIsFormValid(valid);
    };

    checkFormValidity();
  }, [formData]);

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleRemoveItemClick = (itemId) => {
    setItemToRemove(itemId);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    setOrderSummary((prevState) => {
      const updatedItems = prevState.items.filter((item) => item.id !== itemToRemove);

      const newSubtotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const newTotal = newSubtotal + prevState.shipping;

      return {
        ...prevState,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    });

    setShowModal(false);
  };

  const handleCancelRemove = () => {
    setShowModal(false);
  };

  const handleRedirectPayment = (method) => {
    if (method === "paypal") {
      toast.warning("This function is still under development...");
    } else if (method === "mercadopago") {
      toast.warning("This function is still under development...");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    if (value && !/^\d+$/.test(value)) {
      toast.error("Only numbers are allowed in this field.");
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validationSchema.isValid(formData);
    if (!isValid) {
      toast.error("Please fill out all fields correctly.");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      console.log("Checkout data:", formData);
      setIsProcessing(false);
      alert("Order confirmed!");
    }, 2000);
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleIncrement = (itemId) => {
    setOrderSummary((prevState) => {
      const updatedItems = prevState.items.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      const newSubtotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const newTotal = newSubtotal + prevState.shipping;

      return {
        ...prevState,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    });
  };

  const handleDecrement = (itemId) => {
    setOrderSummary((prevState) => {
      const updatedItems = prevState.items.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

      const newSubtotal = updatedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );

      const newTotal = newSubtotal + prevState.shipping;

      return {
        ...prevState,
        items: updatedItems,
        subtotal: newSubtotal,
        total: newTotal,
      };
    });
  };

  return (
    <div className="checkout-container">
      <div className="container">
        <div className="fake-navbar d-flex align-items-center p-3">
          <button
            onClick={handleBackToHome}
            className="btn btn-link back-home-btn d-none d-md-block"
          >
            &larr; Back to home
          </button>

          <button
            onClick={handleBackToHome}
            className="btn btn-link back-home-btn d-block d-md-none"
          >
            &larr;
          </button>

          <h2 className="title text-center">CHECKOUT</h2>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="row">
          <div className="col-md-6">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <ShippingForm
                formData={formData}
                handleChange={handleInputChange}
                handleNumberInput={handleNumberInput}
              />

              <div className="payment-method">
                <h4 className="mb-4 pt-5">Payment Method</h4>

                <hr className="my-4" />

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="creditCard"
                      name="paymentMethod"
                      value="creditCard"
                      checked={paymentMethod === "creditCard"}
                      onChange={() => handlePaymentMethodChange("creditCard")}
                      required
                    />
                    <label className="form-check-label" htmlFor="creditCard">
                      Credit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="paypal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => handlePaymentMethodChange("paypal")}
                      required
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="mercadopago"
                      name="paymentMethod"
                      value="mercadopago"
                      checked={paymentMethod === "mercadopago"}
                      onChange={() => handlePaymentMethodChange("mercadopago")}
                      required
                    />
                    <label className="form-check-label" htmlFor="mercadopago">
                      Mercado Pago
                    </label>
                  </div>
                </div>

                {paymentMethod === "creditCard" && (
                  <div>
                    <div className="form-group">
                      <label htmlFor="nameOnCard" className="form-label">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardNumber" className="form-label mt-3">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="d-flex flex-wrap gap-3 mt-3">
                      <div className="col-12 col-md-6 mb-3">
                        <label htmlFor="expiry" className="form-label">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleNumberInput}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="cvv" className="form-label">
                          CVV
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleNumberInput}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "paypal" && (
                  <div className="mt-4">
                    <BlackButton
                      name="Pay with PayPal"
                      loading={isProcessing}
                      disabled={isProcessing}
                      handleOnClick={() => handleRedirectPayment(paymentMethod)}
                      className="w-100"
                    >
                      <span> Pay with PayPal</span>
                      <i className="bi bi-paypal" style={{ marginLeft: "10px" }}></i>
                    </BlackButton>
                  </div>
                )}

                {paymentMethod === "mercadopago" && (
                  <div className="mt-4">
                    <BlackButton
                      name="Pay with Mercado Pago"
                      loading={isProcessing}
                      disabled={isProcessing}
                      handleOnClick={() => handleRedirectPayment(paymentMethod)}
                      className="w-100"
                    >
                      <span> Pay with MercadoPago</span>
                      <i className="bi bi-credit-card" style={{ marginLeft: "10px" }}></i>
                    </BlackButton>
                  </div>
                )}
              </div>

              <BlackButton
                name={isProcessing ? "Processing..." : "Confirm Order"}
                className="w-100 mt-4"
                loading={isProcessing}
                disabled={isProcessing || !isFormValid}
                handleOnClick={handleSubmit}
              />
            </form>
          </div>
          <div className="col-md-6">
            <div className="order-summary">
              <h4 className="order-summary-title mb-4">Order Summary</h4>
              <ul className="list-group">
                {orderSummary.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex flex-wrap justify-content-between align-items-center p-3 position-relative"
                  >
                    <div className="d-flex align-items-center w-100">
                      <div className="col-auto mb-3 mb-sm-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-thumbnail"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-6 col-md-5 p-2">
                        <span className="product-name">{item.name}</span>
                      </div>
                      <div className="col-3 col-md-2 text-center p-2">
                        <span className="d-block">Quantity</span>
                        <ProductCartQty
                          product={item}
                          handleIncrement={handleIncrement}
                          handleDecrement={handleDecrement}
                        />
                      </div>
                      <div className="col-3 col-md-2 text-center p-2">
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
          </div>
        </div>

        <RemoveModal
          showModal={showModal}
          itemToRemove={itemToRemove}
          handleCancelRemove={handleCancelRemove}
          handleConfirmRemove={handleConfirmRemove}
        />
      </div>
    </div>
  );
};

export default Checkout;
