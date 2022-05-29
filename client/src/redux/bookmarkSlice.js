import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const bookmarkSlice = createSlice({
	name: "bookmark",
	initialState: { bookmarks: [] },
	reducers: {
		getBookmarks: (state, action) => {
			state.bookmarks = action.payload;
		},
		pushInBookmarks: (state, action) => {
			state.bookmarks.unshift(action.payload);
			toast("Tweet added to your Bookmarks", {
				position: "bottom-center",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		},
		deleteInBookmarks: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(item) => item._id !== action.payload
			);
			toast("Tweet removed from your Bookmarks", {
				position: "bottom-center",
				autoClose: 1000,
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		},
		updatePostInBookmarks: (state, action) => {
			state.bookmarks = state.bookmarks.map((item) =>
				item._id === action.payload._id ? action.payload : item
			);
		},
	},
});

export default bookmarkSlice.reducer;
export const {
	getBookmarks,
	pushInBookmarks,
	deleteInBookmarks,
	updatePostInBookmarks,
} = bookmarkSlice.actions;
