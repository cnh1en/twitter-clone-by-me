import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import axios from "axios";

const ActiveUser = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  console.log(token);
  useEffect(() => {
    if (token) {
      const activateUser = async () => {
        try {
          await axios.post("/api/activation", { activation_token: token });
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      };
      activateUser();
    }
  }, [token, navigate]);
  return (
    <div className="relative w-full h-screen">
      <Loading />
    </div>
  );
};

export default ActiveUser;
