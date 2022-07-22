import Users from "../models/userModel.js";
import Conversations from "../models/conversationModel.js";
import Messages from "../models/messagesModel.js";

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

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
      const features = await new APIfeatures(
        Messages.find({
          $or: [
            { sender: req.user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: req.user._id },
          ],
        }),
        req.query
      ).paginating();

      const messages = await features.query
        .sort("createdAt")
        .populate("sender recipient", "-password");

      return res.json({ messages });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      await Messages.findByIdAndDelete(req.params.id);
      return res.status(200).json({ msg: "Deleted!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  deleteConversation: async (req, res) => {
    try {
      const conver = await Conversations.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.params.id] },
          { recipients: [req.params.id, req.user._id] },
        ],
      });
      await Messages.deleteMany({
        conversation: conver,
      });
      return res.status(200).json({ msg: "Deleted Conversation Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getNotReadMessages: async (req, res) => {
    try {
      const messages = await Messages.find({
        isRead: false,
      });
      return res.status(200).json({ messages });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

export default messagesCtrl;
