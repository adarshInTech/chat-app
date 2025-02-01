import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Avatar from "../components/Avatar";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/UserSlice";
const CheckPasswordPage = () => {
  const [data, setData] = useState({
    password: "",
    userId: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log("location", location.state);
  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email");
    }
  }, []);
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
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/password`;

    try {
      // Add headers to help with CORS and content type
      const response = await axios({
        method: "post",
        url: URL,
        data: {
          userId: location?.state?._id,
          password: data.password,
        },
        withCredentials: true,
      });

      toast.success(response.data.message);

      if (response.data.success) {
        console.log("data", response);
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);

        setData({
          password: "",
        });

        navigate("/");
      }
    } catch (error) {
      toast.error(error?.respnse?.data?.message);
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white max-w-md   rounded overflow-hidden p-4 mx-auto md:mx-auto  ">
        <div className="w-fit mx-auto mb-4 justify-center items-center flex-col">
          {/* <FaRegUser size={80} /> */}

          <Avatar
            width={70}
            height={70}
            name={location?.state?.name}
            imageUrl={location?.state?.profile_pic}
          />
          <h2 className="font-semibold text-bold mt-2">
            {location?.state?.name}
          </h2>
        </div>
        <h3>Welcome To Chat App</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              placeholder="enter your password"
              className=" bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.password}
              required
            />
          </div>

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded-sm mt-3 font-bold text-white leading-relaxed tracking-wide">
            login
          </button>
        </form>
        <p className="hover:text-primary mt-2 text-center">
          <Link
            className=" text-primary hover:underline "
            to={"/forgot-password"}
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
