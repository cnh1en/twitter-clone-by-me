import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
  name: "notify",
  initialState: {
    notifies: [],
    isRead: 0,
    page: 1,
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
    updatePageNotifies: (state) => {
      state.page += 1;
    },
    loadMoreNotifies: (state, action) => {
      state.notifies = [...state.notifies, ...action.payload];
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
  updatePageNotifies,
  loadMoreNotifies,
} = notifySlice.actions;
