import Posts from "../models/postModel.js";

async function deleteComment(post) {
	await Posts.findByIdAndDelete(post._id);
	let temp = post;
	if (!temp.comments.length) {
		return;
	}
	for (const item of post.comments) {
		let post = await Posts.findById(item);
		deleteComment(post);
	}
}

const postCtrl = {
	getPosts: async (req, res) => {
		try {
			const posts = await Posts.find({
				user: {
					$in: [req.user._id, ...req.user.following],
				},
				reply: { $size: 0 },
			})
				.populate("user", "-password")
				.sort("-createdAt");
			return res.status(200).json({
				posts,
			});
		} catch (error) {
			return res.status(500).json({ msg: error.response.message });
		}
	},
	createPost: async (req, res) => {
		try {
			const data = req.body;
			const newPost = new Posts({
				...data,
				user: req.user._id,
			});
			await newPost.save();

			if (data.reply) {
				await Posts.findByIdAndUpdate(data.reply[0], {
					$push: {
						comments: newPost._id,
					},
				});
			}
			res.json({
				msg: "Create post",
				newPost: {
					...newPost._doc,
					user: req.user,
				},
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getMyPosts: async (req, res) => {
		try {
			const posts = await Posts.find({
				user: req.params.id,
				reply: { $size: 0 },
			})
				.sort("-createdAt")
				.populate("user")
				.select("-password");
			return res.status(200).json({
				posts,
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getAllLikePosts: async (req, res) => {
		try {
			const likePosts = await Posts.find({ likes: req.user._id })
				.sort("-createdAt")
				.populate("user")
				.select("-password");
			return res.status(200).json({
				posts: likePosts,
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	getMyRetweets: async (req, res) => {
		try {
			const retweets = await Posts.find({ retweet: req.params.id })
				.sort("-createdAt")
				.populate("user")
				.select("-password");
			return res.status(200).json({
				retweets,
			});
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	likeStatus: async (req, res) => {
		try {
			const post = await Posts.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						likes: req.user._id,
					},
				},
				{ new: true }
			);
			if (!post) {
				return res.status(400).json({ msg: "This post does not exist." });
			}
			return res.status(200).json({ msg: "Liked!", post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	unlikeStatus: async (req, res) => {
		try {
			const post = await Posts.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						likes: req.user._id,
					},
				},
				{ new: true }
			);
			if (!post) {
				return res.status(400).json({ msg: "This post does not exist." });
			}
			return res.status(200).json({ msg: "Unliked!", post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	retweetPost: async (req, res) => {
		try {
			const post = await Posts.findByIdAndUpdate(
				req.params.id,
				{
					$push: {
						retweet: req.user._id,
					},
				},
				{
					new: true,
				}
			);

			if (!post) {
				return res.status(400).json({ msg: "This post does not exist." });
			}

			return res.status(200).json({ msg: "Retweet!", post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	unretweetPost: async (req, res) => {
		try {
			const post = await Posts.findByIdAndUpdate(
				req.params.id,
				{
					$pull: {
						retweet: req.user._id,
					},
				},
				{ new: true }
			);
			if (!post) {
				return res.status(400).json({ msg: "This post does not exist." });
			}
			return res.status(200).json({ msg: "Cancel retweet!", post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
	removePost: async (req, res) => {
		try {
			const post = await Posts.findById(req.params.id);
			if (!post) {
				return res.status(400).json({ msg: "This post does not exist." });
			}
			if (post.reply[0]) {
				const newPost = await Posts.findByIdAndUpdate(
					post.reply[0],
					{
						$pull: {
							comments: post._id,
						},
					},
					{ new: true }
				);
			}
			await deleteComment(post);

			// await Posts.findByIdAndRemove(req.params.id);
			return res.status(200).json({ msg: "Deleted !" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	getPostSelected: async (req, res) => {
		try {
			const post = await Posts.findById(req.params.id)
				.populate({
					path: "user",
					select: "-password",
				})
				.populate({
					path: "comments",
					populate: {
						path: "user",
						select: "-password",
					},
				});
			// .populate("user comments")
			// .select("-password");
			return res.status(200).json({ post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	updatePost: async (req, res) => {
		try {
			const data = req.body;
			const post = await Posts.findByIdAndUpdate(
				req.params.id,
				{ ...data },
				{
					new: true,
				}
			);
			return res.status(200).json({ updatedPost: post });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},

	deleteCommentOfPost: async (req, res) => {
		try {
			const { postId } = req.body;
			const { id: commentId } = req.params;
			await Posts.findByIdAndUpdate(postId, {
				$pull: {
					comments: commentId,
				},
			});
			return res.status(200).json({ msg: "Deleted !" });
		} catch (error) {
			return res.status(500).json({ msg: error.message });
		}
	},
};

export default postCtrl;
