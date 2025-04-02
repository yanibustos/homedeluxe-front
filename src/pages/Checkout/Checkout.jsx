import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import BlackButton from "../../components/commons/BlackButton/BlackButton";
import Input from "../../components/commons/Input/Input";
import ShippingForm from "../../components/ShippingForm/ShippingForm";

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
    .matches(/^\d+$/, "Card Number must be numeric")
    .required("Card Number is required"),
  expiry: Yup.string()
    .matches(/^\d+$/, "Expiration Date must be numeric")
    .required("Expiration Date is required"),
  cvv: Yup.string().matches(/^\d+$/, "CVV must be numeric").required("CVV is required"),
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
      const updatedItems = prevState.items
        .map((item) => {
          if (item.id === itemToRemove) {
            if (item.quantity > 1) {
              item.quantity -= 1;
            } else {
              return null;
            }
          }
          return item;
        })
        .filter((item) => item !== null);

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
      toast.success("This function is still under development...");
    } else if (method === "mercadopago") {
      toast.success("This function is still under development...");
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

  return (
    <div className="checkout-container">
      <div className="container">
        <div className="fake-navbar d-flex align-items-center p-3">
          <button onClick={handleBackToHome} className="btn btn-link back-home-btn">
            &larr; Back
          </button>
          <h2 className="title text-center">Checkout</h2>
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
          <div className="col-md-7">
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
                    <div>
                      <label htmlFor="nameOnCard" className="form-label mt-3">
                        Name on Card
                      </label>
                      <Input
                        type="text"
                        className="form-control"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="form-label">
                        Card Number
                      </label>
                      <Input
                        type="text"
                        inputMode="numeric"
                        pattern="\d*"
                        className="form-control"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleNumberInput}
                        required
                      />
                    </div>
                    <div className="row mb-5">
                      <div className="col-md-6">
                        <label htmlFor="expiry" className="form-label">
                          Expiry Date
                        </label>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
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
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
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
              <h4 className="order-summary-title mb-4"> Order Summary</h4>
              <ul className="list-group">
                {orderSummary.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-thumbnail mr-3 product-image"
                      />
                      <span className="product-name">{item.name}</span>
                    </div>

                    <div className="d-flex flex-column align-items-end">
                      <div className="d-flex justify-content-between">
                        <div className="text-center">
                          <span className="d-block">Quantity</span>
                          <span>{item.quantity}</span>
                        </div>
                        <div className="text-center">
                          <span className="d-block">Price</span>
                          <span>USD {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        className="btn btn-sm mt-2"
                        onClick={() => handleRemoveItemClick(item.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
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

        <Modal show={showModal} onHide={handleCancelRemove}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Removal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to remove one unit of this item?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelRemove} className="custom-modal-btn">
              Cancel
            </Button>
            <Button
              variant="dark"
              onClick={handleConfirmRemove}
              className="custom-modal-btn custom-modal"
            >
              Remove
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;
