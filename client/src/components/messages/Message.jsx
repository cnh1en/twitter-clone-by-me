import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import moment from "moment";

const Message = ({ message, left }) => {
	const { auth } = useSelector((state) => state);
	return (
		<div className="w-full">
			{left ? (
				<div className="py-2 mb-2 flex gap-1 items-center">
					<Avatar src={message.sender.avatar} width="w-8" height="h-8" />
					<div className="mr-auto w-3/4 flex justify-start items-center">
						{message.text && (
							<span className="px-3 py-2 rounded-xl bg-[#2F3336] text-left">
								{message.text}
								{message.media && (
									<img
										src={message.media}
										alt="media"
										className="max-w-[300px] object-cover rounded-xl"
									/>
								)}
							</span>
						)}
						{!message.text && (
							<img
								src={message.media}
								alt="media"
								className="max-w-[300px] object-cover rounded-xl"
							/>
						)}
						<span className="text-[12px] ml-2 text-[#71767b]">
							{moment(message.createdAt).format("LT")}
						</span>
					</div>
				</div>
			) : (
				<div className="ml-auto w-3/4 py-2 mb-2">
					<div className="flex justify-end items-center">
						<span className="text-[12px] mr-2 text-[#71767b]">
							{moment(message.createdAt).format("LT")}
						</span>
						{message.text && (
							<span className="px-3 py-2 rounded-xl bg-[#1D9BF0] text-left">
								{message.text}
								{message.media && (
									<img
										src={message.media}
										alt="media"
										className="max-w-[300px] object-cover rounded-xl"
									/>
								)}
							</span>
						)}
						{!message.text && (
							<img
								src={message.media}
								alt="media"
								className="max-w-[300px] object-cover rounded-xl"
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Message;
