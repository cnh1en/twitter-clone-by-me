import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
	name: "load",
	initialState: false,
	reducers: {
		loading: (state, action) => {
			return action.payload;
		},
	},
});

export default loadSlice.reducer;
export const { loading } = loadSlice.actions;
