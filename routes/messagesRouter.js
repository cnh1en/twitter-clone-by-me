import express from "express";
import messagesCtrl from "../controllers/messagesCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();
router.get("/messages/:id", auth, messagesCtrl.getMessages);
router.get("/conversations", auth, messagesCtrl.getConversations);
router.post("/createMessage", auth, messagesCtrl.createMessage);

export default router;
