import React, { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import EditUserDetails from "./EditUserDetails";
import { GoArrowUpLeft } from "react-icons/go";
import SearchUser from "./SearchUser";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  return (
    <div className="w-full h-full grid grid-cols-[48px_1fr] bg-white">
      <div className="flex flex-col justify-between bg-slate-400 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center  items-center hover:bg-slate-500 ${
                isActive && "bg-slate-200"
              }`
            }
            title="chat"
          >
            <IoIosChatboxes size={25} />
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center  items-center hover:bg-slate-500"
            title="add friend"
            onClick={() => setOpenSearchUser(true)}
          >
            <FaUserPlus
              size={25}
              className="flex justify-center  items-center hover:bg-slate-500"
              title="add friend"
            />
          </div>
        </div>

        <div>
          <button
            onClick={() => setEditUserOpen(true)}
            className="w-12 h-12 flex justify-center  items-center hover:bg-slate-500 mx-auto"
            title={user?.name}
          >
            <Avatar
              height={39}
              width={39}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}
            />
          </button>
          <button
            className="w-12 h-12 flex justify-center  items-center hover:bg-slate-500"
            title="logout"
          >
            <span className="-ml-1">
              <CgLogOut size={25} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex justify-center items-center h-16">
          <h2 className="text-xl font-bold p-4 text-slate-800  ">Messages</h2>
        </div>
        <div className="bg-slate-200 p-[0.5px]"></div>

        <div className="  h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {allUser.length === 0 && (
            <div className="mt-15">
              <div className="flex justify-center items-center my-4 text-slate-500">
                <GoArrowUpLeft size={50} />
              </div>
              <p className="text-lg text-center text-slate-400">
                Explore users to start a conversation.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* edit user details */}
      {editUserOpen && (
        <EditUserDetails onClose={() => setEditUserOpen(false)} user={user} />
      )}

      {/*  search user */}

      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
