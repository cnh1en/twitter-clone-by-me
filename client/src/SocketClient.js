import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "./redux/conversationSlice";
import { createNotify } from "./redux/notifySlice";
import { likeSelectedPost } from "./redux/postSelectedSlice";
import {
	createComment,
	createPost2,
	likePost,
	retweetPost,
	unlikePost,
	unretweetPost,
} from "./redux/postSlice";
import { likePostProfile } from "./redux/profileSlice";

const SocketClient = () => {
	const { auth, socket } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		socket.socketClient.emit("joinUser", auth.user._id);
	}, [auth.user._id, socket.socketClient]);

	useEffect(() => {
		socket.socketClient.on("likeToClient", ({ like, id }) => {
			console.log({ like, id });
			dispatch(likePost({ id, like: like._id }));
		});
		return () => socket.socketClient.off("likeToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("likePostInProfileToClient", ({ post }) => {
			dispatch(likePostProfile({ post }));
		});
		return () => socket.socketClient.off("likePostInProfileToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);
	useEffect(() => {
		socket.socketClient.on(
			"likePostInSelectedPostToClient",
			({ post, like }) => {
				dispatch(likeSelectedPost(like._id));
			}
		);
		return () => socket.socketClient.off("likePostInSelectedPostToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("unlikeToClient", ({ like, id }) => {
			console.log({ like, id });
			dispatch(unlikePost({ id, like: like._id }));
		});
		return () => socket.socketClient.off("unlikeToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("retweetPostToClient", ({ post, retweet }) => {
			dispatch(retweetPost({ id: post._id, retweet }));
		});
		return () => socket.socketClient.off("retweetPostToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("unretweetPostToClient", ({ post, retweet }) => {
			dispatch(unretweetPost({ id: post._id, retweet }));
		});
		return () => socket.socketClient.off("unretweetPostToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on(
			"createCommentToClient",
			({ newPost, replyPost }) => {
				dispatch(createComment({ id: replyPost._id, newPost }));
			}
		);
		return () => socket.socketClient.off("createCommentToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("createPostToClient", ({ post }) => {
			dispatch(createPost2(post));
		});
		return () => socket.socketClient.off("createPostToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	useEffect(() => {
		socket.socketClient.on("createNotifyToClient", ({ msg }) => {
			console.log({ msg });
			dispatch(createNotify(msg));
		});
		return () => socket.socketClient.off("createNotifyToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);
	useEffect(() => {
		socket.socketClient.on("createMessageToClient", (message) => {
			dispatch(createMessage(message));
		});
		return () => socket.socketClient.off("createMessageToClient");
	}, [auth.user._id, socket.socketClient, dispatch]);

	return <div></div>;
};

export default SocketClient;
