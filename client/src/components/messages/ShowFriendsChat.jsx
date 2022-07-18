import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";

const ShowFriendsChat = ({ users }) => {
  return (
    <>
      {users.map((user) => (
        <div className="flex gap-2	" key={user._id}>
          <Link
            className="flex items-center gap-2 hover:bg-[#16181c] dark:hover:bg-gray-200 w-full p-2"
            to={`/messages/${user._id}`}
          >
            <Avatar src={user.avatar} width="w-12" height="h-12" />
            <div className="flex flex-col justify-center">
              <span className="text-[15px] text-white dark:text-black">
                {user.fullname}
              </span>
              <span className="text-[13px] text-[#71767b]">
                @{user.username}
              </span>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default ShowFriendsChat;
