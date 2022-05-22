import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(authCtrl.register);
router.route("/activation").post(authCtrl.activateEmail);
router.route("/forgot_password").post(authCtrl.forgotPassword);
router.route("/reset_password").post(auth, authCtrl.resetPassword);
router.route("/login").post(authCtrl.login);
router.route("/logout").post(authCtrl.logout);
router.route("/refresh_token").get(authCtrl.generateAccessToken);

// social login
router.post("/google_login", authCtrl.googleLogin);
router.post("/facebook_login", authCtrl.facebookLogin);
export default router;
