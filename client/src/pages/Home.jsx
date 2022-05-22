import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Widget from "../components/home/Widget";
import Loading from "../components/Loading";
import Sidebar from "../components/sidebar/Sidebar";
import { getSocket } from "../redux/socketSlice";
import SocketClient from "../SocketClient";
import { isEmpty } from "lodash";
import { getDataAPI } from "../utils/fetchData";
import { getIsRead, getNotifies } from "../redux/notifySlice";

const Home = () => {
	const { loading, auth, socket } = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.token) {
			getDataAPI("notifies", auth.token)
				.then((res) => {
					dispatch(getNotifies(res.data.notifies));
					dispatch(
						getIsRead(
							res.data.notifies.filter((item) => !item.isRead).length
						)
					);
				})
				.catch((error) => console.log(error));
		}
	}, [auth.token, dispatch]);
	return (
		<div className="bg-[#000] w-full min-h-screen">
			<Sidebar />
			<Outlet />
			{auth.token && !isEmpty(socket.socketClient) && <SocketClient />}
			{loading && <Loading />}
			<Widget />
		</div>
	);
};

export default Home;
