import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateAuthUser } from "../redux/authSlice";
import { myFollow, myUnfollow } from "../redux/profileSlice";
import { postDataAPI } from "../utils/fetchData";

const ButtonFollow = ({ user }) => {
	const { auth, socket } = useSelector((state) => state);
	const [showFollow, setShowFollow] = useState(false);
	const dispatch = useDispatch();
	const { id, page } = useParams();

	const handleFollow = async () => {
		try {
			// dispatch(myFollow(user)); // FOLLOW IN FOLLOW PAGE -> following of auth.user  += 1
			dispatch(
				updateAuthUser({ following: [...auth.user.following, user] })
			);
			if (id === auth.user._id) {
				dispatch(myFollow(user));
			}
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
	const handleUnfollow = async () => {
		try {
			if (id === auth.user._id) {
				dispatch(myUnfollow(user));
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
		if (!auth.user.following.every((item) => item._id !== user._id)) {
			setShowFollow(true);
		} else {
			setShowFollow(false);
		}
	}, [auth.user.following, user._id]);

	return (
		<>
			{auth.user._id !== user._id &&
				(showFollow ? (
					<button
						className="follow px-3 py-1 font-[500] rounded-full border-[1px] border-color block ml-auto my-auto text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
						onClick={handleUnfollow}
					>
						Unfollow
					</button>
				) : (
					<button
						className="follow px-3 py-1 font-[500] rounded-full border-[1px] border-color block ml-auto my-auto text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
						onClick={handleFollow}
					>
						Follow
					</button>
				))}
		</>
	);
};

export default ButtonFollow;
