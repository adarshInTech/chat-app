import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import axios from "axios";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const navigate = useNavigate();
  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setUploadPhoto(file);
    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleClearUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUploadPhoto(null);
  };
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
    e.stopPropagation();

    // First, let's verify our URL and data
    const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/register`;
    console.log("Attempting to connect to:", URL);
    console.log("Sending data:", data);

    try {
      // Add headers to help with CORS and content type
      const response = await axios.post(URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
        // This helps with CORS credentials if needed
        withCredentials: true,
      });

      console.log("Response received:", response);
      toast.success(response.data.message);

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
      }
    } catch (error) {
      // More detailed error handling
      if (!error.response) {
        // This means we couldn't reach the server at all
        toast.error(
          "Cannot connect to server. Please check if the server is running."
        );
        console.log("Connection Error Details:", {
          url: URL,
          error: error.message,
        });
      } else {
        // Server responded with an error
        const errorMessage =
          error.response.data.message || "Registration failed";
        toast.error(errorMessage);
        console.log("Server Error Details:", {
          status: error.response.status,
          message: error.response.data.message,
          error: error,
        });
      }
    }
  };

  return (
    <div className="mt-5">
      <div className="bg-white max-w-md   rounded overflow-hidden p-4 mx-auto md:mx-auto ">
        <h3>Welcome To Chat App</h3>

        <form className="grid gap-4 mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="enter your name"
              className=" bg-slate-100 px-2 py-1 focus:outline-primary"
              onChange={handleOnChange}
              value={data.name}
              required
            />
          </div>

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

          <div className="flex flex-col gap-1">
            <label htmlFor="password">password</label>
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

          <div className="flex flex-col gap-1">
            <label htmlFor="profile-pic">
              Photo:
              <div className="h-14 bg-slate-200  flex justify-center items-center     hover:outline-primary rounded cursor-pointer max-w-[300px] text-ellipsis line-clamp-1">
                <p className="text-sm">
                  {uploadPhoto?.name
                    ? uploadPhoto?.name
                    : "Upload Profile Photo"}
                </p>
                {uploadPhoto?.name && (
                  <button
                    onClick={handleClearUploadPhoto}
                    className="text-lg ml-2 hover:text-red-600"
                  >
                    <RiCloseFill />
                  </button>
                )}
              </div>
            </label>

            <input
              type="file"
              id="profile-pic"
              name="profile-pic"
              className=" bg-slate-100 px-2 py-1 focus:outline-primary hidden"
              onChange={handleUploadPhoto}
            />
          </div>

          <button className="bg-primary text-lg px-4 py-2 hover:bg-secondary rounded-sm mt-3 font-bold text-white leading-relaxed tracking-wide">
            Register
          </button>
        </form>
        <p className="hover:text-primary mt-2 text-center">
          Already have account ?{" "}
          <Link className=" text-primary hover:underline " to={"/email"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
