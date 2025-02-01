import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/UserSlice";
import Sidebar from "../components/Sidebar";
import logo from "../assets/logo.png";
import io from "socket.io-client";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));
      if (response.data.logout) {
        dispatch(logout);
        navigate("/email");
      }
      console.log("current user details", response);
    } catch (error) {
      console.log("errorr", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // socket connection

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineUser", (data) => {
      console.log(data);
      dispatch(setOnlineUser(data));
    });
    dispatch(setSocketConnection(socketConnection));
    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";
  return (
    <div className="grid lg:grid-cols-[300px_1fr] h-screen max-h-screen">
      <aside className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </aside>
      {/* message component   */}
      <section className={`${basePath && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`hidden justify-center items-center flex-col gap-2 ${
          !basePath ? "hidden" : " lg:flex"
        }`}
      >
        <div>
          <img src={logo} alt="logo" width={200} />
        </div>

        <p className="text-lg mt-2 text-slate-500">
          Select user to send message{" "}
        </p>
      </div>
    </div>
  );
};

export default Home;
