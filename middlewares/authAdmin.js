import Users from "../models/userModel.js";

const authAdmin = async (req, res, next) => {
	try {
		const user = await Users.findById(req.user._id);

		if (user.role !== "admin")
			return res.status(500).json({ msg: "Admin resources access denied." });

		next();
	} catch (error) {
		return res.status(500).json({ msg: error.message });
	}
};
export default authAdmin;
