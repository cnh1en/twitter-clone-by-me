let users = [];
const SocketServer = (socket) => {
	socket.on("joinUser", (id) => {
		users.push({ id, socketId: socket.id });
	});

	socket.on("disconnect", () => {
		users = users.filter((user) => user.socketId !== socket.id);
		console.log({ users });
	});

	socket.on("likePost", ({ like, post }) => {
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("likeToClient", { like, id: post._id });
			});
		}
	});
	socket.on("unlikePost", ({ like, post }) => {
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("unlikeToClient", { like, id: post._id });
			});
		}
	});
	socket.on("likePostInProfile", ({ post }) => {
		console.log(post);
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("likePostInProfileToClient", { post });
			});
		}
	});
	socket.on("likePostInSelectedPost", ({ post, like }) => {
		console.log(post);
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("likePostInSelectedPostToClient", { post, like });
			});
		}
	});

	socket.on("retweetPost", ({ post, retweet }) => {
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("retweetPostToClient", { post, retweet });
			});
		}
	});
	socket.on("unretweetPost", ({ post, retweet }) => {
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		// console.log({ clients });
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("unretweetPostToClient", { post, retweet });
			});
		}
	});

	socket.on("createComment", ({ newPost, replyPost }) => {
		const ids = [...replyPost.user.followers, replyPost.user._id];
		const clients = users.filter((user) => ids.includes(user.id));
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("createCommentToClient", { newPost, replyPost });
			});
		}
	});

	socket.on("createPost", ({ post }) => {
		const ids = [...post.user.followers, post.user._id];
		const clients = users.filter((user) => ids.includes(user.id));

		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("createPostToClient", { post });
			});
		}
	});
	socket.on("createNotify", ({ msg }) => {
		const ids = [...msg.recipients];
		const clients = users.filter((user) => ids.includes(user.id));
		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("createNotifyToClient", { msg });
			});
		}
	});

	socket.on("createMessage", (message) => {
		const clients = users.filter((user) => user.id === message.recipient);

		if (clients.length) {
			clients.forEach((client) => {
				socket
					.to(`${client.socketId}`)
					.emit("createMessageToClient", message);
			});
		}
	});
};

export default SocketServer;
