import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import ReactSelectCountryList from "react-select-country-list";

import "react-toastify/dist/ReactToastify.css";

const ShippingForm = ({ handleChange, handleNumberInput }) => {
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
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        country: user.country || "",
        address: user.address || "",
        city: user.city || "",
        zip: user.zip || "",
      });
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
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNumberInputInternal = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setFormData((prevState) => ({
      ...prevState,
      [name]: numericValue,
    }));

    if ((name === "phone" || name === "zip") && /[^0-9]/.test(value)) {
      toast.error("Please enter numeric values in this field.");
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4 className="mb-4 mt-3">Shipping Information</h4>
      <hr className="my-4" />

      <div className="d-flex flex-wrap gap-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">
            Firstname
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="lastName" className="form-label">
            Lastname
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
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
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="d-flex flex-wrap gap-3">
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <Select
            options={countries}
            value={countries.find((country) => country.value === formData.country)}
            onChange={handleCountryChange}
            required
          />
        </div>

        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="d-flex flex-wrap gap-3">
        <div className="col-12 col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleNumberInputInternal}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="zip" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleNumberInputInternal}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
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
    </div>
  );
};

export default ShippingForm;
