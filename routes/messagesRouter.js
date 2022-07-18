import express from "express";
import messagesCtrl from "../controllers/messagesCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/messages", auth, messagesCtrl.getNotReadMessages);
router.get("/messages/:id", auth, messagesCtrl.getMessages);
router.get("/conversations", auth, messagesCtrl.getConversations);
router.post("/createMessage", auth, messagesCtrl.createMessage);
router.delete("/message/:id/destroy", auth, messagesCtrl.deleteMessage);
router.delete(
  "/conversation/:id/destroy",
  auth,
  messagesCtrl.deleteConversation
);

export default router;
