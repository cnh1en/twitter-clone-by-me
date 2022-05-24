import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		content: String,
		images: {
			type: Array,
			default: [],
		},
		status: {
			type: String,
			default: "public",
		},
		// classify: {
		// 	type: Boolean,
		// 	default: true,
		// },
		bookmarks: [{ type: mongoose.Types.ObjectId, ref: "user" }],
		retweet: [{ type: mongoose.Types.ObjectId, ref: "user" }],
		reply: [{ type: mongoose.Types.ObjectId, ref: "post" }],
		likes: [{ type: mongoose.Types.ObjectId, ref: "user" }],
		comments: [{ type: mongoose.Types.ObjectId, ref: "post" }],
		user: { type: mongoose.Types.ObjectId, ref: "user" },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("post", postSchema);
