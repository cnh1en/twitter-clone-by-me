import Users from "../models/userModel.js";

const adminCtrl = {
	getAllInfoUser: async (req, res) => {
		try {
			const users = await Users.find({});
			return res.status(200).json({ users });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

export default adminCtrl;
