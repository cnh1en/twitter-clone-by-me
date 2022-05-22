import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
	name: "socket",
	initialState: { socketClient: {} },
	reducers: {
		getSocket: (state, action) => {
			state.socketClient = action.payload;
		},
	},
});

export default socketSlice.reducer;
export const { getSocket } = socketSlice.actions;
