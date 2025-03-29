import { Link } from "react-router-dom";
import Input from "../../components/commons/Input/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Profile.css";
import { useState } from "react";
import InputCheckbox from "../../components/commons/InputCheckbox/InputCheckbox";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import fetchApi from "../../api/fetchApi";

const user = {
  firstname: "Yanina",
  lastname: "Bustos",
  ci: "Not available",
  email: "yanibustos4596@gmail.com",
  password: "********",
  phone: "Not available",
  address: "Not available",
  changePassword: false,
};

const schema = yup
  .object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    ci: yup.string(),
    phone: yup.string(),
    address: yup.string(),
    changePassword: yup.boolean(),
    newPassword: yup.string().when("changePassword", {
      is: true,
      then: (schema) =>
        schema
          .required("New password is required")
          .min(8, "Password must be at least 8 characters")
          .max(50, "Password must not exceed 50 characters"),
    }),
  })
  .required();

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: user,
  });

  const isChangingPassword = watch("changePassword");

  const handleCancel = () => {
    reset(user);
    setIsEditing(false);
  };

  const handleProfileUpdate = async (data) => {
    try {
      if (!data.changePassword) {
        delete data.newPassword;
      }

      const response = await fetchApi({
        method: "patch",
        url: "/users",
        data: data,
      });
      console.log("Profile updated:", response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error.message);
    }
  };

  return (
    user && (
      <div className="profile-container">
        <div className="d-flex justify-content-between align-items-center profile-header mb-3">
          <div className="profile-title fw-semibold">Profile</div>
          {!isEditing && (
            <BlackButton
              type="submit"
              name=" Edit"
              handleOnClick={() => {
                setIsEditing((prev) => !prev);
                if (isEditing) {
                  reset({ ...watch(), changePassword: false });
                }
              }}
              className={`bi bi-pencil px-3 py-0`}
            />
          )}
        </div>
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div className="row">
            <Input
              type="text"
              name="firstname"
              id="firstname"
              label="Firstname"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3 `}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("firstname") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>
          <div className="row">
            <Input
              type="text"
              name="lastname"
              id="lastname"
              label="Lastname"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3`}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("lastname") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>
          <div className="row">
            <Input
              type="text"
              name="ci"
              id="ci"
              label="CI"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3`}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("ci") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>

          <div className="row">
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3`}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("email") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>

          <div className="row">
            <Input
              type="text"
              name="phone"
              id="phone"
              label="Phone"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3`}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("phone") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>
          <div className="row">
            <Input
              type="text"
              name="address"
              id="address"
              label="Address"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3`}
              classNameLabel="col-1 mb-3 fw-semibold"
              register={{ ...register("address") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="row">
              <div className="col-12 d-flex align-items-center gap-3">
                <div className="col-1">
                  <label htmlFor="changePassword" hidden></label>
                </div>
                <div className="flex-grow-1">
                  <InputCheckbox
                    name="changePassword"
                    id="changePassword"
                    label="Change password"
                    containerClassName=""
                    labelClassName=""
                    inputClassName=""
                    spanClassName=""
                    register={{ ...register("changePassword") }}
                  />
                </div>
              </div>
            </div>
          )}

          {isChangingPassword && isEditing && (
            <div className="mt-3">
              <Input
                type="text"
                name="newPassword"
                id="newPassword"
                label="New Password"
                classNameContainer="col-12 d-flex align-items-center gap-3"
                classNameInput={`flex-grow-1 mb-3`}
                classNameLabel="col-1 mb-3 fw-semibold"
                register={{ ...register("newPassword") }}
                errors={errors}
                disabled={!isEditing}
              />
            </div>
          )}

          {isEditing && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              <BlackButton
                type="button"
                name=" Cancel"
                className="px-3"
                handleOnClick={() => handleCancel()}
              />
              <BlackButton type="submit" name=" Save" className="px-3" />
            </div>
          )}
        </form>
        <div className="container-fluid bg-dark w-100"></div>
      </div>
    )
  );
}

export default Profile;
