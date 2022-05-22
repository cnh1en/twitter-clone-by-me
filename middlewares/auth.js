import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const auth = async (req, res, next) => {
	try {
		const token = req.header("Authorization");
		if (!token) {
			return res.status(400).json({ msg: "Invalid token!" });
		}
		const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
		if (!decode) {
			return res.status(400).json({ msg: "Invalid token!" });
		}
		const user = await Users.findById(decode.id);
		req.user = user;
		next();
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
export default auth;
