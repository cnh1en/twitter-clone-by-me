import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import Feed from "./components/home/Feed";
import ActiveUser from "./pages/auth/ActiveUser";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import { fetchDataUser } from "./redux/authSlice";
import { loading } from "./redux/loadSlice";
import { getSocket } from "./redux/socketSlice";
import PageRender from "./routes/PageRender";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { modal } = useSelector((state) => state);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      dispatch(loading(true));
      dispatch(fetchDataUser());
      dispatch(loading(false));
    }
    const socket = io();
    socket.on("connect", () => {
      dispatch(getSocket(socket));
    });

    return () => socket.close();
  }, [dispatch]);

  return (
    <div className={`App ${modal && "pointer-events-none"} relative`}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user/activate/:token" element={<ActiveUser />} />
          <Route path="/user/forgot_password" element={<ForgotPassword />} />
          <Route path="/user/reset/:token" element={<ResetPassword />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Feed />} />
            <Route path="/:page" element={<PageRender />} />
            <Route path="/:page/:id" element={<PageRender />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
