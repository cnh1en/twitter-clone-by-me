import Notifies from "../models/notifyModel.js";
import Users from "../models/userModel.js";

const notifyCtrl = {
	createNotify: async (req, res) => {
		try {
			const { id, recipients, url, text, content, image, action } = req.body;

			if (recipients.length > 1) {
				const user = await Users.findById(recipients[0]);
				if (user.mute.includes(req.user._id)) {
					return res.json({ status: false });
				}
			}
			if (recipients.includes(req.user._id.toString())) return;
			const notify = new Notifies({
				id,
				recipients,
				url,
				text,
				content,
				image,
				user: req.user._id,
				action,
			});
			await notify.save();

			return res.json({ notify, status: true });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	removeNotify: async (req, res) => {
		try {
			const notify = await Notifies.findOneAndRemove({
				id: req.params.id,
				url: req.query.url,
			});
			res.json({ notify });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getNotifies: async (req, res) => {
		try {
			const notifies = await Notifies.find({
				recipients: req.user._id,
			})
				.sort("-createdAt")
				.populate("user", "avatar username")
				.limit(10);

			return res.json({ notifies });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	isReadNotify: async (req, res) => {
		try {
			const notify = await Notifies.findByIdAndUpdate(req.params.id, {
				isRead: true,
			});

			return res.json({ notify });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	deleteAllNotifies: async (req, res) => {
		try {
			const notify = await Notifies.deleteMany({
				recipients: req.user._id,
			});

			return res.json({ notify });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

export default notifyCtrl;
