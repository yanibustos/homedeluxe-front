import { useRef, useState } from "react";
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
    phone: yup.string().nullable().optional(),
    address: yup.string().nullable().optional(),
    country: yup.string().nullable().optional(),
    city: yup.string().nullable().optional(),
    state: yup.string().nullable().optional(),
    zip: yup.string().nullable().optional(),
    avatar: yup.mixed().test("fileType", "Unsupported file format", (value) => {
      if (!value) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),
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
  })
  .required();

const profileFields = [
  { name: "firstname", label: "Firstname", type: "text" },
  { name: "lastname", label: "Lastname", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "address", label: "Address", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "zip", label: "Zip Code", type: "text" },
];

const passwordFields = [
  { name: "currentPassword", label: "Current Password" },
  { name: "newPassword", label: "New Password" },
  { name: "repeatPassword", label: "Repeat New Password" },
];

const getAvatarSrc = (preview) => {
  if (!preview) return "/img/avatar.png";
  if (preview.startsWith("http") || preview.startsWith("blob:")) return preview;
  if (preview.startsWith("/img")) return preview;
  return `${import.meta.env.VITE_IMAGE_DB_URL}${preview}`;
};

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
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      firstname: user.firstname || "",
      lastname: user.lastname || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      country: user.country || "",
      city: user.city || "",
      state: user.state || "",
      zip: user.zip || "",
      avatar: user.avatar || null,
      changePassword: false,
    },
  });

  const initialValuesRef = useRef(user);

  const isChangingPassword = watch("changePassword");

  const isFormModified = () => {
    const currentValues = getValues();
    return Object.keys(currentValues).some(
      (key) => currentValues[key] !== initialValuesRef.current[key],
    );
  };

  const isSaveDisabled = !isFormModified();

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
        if (key === "avatar" && data.avatar instanceof File) {
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
          <div className="profile-title fw-semibold">My Profile</div>
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
                src={getAvatarSrc(preview)}
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
          {profileFields.map(({ name, label, type }) => (
            <div className="row" key={name}>
              <Input
                type={type}
                name={name}
                id={name}
                label={label}
                classNameContainer="col-12 d-flex gap-3 mb-3"
                classNameInput="flex-grow-1"
                classNameLabel="col-1 fw-semibold profile-input-label"
                register={{ ...register(name) }}
                errors={errors}
                disabled={!isEditing}
              />
            </div>
          ))}
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
              {passwordFields.map(({ name, label }) => (
                <Input
                  key={name}
                  type="password"
                  name={name}
                  id={name}
                  label={label}
                  classNameContainer="col-12 d-flex gap-3 mb-3"
                  classNameInput="flex-grow-1"
                  classNameLabel="col-1 fw-semibold profile-input-label pt-0"
                  register={{ ...register(name) }}
                  errors={errors}
                  disabled={!isEditing}
                />
              ))}
            </div>
          )}

          {isEditing && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              <BlackButton
                type="button"
                name=" Cancel"
                className="px-3 profile-cancel-edit"
                handleOnClick={() => handleCancel()}
              />
              <BlackButton type="submit" name=" Save" className="px-3" disabled={isSaveDisabled} />
            </div>
          )}
        </form>
        <div className="container-fluid bg-dark w-100"></div>
      </div>
    )
  );
}

export default Profile;
