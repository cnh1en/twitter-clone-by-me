import moment from "moment";
import React from "react";
import Avatar from "./Avatar";

const InfoTip = ({ post }) => {
	return (
		<div className="flex flex-col gap-2">
			<div className="flex gap-2">
				<Avatar width="w-12" height="h-12" src={post.user.avatar} />
				<div className="flex flex-col">
					<span className="font-[500]">{post.user.fullname}</span>
					<span className="text-[#71767B] font-[400]">
						@{post.user.username}
					</span>
				</div>
			</div>
			<div className="text-[#71767B] flex items-center gap-2 font-[400] text-[15px]">
				<i className="ri-calendar-2-line"></i>
				<span>Joined {moment(post.user.createdAt).format("MMMM Do")}</span>
			</div>
			<div className="story font-[300]">{post.user.story}</div>
		</div>
	);
};

export default InfoTip;
