import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../redux/userSlice";

import "./Login.css";
import { toast } from "react-toastify";
import fetchApi from "../../api/fetchApi";

const schema = yup
  .object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
  })
  .required();

function Login() {
  const user = useSelector((state) => state.user);
  const { state: prevPage } = useLocation();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const user = await fetchApi({
        method: "post",
        url: "/tokens",
        data: data,
      });
      dispatch(login(user));

      if (user.isAdmin) {
        navigate("/admin");
      } else {
        navigate(prevPage ? prevPage : "/");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    if (user?.accessToken) {
      navigate(user.isAdmin ? "/admin" : "/");
    }
  }, []);

  return (
    <div className="login-container container-fluid bg-white h-100">
      <div className="row h-100 d-flex">
        <div className="d-none d-xl-flex col-xl-9 bg-dark login-sideImage-container "></div>
        <div className="col-12 col-xl-3 d-flex flex-column justify-content-center align-items-center">
          <div className="w-100 login-center">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <img src="img/logo_principal.png" alt="Logo" className="img-fluid" />
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="w-100 px-4">
              <div className="">
                <label htmlFor="email" className="form-label fw-bold login-text">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email")}
                  className={`login-input ${errors.email ? "is-invalid" : ""}`}
                />
                {errors.email && (
                  <span className="text-danger login-text">{errors.email.message}</span>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="password" className="form-label fw-bolder login-text">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  {...register("password")}
                  className={`login-input ${errors.password ? "is-invalid" : ""}`}
                />
                {errors.password && (
                  <span className="text-danger login-text">{errors.password.message}</span>
                )}
              </div>

              <div className="d-flex justify-content-between mt-4">
                <div className="d-flex align-items-center login-remember-me-container">
                  <label htmlFor="remember-me" className="login-text checkbox-label login-text">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="form-check-input me-2"
                    />
                    <span className="checkmark login-text">
                      {" "}
                      <i className="bi bi-check-lg"></i>
                    </span>
                    Remember me
                  </label>
                </div>
                <div>
                  <Link
                    to={"/reset-password"}
                    className="text-decoration-none text-dark fw-bold login-text h-100 d-flex"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="d-grid mt-4">
                <button type="submit" disabled={loading} className="login-button">
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      <span role="status">Loading...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
