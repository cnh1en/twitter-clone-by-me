import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: { messages: [], isRead: 0 },
  reducers: {
    createMessage: (state, action) => {
      state.messages.push(action.payload);
      state.isRead += 1;
    },
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    deleteMessage: (state, action) => {
      state.messages = state.messages.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

export default conversationSlice.reducer;
export const { createMessage, getMessages, deleteMessage } =
  conversationSlice.actions;
