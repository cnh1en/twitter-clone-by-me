import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataAPI } from "../utils/fetchData";

const postSelectedSlice = createSlice({
	name: "postSelected",
	initialState: {
		loading: false,
		error: false,
		info: {},
	},
	reducers: {
		likeSelectedPost: (state, action) => {
			state.info.likes.push(action.payload);
		},
		unlikeSelectedPost: (state, action) => {
			state.info.likes = state.info.likes.filter(
				(item) => item !== action.payload
			);
		},
		shareSelectedPost: (state, action) => {
			state.info.retweet.push(action.payload);
		},
		unshareSelectedPost: (state, action) => {
			state.info.retweet = state.info.retweet.filter(
				(item) => item !== action.payload
			);
		},
		comment: (state, action) => {
			state.info.comments.push(action.payload);
		},
		likeComment: (state, action) => {
			const { id, like } = action.payload;
			state.info.comments = state.info.comments.map((item) =>
				item._id === id ? { ...item, likes: [...item.likes, like] } : item
			);
		},
		unlikeComment: (state, action) => {
			const { id, like } = action.payload;
			state.info.comments = state.info.comments.map((item) =>
				item._id === id
					? {
							...item,
							likes: item.likes.filter((item) => item !== like),
					  }
					: item
			);
		},
		retweetComment: (state, action) => {
			const { id, retweet } = action.payload;
			state.info.comments = state.info.comments.map((item) =>
				item._id === id
					? { ...item, retweet: [...item.retweet, retweet] }
					: item
			);
		},
		unretweetComment: (state, action) => {
			const { id, retweet } = action.payload;
			state.info.comments = state.info.comments.map((item) =>
				item._id === id
					? {
							...item,
							retweet: item.retweet.filter((item) => item !== retweet),
					  }
					: item
			);
		},
		deleteComment: (state, action) => {
			state.info.comments = state.info.comments.filter(
				(item) => item._id !== action.payload
			);
		},
		commentInComment: (state, action) => {
			const { id, comment } = action.payload;
			state.info.comments = state.info.comments.map((item) =>
				item._id === id
					? { ...item, comments: [...item.comments, comment] }
					: item
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostSelected.pending, (state, action) => {
				state.loading = true;
			})
			.addCase(fetchPostSelected.fulfilled, (state, action) => {
				state.loading = false;
				state.info = action.payload.post;
			})
			.addCase(fetchPostSelected.rejected, (state, action) => {
				state.loading = false;
				state.error = true;
			});
	},
});

export const fetchPostSelected = createAsyncThunk(
	"selectedPost/fetch",
	async (payload) => {
		const res = await getDataAPI(`post/${payload.id}`, payload.token);
		console.log(res.data);
		return res.data;
	}
);

export default postSelectedSlice.reducer;
export const {
	likeSelectedPost,
	unlikeSelectedPost,
	shareSelectedPost,
	unshareSelectedPost,
	comment,
	likeComment,
	unlikeComment,
	retweetComment,
	unretweetComment,
	deleteComment,
	commentInComment,
} = postSelectedSlice.actions;
