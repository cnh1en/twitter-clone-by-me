import express from "express";
import postCtrl from "../controllers/postCtrl.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router
	.route("/posts")
	.get(auth, postCtrl.getPosts)
	.post(auth, postCtrl.createPost);

router.route("/likePosts").get(auth, postCtrl.getAllLikePosts);
router.route("/retweets/:id").get(auth, postCtrl.getMyRetweets);
router.route("/post/:id/like").post(auth, postCtrl.likeStatus);
router.route("/post/:id/unlike").post(auth, postCtrl.unlikeStatus);
router.route("/post/:id/retweet").post(auth, postCtrl.retweetPost);
router.route("/post/:id/unretweet").post(auth, postCtrl.unretweetPost);

router.route("/post/:id/destroy").delete(auth, postCtrl.removePost);
router.route("/:id/posts").get(auth, postCtrl.getMyPosts);
router.route("/post/:id").get(auth, postCtrl.getPostSelected);
router.route("/post/:id").patch(auth, postCtrl.updatePost);
router.route("/comment/:id").patch(auth, postCtrl.deleteCommentOfPost);

router.route("/bookmarks").get(auth, postCtrl.getBookmarks);
router.route("/bookmark/:id/destroy").patch(auth, postCtrl.deleteInBookmarks);
router.route("/bookmark/:id").patch(auth, postCtrl.pushInBookmark);

export default router;
