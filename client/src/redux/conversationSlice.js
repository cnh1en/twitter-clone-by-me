import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
	name: "conversation",
	initialState: { messages: [] },
	reducers: {
		createMessage: (state, action) => {
			state.messages.push(action.payload);
		},
		getMessages: (state, action) => {
			state.messages = action.payload;
		},
	},
});

export default conversationSlice.reducer;
export const { createMessage, getMessages } = conversationSlice.actions;
