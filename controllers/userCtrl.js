import Users from "../models/userModel.js";
import escapeStringRegexp from "escape-string-regexp";

const userCtrl = {
	getUser: async (req, res) => {
		try {
			const { id } = req.params;
			const user = await Users.findById(id).populate(
				"followers following",
				"-password"
			);

			return res.status(200).json({ user });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	updateUser: async (req, res) => {
		try {
			const { name, story, address, website, avatar, background } = req.body;
			const { id } = req.params;
			const updatedUser = await Users.findByIdAndUpdate(
				id,
				{
					fullname: name,
					story,
					address,
					website,
					avatar,
					background,
				},
				{ new: true }
			).populate("followers following", "-password");

			return res.status(200).json({ user: updatedUser });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	follow: async (req, res) => {
		try {
			const user = await Users.find({
				_id: req.params.id,
				followers: req.user._id,
			});

			if (user.length > 0) {
				return res.status(500).json({ msg: "You followed this user." });
			}

			// + 1 follower
			const newUser = await Users.findOneAndUpdate(
				{
					_id: req.params.id,
				},
				{
					$push: { followers: req.user._id },
				},
				{
					new: true,
				}
			)
				.select("-password")
				.populate("following followers", "-password");

			// + 1 following cho current user

			await Users.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{
					$push: { following: req.params.id },
				},
				{
					new: true,
				}
			)
				.select("-password")
				.populate("following followers", "-password");

			return res.status(200).json({ user: newUser });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	unfollow: async (req, res) => {
		try {
			// - 1 follower
			const newUser = await Users.findOneAndUpdate(
				{
					_id: req.params.id,
				},
				{
					$pull: { followers: req.user._id },
				},
				{
					new: true,
				}
			)
				.select("-password")
				.populate("following followers", "-password");

			// - 1 following cho current user

			await Users.findOneAndUpdate(
				{
					_id: req.user._id,
				},
				{
					$pull: { following: req.params.id },
				},
				{
					new: true,
				}
			)
				.select("-password")
				.populate("following followers", "-password");

			return res.status(200).json({ user: newUser });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	getFollowers: async (req, res) => {
		try {
			const id = req.params.id;
			const user = await Users.findById(id).populate(
				"followers",
				"-password"
			);
			return res.status(200).json({ followers: user.followers });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	getFollowing: async (req, res) => {
		try {
			const id = req.params.id;
			const user = await Users.findById(id).populate(
				"following",
				"-password"
			);
			return res.status(200).json({ following: user.following });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	suggestFollow: async (req, res) => {
		try {
			const users = await Users.find({
				_id: { $nin: [req.user._id] },
				followers: {
					$nin: [req.user._id],
				},
			});
			return res.status(200).json({ users });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	searchUser: async (req, res) => {
		try {
			const users = await Users.find({
				$or: [
					{
						username: new RegExp(
							"^" + escapeStringRegexp(req.query.username),
							"i"
						),
					},
					{
						fullname: new RegExp(
							"^" + escapeStringRegexp(req.query.username),
							"i"
						),
					},
				],
			})
				.select("-password")
				.limit(10);
			return res.status(200).json({ users });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

export default userCtrl;
