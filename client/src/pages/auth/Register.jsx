import React from "react";
import SignUp from "../../images/signup.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      conditionCheck: false,
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Required!")
        .min(4, "Must be 4 characters or more"),
      username: yup
        .string()
        .required("Required!")
        .min(4, "Must be 4 characters or more"),
      email: yup
        .string()
        .required("Required!")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: yup
        .string()
        .required("Required!")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters"
        ),
      confirmedPassword: yup
        .string()
        .required("Required!")
        .oneOf([yup.ref("password"), null], "Password must match"),
      conditionCheck: yup
        .boolean()
        .oneOf([true], "You must accept the terms and conditions"),
    }),
    onSubmit: async (values) => {
      const { confirmedPassword, ...newUser } = values;
      try {
        const res = await axios.post("/api/register", newUser);
        console.log(res.data);
      } catch (error) {
        error.response.data.msg && setError(error.response.data.msg);
      }
    },
  });
  return (
    <div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[900px] py-[75px] flex shadow-login items-center w-[calc(100%_-_30px)] md:flex-row flex-col h-[calc(100vh-60px)] overflow-auto scrollbar-thin">
        <div className="sign-up md:pl-[34px] md:mx-[75px] mx-10">
          <h2 className="text-[36px] font-[700] text-[#222222] mb-[33px]">
            Sign up
          </h2>
          <form className="form text-[13px]" onSubmit={formik.handleSubmit}>
            {/* NAME */}
            <div className="input mb-[25px] relative">
              <label
                htmlFor="name"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <i className="ri-user-fill text-[16px]"></i>
              </label>
              <input
                type="text"
                placeholder="Your Name"
                id="name"
                name="name"
                className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && (
                <span className="absolute -bottom-5 left-0 text-red-500">
                  {formik.errors.name}
                </span>
              )}
            </div>

            {/* USERNAME */}
            <div className="input mb-[25px] relative">
              <label
                htmlFor="username"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <i className="ri-user-line text-[16px]"></i>
              </label>
              <input
                type="text"
                placeholder="Your Username"
                id="username"
                name="username"
                className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username && (
                <span className="absolute -bottom-5 left-0 text-red-500">
                  {formik.errors.username}
                </span>
              )}
            </div>
            {/* EMAIL */}
            <div className="input mb-[25px] relative">
              <label
                htmlFor="email"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <i className="ri-mail-line text-[16px]"></i>
              </label>
              <input
                type="text"
                placeholder="Your Email"
                id="email"
                name="email"
                className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email && (
                <span className="absolute -bottom-5 left-0 text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>
            {/* PASSWORD */}
            <div className="input mb-[25px] relative">
              <label
                htmlFor="password"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <i className="ri-lock-fill text-[16px]"></i>
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password && (
                <span className="absolute -bottom-5 left-0 text-red-500">
                  {formik.errors.password}
                </span>
              )}
            </div>
            {/* REPEAT_PASSWORD */}
            <div className="input mb-[25px] relative">
              <label
                htmlFor="repeat_password"
                className="absolute left-0 top-1/2 -translate-y-1/2"
              >
                <i className="ri-lock-line text-[16px]"></i>
              </label>
              <input
                type="text"
                placeholder="Repeat your password"
                id="confirmedPassword"
                name="confirmedPassword"
                className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
                onChange={formik.handleChange}
                value={formik.values.confirmedPassword}
              />
              {formik.errors.confirmedPassword && (
                <span className="absolute -bottom-5 left-0 text-red-500">
                  {formik.errors.confirmedPassword}
                </span>
              )}
            </div>

            <div className="input flex items-center mt-[6px] mb-[15px] relative">
              <input
                type="checkbox"
                id="conditionCheck"
                name="conditionCheck"
                className="mr-[15px]"
                value={formik.values.conditionCheck}
                onChange={formik.handleChange}
              />
              <label htmlFor="conditionCheck">
                I agree all statements in Terms of service
              </label>
              {formik.errors.conditionCheck && (
                <p className="absolute -bottom-6 left-0 text-red-500">
                  {formik.errors.conditionCheck}
                </p>
              )}
            </div>
            <p className="text-red-500 h-[20px]">{error}</p>

            <div className="button">
              <button
                className="bg-[#6dabe4] text-[#ffffff] mt-[15px] px-[39px] py-[15px] rounded-[5px] hover:bg-[#4292dc] md:w-max w-full"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>

        <div className="mt-[45px] mx-[55px]">
          <img src={SignUp} alt="signup" />
          <p className="text-sm text-center">
            Already have an account ?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
