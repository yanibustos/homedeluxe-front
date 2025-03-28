import { Link } from "react-router-dom";
import Input from "../../components/commons/Input/Input";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "./Profile.css";
import { useState } from "react";

const user = {
  firstname: "Yanina",
  lastname: "Bustos",
  ci: "Not available",
  email: "yanibustos4596@gmail.com",
  password: "********",
  phone: "Not available",
  address: "Not available",
};

const schema = yup
  .object({
    firstname: yup.string().required("Firstname is required"),
    lastname: yup.string().required("Lastname is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    ci: yup.string(),
    phone: yup.string(),
    address: yup.string(),
  })
  .required();

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
    defaultValues: user,
  });

  return (
    user && (
      <div className="profile-container">
        <div className="d-flex justify-content-between align-items-center profile-header mb-3">
          <div className="profile-title">Profile</div>
          <Link to={""} className="profile-edit-link" onClick={() => setIsEditing((prev) => !prev)}>
            <i className="bi bi-pencil "></i> {isEditing ? "Cancel" : "Edit"}
          </Link>
        </div>
        <form action="">
          <div className="row">
            <Input
              type="text"
              name="firstname"
              id="firstname"
              label="Firstname"
              classNameContainer="col-12 d-flex align-items-center gap-3"
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
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
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
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
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
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
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
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
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
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
              classNameInput={`flex-grow-1 mb-3 ${isEditing ? "" : "border-0"}`}
              classNameLabel="col-1 mb-3"
              register={{ ...register("address") }}
              errors={errors}
              disabled={!isEditing}
            />
          </div>
          {isEditing && (
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    )
  );
}

export default Profile;
