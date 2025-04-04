import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import fetchApi from "../../api/fetchApi";

import BlackButton from "../../components/commons/BlackButton/BlackButton";
import Input from "../../components/commons/Input/Input";
import SideImage from "../../components/SideImage/SideImage";

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
  })
  .required();

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async () => {
    try {
      const response = await fetchApi({
        method: "post",
        url: `/reset-password/${token}`,
        data: { password },
      });

      if (response.data.msg === "Password reset successful") {
        toast.success("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    }
  };

  return (
    <SideImage>
      <div className="resetPassword-container container mt-4">
        <div className="w-100 px4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="password"
              name="password"
              id="password"
              label="New Password"
              register={{ ...register("password") }}
              errors={errors}
              classNameLabel="fw-semibold"
              classNameContainer="mb-4"
            />
            <div className="d-grid mt-4">
              <BlackButton type="submit" name="Reset Password" />
            </div>
          </form>
        </div>
      </div>
    </SideImage>
  );
};

export default ResetPassword;
