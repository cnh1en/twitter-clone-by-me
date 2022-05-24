import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
	name: "bookmark",
	initialState: { bookmarks: [] },
	reducers: {
		getBookmarks: (state, action) => {
			state.bookmarks = action.payload;
		},
		pushInBookmarks: (state, action) => {
			state.bookmarks.unshift(action.payload);
		},
		deleteInBookmarks: (state, action) => {
			state.bookmarks = state.bookmarks.filter(
				(item) => item._id !== action.payload
			);
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
