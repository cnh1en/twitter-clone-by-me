import express from "express";
import adminCtrl from "../controllers/adminCtrl.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const router = express.Router();

router.get("/all", auth, authAdmin, adminCtrl.getAllInfoUser);
export default router;
