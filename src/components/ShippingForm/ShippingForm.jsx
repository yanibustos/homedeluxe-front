import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import Select from "react-select";
import ReactSelectCountryList from "react-select-country-list";

import "./ShippingForm.css";

const lettersOnlyRegex = /^[A-Za-z\s]+$/;

const validationSchema = Yup.object().shape({
  city: Yup.string().required("City is required"),

  country: Yup.string().required("Country is required"),

  phone: Yup.string().required("Phone is required"),

  zip: Yup.string().required("Zip code is required"),

  address: Yup.string().required("Address is required"),

  nameOnCard: Yup.string().required("Card holder name is required"),

  cardNumber: Yup.string().required("Card number is required"),

  expiry: Yup.string().required("Expiry date is required"),

  cvv: Yup.string().required("CVV is required"),
});

const ShippingForm = ({ shippingAddress, setShippingAddress, paymentMethod, setPaymentMethod }) => {
  const user = useSelector((state) => state.user);

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
    paymentMethod: "",
  });

  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        firstName: user.firstname || "",
        lastName: user.lastname || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "",
        address: user.address || "",
        city: user.city || "",
        zip: user.zip || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    const countriesList = ReactSelectCountryList().getData();
    setCountries(countriesList);
  }, []);

  const handleCountryChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      country: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const onlyLettersFields = ["city", "address", "nameOnCard"];
    const lettersOnlyRegex = /^[A-Za-z\s]*$/;

    if (onlyLettersFields.includes(name) && !lettersOnlyRegex.test(value)) {
      toast.error("Only letters are allowed in this field.");
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Solo actualiza shippingAddress cuando el campo modificado sea 'address'
    if (name === "address") {
      setShippingAddress(value);
    }

    if (name === "paymentMethod") {
      setPaymentMethod(value);
    }
  };

  const handleBlur = async (e) => {
    const { name } = e.target;
    try {
      await validationSchema.validateAt(name, formData);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message }));
    }
  };

  const handleCountryBlur = async () => {
    try {
      await validationSchema.validateAt("country", formData);
      setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
    } catch (err) {
      setErrors((prevErrors) => ({ ...prevErrors, country: err.message }));
    }
  };

  const handleNumberInput = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");

    if (name === "phone") {
      // Formato tipo +1 (123) 456-7890
      let formattedValue = numericValue;

      if (numericValue.length > 0) {
        formattedValue = `+${numericValue.slice(0, 1)}`;
      }
      if (numericValue.length >= 2) {
        formattedValue += ` (${numericValue.slice(1, 4)}`;
      }
      if (numericValue.length >= 5) {
        formattedValue += `) ${numericValue.slice(4, 7)}`;
      }
      if (numericValue.length >= 8) {
        formattedValue += `-${numericValue.slice(7, 11)}`;
      }

      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));
  };

  const handleCardNumberChange = (e) => {
    const { value } = e.target;

    const numericValue = value.replace(/\D/g, "");

    const formattedValue = numericValue.replace(/(.{4})/g, "$1-").replace(/-$/, "");

    setFormData((prevState) => ({
      ...prevState,
      cardNumber: formattedValue,
    }));
  };

  const handleExpiryChange = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");

    if (/\D/.test(value)) {
      toast.error("Please enter numeric values in this field.");
    }

    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 4)}`;
    }

    setFormData((prevState) => ({
      ...prevState,
      expiry: formattedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      toast.success("All fields are valid. Proceeding...");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      toast.error("Please fix the errors in the form.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="container">
      <h4 className="mb-4 mt-3">Shipping Information</h4>
      <hr className="my-4" />

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label">
            Firstname
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            readOnly
            onFocus={() => toast.info("This field is not editable.")}
          />
        </div>
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            readOnly
            onFocus={() => toast.info("This field is not editable.")}
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          readOnly
          onFocus={() => toast.info("This field is not editable.")}
        />
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <Select
            options={countries}
            value={countries.find((country) => country.value === formData.country)}
            onChange={handleCountryChange}
            onBlur={handleCountryBlur}
          />
          {errors.country && <div className="text-danger mt-1">{errors.country}</div>}
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          {errors.city && <div className="invalid-feedback">{errors.city}</div>}
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleNumberInput}
            onBlur={handleBlur}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="zip" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className={`form-control ${errors.zip ? "is-invalid" : ""}`}
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleNumberInput}
            onBlur={handleBlur}
          />
          {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className={`form-control ${errors.address ? "is-invalid" : ""}`}
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
      </div>

      <ToastContainer position="top-right" autoClose={5000} />

      <div className="payment-method">
        <h4 className="mb-4 pt-5">Payment Information</h4>
        <hr className="my-4" />

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="form-label">
            Payment Method
          </label>
          <select
            className="form-select"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Mercado Pago">Mercado Pago</option>
          </select>
        </div>

        {paymentMethod === "Credit Card" && (
          <>
            <div className="mb-3">
              <label htmlFor="nameOnCard" className="form-label">
                Card Holder
              </label>
              <input
                type="text"
                className={`form-control ${errors.nameOnCard ? "is-invalid" : ""}`}
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                onBlur={handleBlur}
              />
              {errors.nameOnCard && <div className="invalid-feedback">{errors.nameOnCard}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                onBlur={handleBlur}
                maxLength="19"
              />
              {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
            </div>

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="expiry" className="form-label">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                  id="expiry"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleExpiryChange}
                  onBlur={handleBlur}
                  maxLength="5"
                />
                {errors.expiry && <div className="invalid-feedback">{errors.expiry}</div>}
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label htmlFor="cvv" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleNumberInput}
                  onBlur={handleBlur}
                  maxLength="3"
                />
                {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
              </div>
            </div>
          </>
        )}
      </div>
    </form>
  );
};

export { validationSchema };
export default ShippingForm;
