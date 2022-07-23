import React, { useState } from "react";
import { postDataAPI } from "../../utils/fetchData";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const ResetPassword = () => {
  const [password, setPassword] = useState("second");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const result = await postDataAPI("/reset_password", {
        access_token: token,
        password: confirmPassword,
      });
      setLoading(false);
      const res = await postDataAPI(
        "login",
        {
          email: result.data.email,
          password: confirmPassword,
        },
        null
      );
      localStorage.setItem("firstLogin", true);
      dispatch(login(res.data));
      navigate("/");
    } catch (error) {
      setError("Quá thời gian quy định, vui lòng xác nhận lại email.");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-[500px] h-[90%] shadow-xl p-6 flex flex-col">
        <div>
          <div className="flex items-center justify-between mb-6">
            <span className="w-8 h-8 flex-center hover:hoverAnimation2">
              <i
                className="ri-arrow-left-line text-xl cursor-pointer font-bold text-black"
                onClick={() => navigate("/user/forgot_password")}
              ></i>
            </span>
            <i className="text-twitter ri-twitter-fill text-[36px]"></i>
            <span className="w-5 h-5"></span>
          </div>
          <h1 className="font-bold text-2xl text-center mb-6">
            Enter new password
          </h1>

          <div className="relative mb-4">
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 pt-6 leading-[6px] pb-3 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1D9BF0] peer dark:bg-white dark:border-gray-300 dark:text-black"
              maxLength="100"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className={`absolute text-[13px] text-[#71767B] left-3 top-3 peer-focus:text-[11px] peer-focus:text-[#1D9BF0] duration-100 transform ${
                password && "text-[12px]"
              }`}
            >
              Enter new password
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 pt-6 leading-[6px] pb-3 bg-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#1D9BF0] peer dark:bg-white dark:border-gray-300 dark:text-black"
              maxLength="100"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (e.target.value !== password) setError("Mật khẩu chưa khớp");
                else setError("");
              }}
            />
            <label
              htmlFor="confirmPassword"
              className={`absolute text-[13px] text-[#71767B] left-3 top-3 peer-focus:text-[11px] peer-focus:text-[#1D9BF0] duration-100 transform ${
                confirmPassword && "text-[12px]"
              }`}
            >
              Confirm password
            </label>
          </div>
          {!!error && <span className="text-red-600">{error}</span>}

          {loading ? (
            <div className="flex flex-col justify-center items-center mt-4">
              <svg
                role="status"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="mt-4 text-red-500"></div>
          )}
        </div>
        {success && (
          <div className="mt-4 text-twitter">Please check your email!</div>
        )}
        <button
          className={`py-3.5 text-white text-center mt-auto rounded-full w-full ${
            !!password && !!confirmPassword
              ? "bg-twitter cursor-pointer hover:opacity-80"
              : "bg-gray-400"
          }`}
          onClick={handleResetPassword}
          disabled={!password && !confirmPassword}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
