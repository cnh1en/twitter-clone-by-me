import React, { useEffect, useRef, useState } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SignIn from "../../images/signin.jpg";
import { login } from "../../redux/authSlice";
import { postDataAPI } from "../../utils/fetchData";

const Login = () => {
	const [accountLogin, setAccountLogin] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState("");
	const { auth } = useSelector((state) => state);

	const handleInputChange = (e) => {
		setAccountLogin({ ...accountLogin, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await postDataAPI("login", accountLogin, null);
			localStorage.setItem("firstLogin", true);
			dispatch(login(res.data));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	const responseGoogle = async (response) => {
		try {
			const res = await postDataAPI(
				"google_login",
				{ tokenId: response.tokenId },
				null
			);
			localStorage.setItem("firstLogin", true);
			console.log(res.data);

			dispatch(login(res.data));
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};

	const responseFacebook = async (response) => {
		console.log(response);
		try {
			const { accessToken, userID } = response;
			const res = await postDataAPI(
				"facebook_login",
				{ accessToken, userID },
				null
			);
			localStorage.setItem("firstLogin", true);
			console.log(res.data);
			dispatch(login(res.data));
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		if (auth.token) navigate("/");
	}, [auth.token, navigate]);

	return (
		<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[900px] md:py-[67px] py-5 shadow-login flex flex-col items-center md:flex-row w-[calc(100%_-_30px)] h-[calc(100vh-60px)] overflow-auto scrollbar-thin">
			<div className="signin-image md:ml-[110px] md:mr-[10px] mt-[10px]">
				<img
					src={SignIn}
					alt="signin"
					className="md:mb-[50px] md:w-full scale-75 mb-4"
				/>
				<Link
					to="/register"
					className="md:block hidden text-center text-[14px] text-[#222222] focus:outline-none underline"
				>
					Create an account
				</Link>
			</div>

			<div className="md:mx-[80px]">
				<h2 className="text-[36px] font-[700] text-[#222222] mb-6">
					Sign up
				</h2>
				<p className="text-red-500 h-6 mb-5">{error}</p>
				<form className="form text-[13px]" onSubmit={handleLogin}>
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
							onChange={handleInputChange}
						/>
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
							placeholder="Your Password"
							id="password"
							name="password"
							className="w-full py-[6px] px-[30px] border-b-[1px] border-b-[#999] focus:outline-none"
							onChange={handleInputChange}
						/>
					</div>

					<div className="input flex items-center mt-[6px] mb-[25px]">
						<input type="checkbox" id="check" className="mr-[15px]" />
						<label htmlFor="check">Remember me</label>
					</div>
					{/* SUBMIT */}
					<div className="button">
						<button
							className="bg-[#6dabe4] text-[#ffffff] md:mt-[25px] px-[39px] py-[15px] rounded-[5px] hover:bg-[#4292dc] w-full md:w-max mt-0"
							type="submit"
						>
							Log in
						</button>
					</div>
				</form>
				<Link
					to="/register"
					className="md:hidden block text-[14px] text-[#222222] focus:outline-none underline md:mt-0 mt-4"
				>
					Create an account
				</Link>
				<div className="social-network flex text-[13px] md:mt-20 items-center mt-8">
					<span className="mr-2">Or login with</span>
					<div className="flex gap-2">
						<div className="transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125  duration-300">
							{/* <i className="ri-facebook-fill text-[24px] p-[5px] cursor-pointer"></i> */}
							<GoogleLogin
								clientId="117314368394-5u4eog4jbmoo059lg1fs6s33ijpo07gu.apps.googleusercontent.com"
								render={(renderProps) => (
									<button
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}
									>
										<i className="ri-google-fill text-[24px] p-[5px] cursor-pointer"></i>
									</button>
								)}
								onSuccess={responseGoogle}
								onFailure={responseGoogle}
								cookiePolicy={"single_host_origin"}
							/>
						</div>
						<div className="transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125  duration-300">
							<i className="ri-twitter-line text-[24px] p-[5px] cursor-pointer"></i>
						</div>
						<div className="transition ease-in-out delay-150 hover:-translate-y-2 hover:scale-125  duration-300">
							<FacebookLogin
								appId="366053592020049"
								autoLoad={false}
								fields="name,email,picture"
								callback={responseFacebook}
								render={(renderProps) => (
									<button onClick={renderProps.onClick}>
										<i className="ri-facebook-fill text-[24px] p-[5px] cursor-pointer"></i>
									</button>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
