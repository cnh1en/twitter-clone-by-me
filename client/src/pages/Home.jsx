import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Widget from "../components/home/Widget";
import Loading from "../components/Loading";
import Sidebar from "../components/sidebar/Sidebar";
import { getIsRead, getNotifies } from "../redux/notifySlice";
import SocketClient from "../SocketClient";
import { getDataAPI } from "../utils/fetchData";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const { loading, auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      getDataAPI("/getNotReadNotifies", auth.token)
        .then((res) => {
          // dispatch(getNotifies(res.data.notifies));
          dispatch(getIsRead(res.data.notifies.length));
        })
        .catch((error) => console.log(error));
    }
  }, [auth.token, dispatch]);

  return (
    <div className="bg-black w-full min-h-screen dark:bg-white">
      <Sidebar />
      <Outlet />
      {auth.token && !isEmpty(socket.socketClient) && <SocketClient />}
      {loading && (
        <div className="width-page z-50 bg-black dark:bg-white">
          <Loading />
        </div>
      )}
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Widget />
    </div>
  );
};

export default Home;
