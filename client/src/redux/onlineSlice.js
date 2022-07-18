import { createSlice } from "@reduxjs/toolkit";

const onlineSlice = createSlice({
  name: "online",
  initialState: { onlines: [] },
  reducers: {
    getOnlineUsers: (state, action) => {
      state.onlines = action.payload;
    },
    addOnlineUser: (state, action) => {
      state.onlines.push(action.payload);
    },
    removeOnlineUser: (state, action) => {
      state.onlines = state.onlines.filter((item) => item !== action.payload);
    },
  },
});

export default onlineSlice.reducer;
export const { getOnlineUsers, addOnlineUser, removeOnlineUser } =
  onlineSlice.actions;
