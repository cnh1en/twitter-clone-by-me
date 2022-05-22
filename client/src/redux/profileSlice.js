import { createSlice } from "@reduxjs/toolkit";

const EditData = (data, id, post) => {
	const newData = data.map((item) => (item._id === id ? post : item));
	return newData;
};

const DeleteData = (data, id) => {
	const newData = data.filter((item) => item._id !== id);
	return newData;
};

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		info: {},
		posts: [],
		likePosts: [],
		retweets: [],
	},
	reducers: {
		getProfile: (state, action) => {
			state.info = action.payload;
		},
		getPostsProfile: (state, action) => {
			state.posts = action.payload;
		},
		getLikePostsProfile: (state, action) => {
			state.likePosts = action.payload;
		},
		getRetweetsProfile: (state, action) => {
			state.retweets = action.payload;
		},
		follow: (state, action) => {
			state.info.followers = [...state.info.followers, action.payload];
		},
		unfollow: (state, action) => {
			state.info.followers = DeleteData(
				state.info.followers,
				action.payload._id
			);
		},
		myFollow: (state, action) => {
			state.info.following.push(action.payload);
		},
		myUnfollow: (state, action) => {
			state.info.following = DeleteData(
				state.info.following,
				action.payload._id
			);
		},
		updateProfileUser: (state, action) => {
			state.info = action.payload;
		},
		likePostProfile: (state, action) => {
			const { socket, post } = action.payload;
			console.log(action.payload);
			state.posts = EditData(state.posts, post._id, post);
			state.retweets = EditData(state.retweets, post._id, post);
			state.likePosts = EditData(state.likePosts, post._id, post);

			state.likePosts.push(post);
		},
		retweetProfile: (state, action) => {
			state.posts = EditData(
				state.posts,
				action.payload._id,
				action.payload
			);
			state.retweets = EditData(
				state.retweets,
				action.payload._id,
				action.payload
			);
			state.likePosts = EditData(
				state.likePosts,
				action.payload._id,
				action.payload
			);

			state.retweets.push(action.payload);
		},
		unlikePostProfile: (state, action) => {
			state.posts = EditData(
				state.posts,
				action.payload._id,
				action.payload
			);
			state.retweets = EditData(
				state.retweets,
				action.payload._id,
				action.payload
			);
			state.likePosts = EditData(
				state.likePosts,
				action.payload._id,
				action.payload
			);
			state.likePosts = DeleteData(state.likePosts, action.payload._id);
		},
		unretweetPostProfile: (state, action) => {
			state.posts = EditData(
				state.posts,
				action.payload._id,
				action.payload
			);
			state.retweets = EditData(
				state.retweets,
				action.payload._id,
				action.payload
			);
			state.likePosts = EditData(
				state.likePosts,
				action.payload._id,
				action.payload
			);
			state.retweets = DeleteData(state.retweets, action.payload._id);
		},
		deletePostProfile: (state, action) => {
			state.posts = DeleteData(state.posts, action.payload);
			state.likePosts = DeleteData(state.likePosts, action.payload);
			state.retweets = DeleteData(state.retweets, action.payload);
		},
	},
});

export default profileSlice.reducer;
export const {
	getProfile,
	follow,
	unfollow,
	updateProfileUser,
	myFollow,
	myUnfollow,
	getPostsProfile,
	getLikePostsProfile,
	getRetweetsProfile,
	likePostProfile,
	unlikePostProfile,
	retweetProfile,
	unretweetPostProfile,
	deletePostProfile,
} = profileSlice.actions;
