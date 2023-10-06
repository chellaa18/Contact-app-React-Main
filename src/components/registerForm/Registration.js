import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";

//schema Validation
const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[a-zA-Z ]*$/g, "Name should be in alphabets")
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name should not exceed 20 characters")
      .trim(),

    email: yup
      .string()
      .required("Email is required")
      .email("Email is invalid")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "invalid email")
      .trim(),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      )

      .trim(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .trim(),
    acceptTerms: yup.bool().oneOf([true], "Accept Ts & Cs is required"),
  })
  .required();

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  //form data handleSubmit
  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("usersData")) || [];
    const userDetails = JSON.parse(localStorage.getItem("loggedInUser"));
    // Check if user details exist in local storage
    const isUserLoggedIn = userDetails !== null;
    try {
      const user = storedData.find(
        (user) => user.email.toLowerCase() == data.email.toLowerCase()
      );
      if (user) {
        toast.error("Email is Already Exists");
        return;
      } else if (isUserLoggedIn) {
        Swal.fire({
          icon: "info",
          title: "Loggedin",
          text: "Already some User is Login, Please Logout the Current User Before register",
        });
        reset();

        return;
      } else {
        const id = storedData.length + 1;
        const email = data.email.toLowerCase();
        const dataWId = { ...data, id, email };
        storedData.push(dataWId);
        toast.success(`Successfully Registered!`);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }

    localStorage.setItem("usersData", JSON.stringify(storedData));

    // Reset fields
    reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowCnfPassword(!showCnfPassword);
  };

  return (
    <div className="container">
      <div className="toast-container">
        <ToastContainer limit={2} />
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-5 rounded mt-5"
            style={{ backgroundColor: "rgba(255, 0, 174, 0.12" }}
          >
            <h3 style={{ color: "#d51c9a" }}>Registration Form</h3>
            <div className="form-row">
              <div className="form-group my-3">
                <label className="text-white">Name</label>
                <input
                  autoFocus
                  name="name"
                  type="text"
                  {...register("name")}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.name?.message}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group my-3">
                <label className="text-white">Email</label>
                <input
                  name="email"
                  type="text"
                  {...register("email")}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email?.message}</div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group my-3">
                <label className="text-white">Password</label>
                <div className="input-group">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </button>
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
              </div>
              <div className="form-group  my-3">
                <label className="text-white">Confirm Password</label>
                <div className="input-group">
                  <input
                    name="confirmPassword"
                    type={showCnfPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className={`form-control ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="input-group-text"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showCnfPassword ? (
                      <i className="bi bi-eye-slash-fill"></i>
                    ) : (
                      <i className="bi bi-eye-fill"></i>
                    )}
                  </button>
                  <div className="invalid-feedback">
                    {errors.confirmPassword?.message}
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group form-check my-3">
              <input
                name="acceptTerms"
                type="checkbox"
                {...register("acceptTerms")}
                id="acceptTerms"
                className={`form-check-input ${
                  errors.acceptTerms ? "is-invalid" : ""
                }`}
              />
              <label
                htmlFor="acceptTerms"
                className="form-check-label text-white"
              >
                Accept Terms & Conditions
              </label>
              <div className="invalid-feedback">
                {errors.acceptTerms?.message}
              </div>
            </div>
            <div className="form-group my-4">
              <button type="submit" className="nav-button p-2 rounded my-2">
                Register
              </button>
              <button
                type="reset"
                className="nav-button p-2 rounded m-2"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
