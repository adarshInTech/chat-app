import axios from "axios";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/user-details`;

      const response = await axios({
        method: "get",
        url: URL,
        withCredentials: true,
      });
      console.log("current user details", response);
    } catch (error) {
      console.log("errorr", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div>
      Home
      {/* message component */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
