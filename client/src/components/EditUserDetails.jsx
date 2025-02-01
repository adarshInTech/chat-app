import React, { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import uploadFile from "../helpers/uploadFile";
import Divider from "./Divider";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/UserSlice";
const EditUserDetails = ({ onClose, user }) => {
  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    const uploadPhoto = await uploadFile(file);

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadPhoto?.url,
      };
    });
  };
  const handleOpenUploadPhoto = (e) => {
    uploadPhotoRef.current.click();
    e.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${import.meta.env.VITE_APP_BACKEND_URL}/api/update-user`;
      const response = await axios({
        method: "post",
        data: data,
        url: URL,
        withCredentials: true,
      });
      toast.success(response.data.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
        onClose();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...user,
      };
    });
  }, [user]);
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-blue-700/30 flex justify-center items-center ">
      <div className="bg-white p-4 m-1  w-full max-w-sm py-6 shadow-black rounded-4xl">
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm ">Edit User Details</p>
        <form className="grid gap-3 mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleOnChange}
              className="w-full py-1 px-2 focus:outline-primary border border-0.5 rounded-2xl"
            />
          </div>

          <div>
            <div>Photo:</div>
            <div className="my-1 flex items-center gap-4">
              <Avatar
                width={40}
                height={40}
                imageUrl={data?.profile_pic}
                name={data?.name}
                userId={user?._id}
              />
              <label htmlFor="Profile_pic">
                <button onClick={handleOpenUploadPhoto} className="font-bold">
                  Change Photo
                </button>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPhoto}
                  id="Profile_pic"
                  ref={uploadPhotoRef}
                />
              </label>
            </div>
          </div>

          <Divider />

          <div className="flex justify-end gap-2 ">
            <button
              onClick={onClose}
              className="border-primary-2 rounded border px-4 py-1 text-primary hover:bg-primary hover:text-white"
            >
              Cancel
            </button>
            <button
              onSubmit={handleSubmit}
              className=" bg-primary rounded border px-4 py-1 text-white hover:bg-secondary"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserDetails;
