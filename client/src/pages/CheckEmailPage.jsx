import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa6";

const CheckEmailPage = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First, let's verify our URL and data
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/email`;

    try {
      // Add headers to help with CORS and content type
      const response = await axios.post(URL, data);

      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          email: "",
        });

        navigate("/password", {
          state: response?.data?.data,
        });
      }
    } catch (error) {
      toast.error(error?.respnse?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white max-w-md   rounded overflow-hidden p-4 mx-auto md:mx-auto ">
        <div className="w-fit mx-auto mb-2">
          <FaUser size={80} />
        </div>
        <h3>Welcome To Chat App</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="enter your email"
              className=" bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.email}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded-sm mt-3 font-bold text-white leading-relaxed tracking-wide">
            Next
          </button>
        </form>
        <p className="hover:text-primary mt-2 text-center">
          Account Registration ?{" "}
          <Link className=" text-primary hover:underline " to={"/register"}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
