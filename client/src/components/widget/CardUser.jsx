import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { updateAuthUser } from "../../redux/authSlice";
import { myFollow, myUnfollow } from "../../redux/profileSlice";
import { postDataAPI } from "../../utils/fetchData";
import Avatar from "../Avatar";

const CardUser = ({ item }) => {
	const [showFollow, setShowFollow] = useState(false);
	const { auth, profile, socket } = useSelector((state) => state);
	const dispatch = useDispatch();
	const { id, page } = useParams();
	// HANDLE
	const handleFollow = async (user) => {
		try {
			setShowFollow(true);
			if (id === auth.user._id) {
				dispatch(myFollow(item));
			}
			dispatch(
				updateAuthUser({ following: [...auth.user.following, user] })
			);
			await postDataAPI(`user/follow/${user._id}`, null, auth.token);

			const msg = {
				id: user._id,
				text: "followed you",
				recipients: [user._id],
				url: `/profile/${auth.user._id}`,
				content: "",
				image: "",
				user: auth.user,
				isRead: false,
				action: "follow",
			};
			const result = await postDataAPI("notify", msg, auth.token);
			socket.socketClient.emit("createNotify", {
				msg: { ...msg, _id: result.data.notify._id },
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnfollow = async (user) => {
		try {
			setShowFollow(false);
			if (id === auth.user._id) {
				dispatch(myUnfollow(item));
			}
			dispatch(
				updateAuthUser({
					following: auth.user.following.filter(
						(item) => item._id !== user._id
					),
				})
			);

			await postDataAPI(`user/unfollow/${user._id}`, null, auth.token);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (
			auth.user?.following.length > 0 &&
			!auth.user.following.every((following) => following._id !== item._id)
		) {
			setShowFollow(true);
		} else setShowFollow(false);
	}, [auth.user.following, item._id]);
	return (
		<div
			className="text-white flex justify-between items-center"
			key={item._id}
		>
			<div className="flex items-center gap-2">
				<Avatar src={item.avatar} width="w-12" height="h-12" />
				<Link
					to={`/profile/${item._id}`}
					className="flex flex-col items-center"
				>
					<span className="text-[15px]">{item.fullname}</span>
					<span className="text-[13px] text-[#71767b]">
						@{item.username}
					</span>
				</Link>
			</div>

			<>
				{showFollow ? (
					<button
						className="follow px-3 py-1 font-[500] rounded-full border-[1px] border-color block ml-auto my-auto text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
						onClick={() => handleUnfollow(item)}
					>
						Following
					</button>
				) : (
					<button
						className="follow px-3 py-1 font-[500] rounded-full border-[1px] border-color block ml-auto my-auto text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
						onClick={() => handleFollow(item)}
					>
						Follow
					</button>
				)}
			</>
		</div>
	);
};

export default CardUser;
