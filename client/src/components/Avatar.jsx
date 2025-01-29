import React from "react";
import { FaRegUser } from "react-icons/fa6";

const Avatar = ({ UserId, name, imageUrl, width, height }) => {
  let avatarName = "";
  // Ensure name is a string before splitting
  if (name && typeof name === "string") {
    const splitName = name.split(" ");
    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];
    } else {
      avatarName = splitName[0][0];
    }
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
  ];

  const randomNumber = Math.floor(Math.random() * 5 + 1);
  return (
    <div
      className={` text-xl font-bold    text-slate-800 overflow-hidden rounded-full `}
      style={{ width: width + "px", height: height + "px" }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          height={height}
          width={width}
          className="overflow-hidden rounded-full"
        />
      ) : name ? (
        <div
          style={{ width: width + "px", height: height + "px" }}
          className={`flex justify-center items-center overflow-hidden rounded-full ${bgColor[randomNumber]}`}
        >
          {avatarName}
        </div>
      ) : (
        <FaRegUser size={width} />
      )}
    </div>
  );
};

export default Avatar;
