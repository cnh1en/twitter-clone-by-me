import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
	const firstLogin = localStorage.getItem("firstLogin");
	return firstLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
