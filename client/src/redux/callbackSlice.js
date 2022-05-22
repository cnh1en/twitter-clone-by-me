import { createSlice } from "@reduxjs/toolkit";

const callbackSlice = createSlice({
	name: "callback",
	initialState: false,
	reducers: {
		setCallback: (state, action) => {
			return action.payload;
		},
	},
});

export default callbackSlice.reducer;
export const { setCallback } = callbackSlice.actions;
