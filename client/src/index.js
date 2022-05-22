import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./redux/authSlice";
import post from "./redux/postSlice";
import modal from "./redux/modalSlice";
import loading from "./redux/loadSlice";
import profile from "./redux/profileSlice";
import postSelected from "./redux/postSelectedSlice";
import callback from "./redux/callbackSlice";
import socket from "./redux/socketSlice";
import notify from "./redux/notifySlice";
import conversation from "./redux/conversationSlice";

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
