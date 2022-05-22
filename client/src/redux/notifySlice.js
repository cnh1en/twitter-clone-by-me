import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
	name: "notify",
	initialState: {
		notifies: [],
		isRead: 0,
	},
	reducers: {
		getNotifies: (state, action) => {
			state.notifies = action.payload;
		},
		createNotify: (state, action) => {
			state.notifies.unshift(action.payload);
			state.isRead = state.isRead + 1;
		},
		getIsRead: (state, action) => {
			state.isRead = action.payload;
		},
		readNotify: (state, action) => {
			const { id } = action.payload;
			state.notifies = state.notifies.map((item) =>
				item._id === id ? { ...item, isRead: true } : item
			);
		},
		deleteAllNotifies: (state, action) => {
			state.notifies = [];
			state.isRead = 0;
		},
	},
});

export default notifySlice.reducer;
export const {
	createNotify,
	getNotifies,
	getIsRead,
	readNotify,
	deleteAllNotifies,
} = notifySlice.actions;
