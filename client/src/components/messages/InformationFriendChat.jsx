import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";

const InformationFriendChat = ({ user }) => {
	return (
		<div className="flex-center flex-col space-y-4 border-b-[1px] border-color pb-8 pt-4 mb-4">
			<Avatar src={user.avatar} width="w-40" height="h-40" />
			<div className="name text-center">
				<div className="text-[14px] text-center mb-2">
					<Link
						className="font-bold hover:underline cursor-pointer"
						to={`/profile/${user._id}`}
					>
						{user.fullname}
					</Link>{" "}
					<span className="text-[#71767b]">@{user.username}</span>
				</div>
				<div className="space-x-3">
					<span>
						{user.following?.length}{" "}
						<span className="text-[#71767b]">following</span>
					</span>
					<span>
						{user.followers?.length}{" "}
						<span className="text-[#71767b]">followers</span>
					</span>
				</div>
				<div className="text-[#71767B] flex items-center gap-2 my-2 text-center">
					<i className="ri-calendar-2-line"></i>
					<span>
						Joined from {moment(user.createdAt).format("MMMM Do")}
					</span>
				</div>
			</div>
		</div>
	);
};

export default InformationFriendChat;
