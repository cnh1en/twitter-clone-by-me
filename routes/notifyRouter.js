import express from "express";
import auth from "../middlewares/auth.js";
import notifyCtrl from "../controllers/notifyCtrl.js";

const router = express.Router();

router.post("/notify", auth, notifyCtrl.createNotify);
router.delete("/notify/:id", auth, notifyCtrl.removeNotify);
router.get("/notifies", auth, notifyCtrl.getNotifies);
router.patch("/isReadNotify/:id", auth, notifyCtrl.isReadNotify);
router.get("/getNotReadNotifies", auth, notifyCtrl.getNotReadNotifies);
router.delete("/deleteAllNotifies", auth, notifyCtrl.deleteAllNotifies);

export default router;
