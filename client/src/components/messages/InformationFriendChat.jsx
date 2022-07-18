import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const InformationFriendChat = ({ user }) => {
  return (
    <div className="flex-center flex-col space-y-4 border-b-[1px] border-color pb-8 pt-4 mb-4 dark:border-gray-200">
      <Avatar src={user.avatar} width="w-40" height="h-40" />
      <div className="name text-center">
        <div className="text-[14px] text-center mb-2">
          <Link
            className="font-bold hover:underline cursor-pointer text-white dark:text-black"
            to={`/profile/${user._id}`}
          >
            {user.fullname}
          </Link>{" "}
          <span className="text-[#71767b]">@{user.username}</span>
        </div>
        <div className="space-x-3 flex">
          <div>
            <span className="dark:text-black">{user.following?.length} </span>
            <span className="text-[#71767b]">following</span>
          </div>
          <div>
            <span className="dark:text-black">{user.followers?.length} </span>
            <span className="text-[#71767b]">followers</span>
          </div>
        </div>
        <div className="text-[#71767B] flex items-center gap-2 my-2 text-center">
          <i className="ri-calendar-2-line"></i>
          <span>Joined from {moment(user.createdAt).format("MMMM Do")}</span>
        </div>
      </div>
    </div>
  );
};

export default InformationFriendChat;
