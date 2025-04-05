import { useState } from "react";
import Input from "../../components/commons/Input/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputCheckbox from "../../components/commons/InputCheckbox/InputCheckbox";
import BlackButton from "../../components/commons/BlackButton/BlackButton";
import fetchApi from "../../api/fetchApi";
import { useDispatch, useSelector } from "react-redux";

import "./Profile.css";
import { login, setUser } from "../../redux/userSlice";

const schema = yup
  .object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    ci: yup.string(),
    phone: yup.string(),
    address: yup.string(),
    changePassword: yup.boolean(),

    //Validates password if the checkbox is checked
    currentPassword: yup.string().when("changePassword", {
      is: true,
      then: (schema) => schema.required("Current password is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    newPassword: yup.string().when("changePassword", {
      is: true,
      then: (schema) =>
        schema
          .required("New password is required")
          .min(8, "Password must be at least 8 characters")
          .max(50, "Password must not exceed 50 characters"),
      otherwise: (schema) => schema.notRequired(),
    }),
    repeatPassword: yup.string().when("changePassword", {
      is: true,
      then: (schema) =>
        schema
          .required("Please confirm your new password")
          .oneOf([yup.ref("newPassword")], "Passwords must match"),
      otherwise: (schema) => schema.notRequired(),
    }),
    avatar: yup.mixed().test("fileType", "Only images are allowed", (value) => {
      // Si es un string con URL, está bien
      if (typeof value === "string" && value.startsWith("http")) {
        return true;
      }

      // Si es undefined, null o un array vacío
      if (!value) {
        return true;
      }

      // Si es un archivo o FileList
      if (value instanceof File) {
        return ["image/jpeg", "image/png"].includes(value.type); // Validar el tipo MIME del archivo
      }

      return false; // Si no pasa ninguna condición válida
    }),
  })
  .required();

function Profile() {
  const user = useSelector((state) => state.user);
  const [preview, setPreview] = useState(user.avatar || null);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: user,
  });

  const isChangingPassword = watch("changePassword");

  const handleCancel = () => {
    reset(user);
    setPreview(user.avatar || "/img/avatar.png");
    setIsEditing(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("avatar", file);
    }
  };

  const handleProfileUpdate = async (data) => {
    try {
      if (!data.changePassword) {
        delete data.currentPassword;
        delete data.newPassword;
        delete data.repeatPassword;
      }

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "avatar") {
          formData.append("avatar", data.avatar);
        } else if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
          formData.append(key, data[key]);
        }
      });

      const response = await fetchApi({
        method: "patch",
        url: `/users/${user.id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response) {
        dispatch(setUser(response));
        reset(response);
        setPreview(response.avatar || null);
        setIsEditing(false);
      }
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
              className={`bi bi-pencil px-3 py-0 profile-edit-button`}
            />
          )}
        </div>

        <div className="row mb-3">
          <div className="col-12 d-flex align-items-center gap-3">
            <label htmlFor="avatar" className="col-1 fw-semibold profile-avatar-label">
              Avatar
            </label>
            <div className="flex-grow-1 d-flex align-items-center gap-3">
              <img
                src={preview || "/img/avatar.png"}
                alt="Profile"
                className="rounded-circle border border-2 profile-avatar bg-dark"
              />
              {isEditing && (
                <>
                  <BlackButton
                    type="button"
                    classNameContainer="btn btn-secondary profile-avatar-button"
                    handleOnClick={() => document.getElementById("avatar").click()}
                    name="Update"
                  />
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    className="d-none"
                    {...register("avatar")}
                    onChange={handleFileChange}
                  />
                </>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <div className="flex-grow-1">
              {errors.avatar && <p className="text-danger profile-text">{errors.avatar.message}</p>}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          <div className="row">
            <Input
              type="text"
              name="firstname"
              id="firstname"
              label="Firstname"
              classNameContainer="col-12 d-flex gap-3 mb-3"
              classNameInput={`flex-grow-1 `}
              classNameLabel="col-1 fw-semibold profile-input-label"
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
              classNameContainer="col-12 d-flex gap-3 mb-3"
              classNameInput={`flex-grow-1 `}
              classNameLabel="col-1 fw-semibold profile-input-label"
              register={{ ...register("lastname") }}
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
              classNameContainer="col-12 d-flex gap-3 mb-3"
              classNameInput={`flex-grow-1 `}
              classNameLabel="col-1 fw-semibold profile-input-label"
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
              classNameContainer="col-12 d-flex gap-3 mb-3"
              classNameInput={`flex-grow-1 `}
              classNameLabel="col-1 fw-semibold profile-input-label"
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
              classNameContainer="col-12 d-flex gap-3 mb-3"
              classNameInput={`flex-grow-1 `}
              classNameLabel="col-1 fw-semibold profile-input-label"
              register={{ ...register("address") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="row">
              <div className="col-12 d-flex align-items-center gap-3">
                <div className="col-1 profile-input-label">
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
                type="password"
                name="currentPassword"
                id="currentPassword"
                label="Current Password"
                classNameContainer="col-12 d-flex gap-3 mb-3"
                classNameInput={`flex-grow-1 `}
                classNameLabel="col-1 fw-semibold profile-input-label pt-0"
                register={{ ...register("currentPassword") }}
                errors={errors}
                disabled={!isEditing}
              />
              <Input
                type="password"
                name="newPassword"
                id="newPassword"
                label="New Password"
                classNameContainer="col-12 d-flex gap-3 mb-3"
                classNameInput={`flex-grow-1 `}
                classNameLabel="col-1 fw-semibold profile-input-label pt-0"
                register={{ ...register("newPassword") }}
                errors={errors}
                disabled={!isEditing}
              />
              <Input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                label="Repeat New Password"
                classNameContainer="col-12 d-flex gap-3 mb-3"
                classNameInput={`flex-grow-1 `}
                classNameLabel="col-1 fw-semibold profile-input-label pt-0"
                register={{ ...register("repeatPassword") }}
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
