import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    login: (state, action) => {
      return action.payload;
    },
    getCurrentUser: (state, action) => {
      return action.payload;
    },
    updateAuthUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDataUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchDataUser.rejected, (state) => {
        state.success = false;
      });
  },
});

export const fetchDataUser = createAsyncThunk("fetch/dataUser", async () => {
  const res = await axios.get("/api/refresh_token");
  return res.data;
});

export const { login, getCurrentUser, updateAuthUser } = authSlice.actions;
export default authSlice.reducer;
