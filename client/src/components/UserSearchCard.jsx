import React from "react";
import Avatar from "../components/Avatar";
import { Link } from "react-router-dom";
const UserSearchCard = ({ user, onClose }) => {
  return (
    <Link
      to={"/" + user?._id}
      onClick={onClose}
      className="flex items-center gap-3 p-2 lg:p-4 border border-transparent border-b-slate-300  hover:outline-primary cursor-pointer rounded"
    >
      <div>
        <Avatar width={50} height={50} name={user.name} userId={user?._id} />
      </div>

      <div>
        <div className="font-semibold text-eclipsis line-clamp-1">
          {user?.name}
        </div>
        <p className="text-sm text-eclipses line-clamp-1">{user.email}</p>
      </div>
    </Link>
  );
};

export default UserSearchCard;
