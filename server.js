import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js";
import adminRouter from "./routes/adminRouter.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";
import messagesRouter from "./routes/messagesRouter.js";
import notifyRouter from "./routes/notifyRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import SocketServer from "./socketServer.js";

dotenv.config();

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// CONNECT TO MONGODB
mongoose
	.connect(process.env.URI_MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Connect to MongoDB"))
	.catch((err) => console.log(err));

// SOCKET
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
	SocketServer(socket);
});

app.use("/api", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api", notifyRouter);
app.use("/api", postRouter);
app.use("/api", messagesRouter);

app.get("/", (req, res) => res.json({ msg: "This is my Project 2" }));

httpServer.listen(PORT, () => {
	console.log("Server is running ot PORT 5000");
});
