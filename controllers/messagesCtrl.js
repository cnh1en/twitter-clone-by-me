import Users from "../models/userModel.js";
import Conversations from "../models/conversationModel.js";
import Messages from "../models/messagesModel.js";

const messagesCtrl = {
	createMessage: async (req, res) => {
		try {
			const { sender, call, recipient, text, media } = req.body;

			if (!recipient || (!text.trim() && !media.length && !call)) return;

			const newConversation = await Conversations.findOneAndUpdate(
				{
					$or: [
						{ recipients: [sender, recipient] },
						{ recipients: [recipient, sender] },
					],
				},
				{
					recipients: [sender, recipient],
					text,
					call,
					media,
				},
				{ new: true, upsert: true }
			);

			const newMessage = new Messages({
				conversation: newConversation._id,
				sender,
				call,
				recipient,
				text,
				media,
			});

			await newMessage.save();

			res.json({ newConversation, newMessage });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getConversations: async (req, res) => {
		try {
			const conversations = await Conversations.find({
				recipients: { $in: [req.user._id] },
			}).populate("recipients", "-password");
			return res.json({ conversations });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	getMessages: async (req, res) => {
		try {
			const messages = await Messages.find({
				$or: [
					{ sender: req.user._id, recipient: req.params.id },
					{ sender: req.params.id, recipient: req.user._id },
				],
			})
				.sort("createdAt")
				.populate("sender recipient", "-password");

			return res.json({ messages });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

export default messagesCtrl;
