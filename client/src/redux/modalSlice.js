import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
	name: "modal",
	initialState: false,
	reducers: {
		openModal: (state, action) => {
			return action.payload;
		},
	},
});

export default modalSlice.reducer;
export const { openModal } = modalSlice.actions;
