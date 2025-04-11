import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { clearCart, removeFromcart } from "../../redux/shoppingCartSlice";
import { validationSchema } from "../../components/ShippingForm/ShippingForm";
import fetchApi from "../../api/fetchApi";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import ShippingForm from "../../components/ShippingForm/ShippingForm";
import RemoveModal from "../../components/Modals/RemoveModal/RemoveModal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

import "./Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useState(null);
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [paymentOptions, setPaymentOptions] = useState("");
  const [loading, setLoading] = useState(true);
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const user = useSelector((state) => state.user);

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 20,
    taxes: 0,
    total: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
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

  const handleConfirmOrder = async () => {
    try {
      await fetchApi({
        method: "post",
        url: "/orders",
        data: { userId: user.id, items: shoppingCart, shippingAddress, paymentMethod },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItemClick = (itemId) => {
    setItemToRemove(itemId);
    setShowModal(true);
  };

  const handleConfirmRemove = () => {
    dispatch(removeFromcart(itemToRemove));
    setShowModal(false);
  };
  

  const handleCancelRemove = () => {
    setShowModal(false);
  };

  const handleRedirectPayment = (method) => {
    if (method === "paypal" || method === "mercadopago") {
      toast.warning("This function is still under development...");
    }
  };

  const formatCardNumber = (value) => {
    const numericValue = value.replace(/\D/g, "").substring(0, 16);
    return numericValue.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      cardNumber: formattedValue,
    }));
  };

  const formatExpiryDate = (value) => {
    const numericValue = value.replace(/\D/g, "").substring(0, 4);
    if (numericValue.length >= 3) {
      return `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}`;
    }
    return numericValue;
  };

  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      expiry: formattedValue,
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const code = uuidv4();
    setOrderNumber(code);
    dispatch(clearCart());
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    if (orderNumber) {
      setTimeout(() => {
        navigate("/");
      }, 4000);
    }
  }, [orderNumber, navigate]);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validationSchema.validate(formData, { abortEarly: false });
        setIsFormValid(true);
      } catch (err) {
        setIsFormValid(false);
      }
    };

    validateForm();
  }, [formData]);

  useEffect(() => {
    const subtotal = shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 20;
    const taxes = +(subtotal * 0.08).toFixed(2);
    const total = +(subtotal + shipping + taxes).toFixed(2);

    setOrderSummary({
      subtotal,
      shipping,
      taxes,
      total,
    });
  }, [shoppingCart]);

  return (
    <div className="checkout-container">
      <div className="fake-navbar d-flex align-items-center p-3">
        <button onClick={handleBackToHome} className="btn btn-link back-home-btn d-none d-md-block">
          &larr; Back to home
        </button>
        <button onClick={handleBackToHome} className="btn btn-link back-home-btn d-block d-md-none">
          &larr;
        </button>
        <h2 className="title text-center">CHECKOUT</h2>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />

      <div className="container">
        <div className="row pt-5">
          <div className="col-md-6">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <ShippingForm
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                formData={formData}
                handleNumberInput={handleNumberInput}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                handleCardNumberChange={handleCardNumberChange}
                handleExpiryChange={handleExpiryChange}
              />

              {paymentMethod === "PayPal" && (
                <div className="mt-4">
                  <BlackButton
                    name="Pay with PayPal"
                    loading={isProcessing}
                    disabled={isProcessing}
                    handleOnClick={() => handleRedirectPayment(paymentMethod)}
                    className="w-100"
                  >
                    <span>Pay with PayPal</span>
                    <i className="bi bi-paypal" style={{ marginLeft: "10px" }}></i>
                  </BlackButton>
                </div>
              )}

              {paymentMethod === "Mercado Pago" && (
                <div className="mt-4">
                  <BlackButton
                    name="Pay with Mercado Pago"
                    loading={isProcessing}
                    disabled={isProcessing}
                    handleOnClick={() => handleRedirectPayment(paymentMethod)}
                    className="w-100"
                  >
                    <span>Pay with MercadoPago</span>
                    <i className="bi bi-credit-card" style={{ marginLeft: "10px" }}></i>
                  </BlackButton>
                </div>
              )}

              <BlackButton
                name={isProcessing ? "Processing..." : "Confirm Order"}
                className="w-100 mt-4"
                handleOnClick={handleConfirmOrder}
                disabled={
                  isProcessing || paymentMethod === "PayPal" || paymentMethod === "Mercado Pago"
                }
              />
            </form>

            {orderNumber && (
              <div className="modal show modal-container d-block">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Thank you for your purchase!</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => navigate("/")}
                      ></button>
                    </div>
                    <div className="modal-body text-center d-flex flex-column">
                      <p>
                        Your order number is: <strong>{orderNumber}</strong>
                      </p>
                      <p>Redirecting to Home...</p>
                      <button
                        type="button"
                        className="btn btn-order-close text-white"
                        onClick={() => navigate("/")}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col-md-6">
            <OrderSummary
              shoppingCart={shoppingCart}
              orderSummary={orderSummary}
              handleRemoveItemClick={handleRemoveItemClick}
            />
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
  );
};

export default Checkout;
