import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import auth from "./redux/authSlice";
import bookmark from "./redux/bookmarkSlice";
import callback from "./redux/callbackSlice";
import conversation from "./redux/conversationSlice";
import loading from "./redux/loadSlice";
import modal from "./redux/modalSlice";
import notify from "./redux/notifySlice";
import postSelected from "./redux/postSelectedSlice";
import post from "./redux/postSlice";
import profile from "./redux/profileSlice";
import socket from "./redux/socketSlice";
import online from "./redux/onlineSlice";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    auth,
    post,
    modal,
    loading,
    profile,
    postSelected,
    callback,
    socket,
    notify,
    conversation,
    bookmark,
    online,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
