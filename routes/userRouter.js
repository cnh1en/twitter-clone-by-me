import express from "express";
import userCtrl from "../controllers/userCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.route("/suggest_follow").get(auth, userCtrl.suggestFollow);
router.route("/search").get(auth, userCtrl.searchUser);
router.route("/:id").get(auth, userCtrl.getUser);
router.route("/:id").patch(auth, userCtrl.updateUser);
router.route("/follow/:id").post(auth, userCtrl.follow);
router.route("/unfollow/:id").post(auth, userCtrl.unfollow);
router.route("/followers/:id").get(auth, userCtrl.getFollowers);
router.route("/following/:id").get(auth, userCtrl.getFollowing);

router.route("/mute/:id").patch(auth, userCtrl.muteUser);
router.route("/unmute/:id").patch(auth, userCtrl.unmuteUser);
export default router;
