import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import sendEmail from "../middlewares/sendEmail.js";
import { google } from "googleapis";
import fetch from "node-fetch";

const { OAuth2 } = google.auth;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const authCtrl = {
	register: async (req, res) => {
		try {
			const { fullname, username, email, password, gender } = req.body;
			// VALIDATION
			const user_username = await Users.findOne({ username });
			if (user_username)
				return res
					.status(400)
					.json({ msg: "This username is already exists." });

			const user_email = await Users.findOne({ email });
			if (user_email)
				return res
					.status(400)
					.json({ msg: "This email is already exists." });

			// SAVE
			// const hashPassword = await bcrypt.hash(password, 12);

			const newUser = {
				fullname,
				username,
				email,
				password,
				gender,
			};

			const activation_token = createActivationToken(newUser);
			const url = `${process.env.CLIENT_URL}/user/activate/${activation_token}`;
			sendEmail(email, url, "Verify your email address");

			res.json({
				msg: "Register Success! Please activate your email to start.",
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	login: async (req, res) => {
		try {
			const { email, password } = req.body;
			const user = await Users.findOne({ email }).populate(
				"followers following",
				"-password"
			);
			if (!user)
				return res.status(400).json({ msg: "This email does not exist." });

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch)
				return res.status(400).json({ msg: "This password incorrect." });

			const accessToken = createAccessToken({ id: user._id });
			const refreshToken = createRefreshToken({ id: user._id });

			res.cookie("refresh_token", refreshToken, {
				httpOnly: true,
				path: "/api/refresh_token",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});
			return res.status(200).json({
				msg: "Login success.",
				token: accessToken,
				user: { ...user._doc, password: "" },
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	logout: async (req, res) => {
		try {
			res.clearCookie("refresh_token", {
				path: "/api/refresh_token",
			});
			return res.json({ msg: "Logged out." });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	generateAccessToken: async (req, res) => {
		try {
			const refreshToken = req.cookies.refresh_token;
			if (!refreshToken)
				return res.status(400).json({ msg: "Please login now!" });

			const result = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET
			);
			if (!result) return res.status(400).json({ msg: "Please login now!" });

			const user = await Users.findById(result.id)
				.select("-password")
				.populate(
					"followers following",
					"avatar username fullname followers following"
				);
			if (!user)
				return res.status(400).json({ msg: "This user dose not exist" });

			const accessToken = createAccessToken({ id: result.id });
			return res.json({
				token: accessToken,
				user,
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	activateEmail: async (req, res) => {
		try {
			const { activation_token } = req.body;
			const user = jwt.verify(
				activation_token,
				process.env.ACTIVATION_TOKEN_SECRET
			);

			const { fullname, username, email, password, gender } = user;
			const hashPassword = await bcrypt.hash(password, 12);
			const newUser = new Users({
				fullname,
				username,
				email,
				password: hashPassword,
				gender,
			});

			await newUser.save();

			res.json({ msg: "Account has been activated!" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	forgotPassword: async (req, res) => {
		try {
			const { email } = req.body;
			const user = await Users.findOne({ email });
			if (!user)
				return res.status(400).json({ msg: "This email does not exist." });

			const access_token = createAccessToken({ id: user._id });
			const url = `${process.env.CLIENT_URL}/user/reset/${access_token}`;

			sendEmail(email, url, "Reset your password");
			res.json({ msg: "Re-send the password, please check your email." });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	resetPassword: async (req, res) => {
		try {
			const { password } = req.body;
			const hashPassword = await bcrypt.hash(password, 12);
			await Users.findByIdAndUpdate(req.user._id, {
				/// middleware: auth
				password: hashPassword,
			});

			res.json({ msg: "Password successfully changed!" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	googleLogin: async (req, res) => {
		try {
			const { tokenId } = req.body;

			const verify = await client.verifyIdToken({
				idToken: tokenId,
				audience: process.env.MAIL_SERVICE_CLIENT_ID,
			});

			const { email_verified, email, name, picture } = verify.payload;

			const password = email + process.env.GOOGLE_SECRET;

			const passwordHash = await bcrypt.hash(password, 12);

			if (!email_verified)
				return res.status(400).json({ msg: "Email verification failed." });

			const user = await Users.findOne({ email }).populate(
				"followers following",
				"-password"
			);

			if (user) {
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch)
					return res.status(400).json({ msg: "Password is incorrect." });
				const accessToken = createAccessToken({ id: user._id });
				const refresh_token = createRefreshToken({ id: user._id });
				res.cookie("refresh_token", refresh_token, {
					httpOnly: true,
					path: "/api/refresh_token",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				res.json({
					msg: "Welcome back!",
					token: accessToken,
					user: { ...user._doc, password: "" },
				});
			} else {
				const newUser = new Users({
					fullname: name,
					username: name,
					email,
					password: passwordHash,
					avatar: picture,
				});

				await newUser.save();

				const accessToken = createAccessToken({ id: newUser._id });
				const refresh_token = createRefreshToken({ id: newUser._id });
				res.cookie("refresh_token", refresh_token, {
					httpOnly: true,
					path: "/api/refresh_token",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				res.json({
					msg: "Welcome!",
					token: accessToken,
					user: { ...newUser._doc, password: "" },
				});
			}
		} catch (err) {
			return res.status(500).json({ msg: err.message });
		}
	},

	facebookLogin: async (req, res) => {
		try {
			const { accessToken, userID } = req.body;

			const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`;

			const data = await fetch(URL)
				.then((res) => res.json())
				.then((res) => {
					return res;
				});

			const { email, name, picture } = data;

			const newEmail = process.env.FACEBOOK_SECRET_PASSWORD + email;
			const password = email + process.env.FACEBOOK_SECRET;

			const passwordHash = await bcrypt.hash(password, 12);

			const user = await Users.findOne({ email: newEmail }).populate(
				"followers following",
				"-password"
			);

			if (user) {
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch)
					return res.status(400).json({ msg: "Password is incorrect." });

				const accessToken = createAccessToken({ id: user._id });
				const refresh_token = createRefreshToken({ id: user._id });
				res.cookie("refresh_token", refresh_token, {
					httpOnly: true,
					path: "/api/refresh_token",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				res.json({
					msg: "Welcome back!",
					token: accessToken,
					user: { ...user._doc, password: "" },
				});
			} else {
				const newUser = new Users({
					username: name,
					fullname: name,
					email: newEmail,
					password: passwordHash,
					avatar: picture.data.url,
				});

				await newUser.save();
				const accessToken = createAccessToken({ id: newUser._id });
				const refresh_token = createRefreshToken({ id: newUser._id });
				res.cookie("refresh_token", refresh_token, {
					httpOnly: true,
					path: "/api/refresh_token",
					maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
				});

				res.json({
					msg: "Welcome!",
					token: accessToken,
					user: { ...newUser._doc, password: "" },
				});
			}
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};
const createAccessToken = (payload) => {
	return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
};
const createRefreshToken = (payload) => {
	return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	});
};
const createActivationToken = (payload) => {
	return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
		expiresIn: "5m",
	});
};

export default authCtrl;
