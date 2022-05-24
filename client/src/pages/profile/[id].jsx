import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Follow from "../../components/Follow";
import ProfileBody from "../../components/profile/ProfileBody";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { updateAuthUser } from "../../redux/authSlice";
import { loading } from "../../redux/loadSlice";
import {
	follow,
	getLikePostsProfile,
	getPostsProfile,
	getProfile,
	getRetweetsProfile,
	unfollow,
} from "../../redux/profileSlice";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

const Profile = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { auth, profile, callback, socket } = useSelector((state) => state);
	const dispatch = useDispatch();
	// STATE
	const [user, setUser] = useState({});
	const [editProfile, setEditProfile] = useState(false);
	const containerRef = useRef(null);
	const followRef = useRef(null);
	const [show, setShow] = useState(false);
	const [showFollow, setFollow] = useState(false);
	const [showButtonFollow, setShowButtonFollow] = useState(false);
	const [tab, setTab] = useState(false);
	const [changeTab, setChangeTab] = useState("tweets");
	// HANDLE
	const handleScroll = () => {
		if (followRef.current) {
			if (containerRef.current.scrollTop >= 252) {
				setShow(true);
			} else {
				setShow(false);
			}
		}
	};

	const handleFollow = async () => {
		try {
			dispatch(
				updateAuthUser({ following: [...auth.user.following, user] })
			);
			dispatch(follow(auth.user)); // FOLLOW IN PROFILE -> followers of profile += 1
			await postDataAPI(`user/follow/${id}`, null, auth.token);
			setUser({ ...user, followers: [...user.followers, auth.user] });
			setFollow(true);

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
			dispatch(
				updateAuthUser({
					following: auth.user.following.filter(
						(item) => item._id !== user._id
					),
				})
			);
			dispatch(unfollow(auth.user)); // UNFOLLOW IN PROFILE -> followers of profile -= 1
			await postDataAPI(`user/unfollow/${id}`, null, auth.token);

			setUser({
				...user,
				followers: user.followers.filter(
					(item) => item._id !== auth.user._id
				),
			});

			setFollow(false);
		} catch (error) {
			console.log(error);
		}
	};

	/// EFFECT

	useEffect(() => {
		if (id) {
			dispatch(loading(true));
			setChangeTab("tweets");
			getDataAPI(`user/${id}`, auth.token)
				.then((res) => {
					setUser(res.data.user);
					dispatch(getProfile(res.data.user));
					document.title = `${res.data.user.fullname} (@${res.data.user.username}) / Twitter`;
					dispatch(loading(false));
					setShowButtonFollow(false);
				})
				.catch((error) => console.log(error));
		}
	}, [id, auth.token, dispatch, callback]);

	useEffect(() => {
		if (id === auth.user._id) {
			auth?.user && setUser(auth.user);
		}
	}, [auth.user, id]);

	useEffect(() => {
		if (
			id !== auth.user._id &&
			!auth.user.following.every((item) => item._id !== id)
		) {
			setFollow(true);
		} else {
			setFollow(false);
		}
	}, [id, auth.user, user.followers]);

	useEffect(() => {
		if (id) {
			dispatch(loading(true));
			Promise.all([
				getDataAPI(`${id}/posts`, auth.token),
				getDataAPI("likePosts", auth.token),
				getDataAPI(`retweets/${id}`, auth.token),
			])
				.then((values) => {
					dispatch(getPostsProfile(values[0].data.posts));
					dispatch(getLikePostsProfile(values[1].data.posts));
					dispatch(getRetweetsProfile(values[2].data.retweets));
					dispatch(loading(false));
				})
				.catch((error) => console.log(error));
		}
	}, [id, auth.token, dispatch, callback]);

	return (
		<div
			className="width-page overflow-auto scrollbar bg-black z-30"
			ref={containerRef}
			onScroll={handleScroll}
		>
			{!showButtonFollow && (
				<div className="profile relative z-20">
					<div className="flex items-center justify-between sticky top-0 z-30 h-[53px] bg-transparent px-3 py-4 text-[20px]">
						<div className="flex items-center gap-4">
							<span className="w-8 h-8 flex-center hover:hoverAnimation2">
								<i
									className="ri-arrow-left-line text-xl cursor-pointer font-bold"
									onClick={() => navigate(-1)}
								></i>
							</span>
							<span className="font-bold">{user.fullname}</span>
						</div>

						{auth.user._id !== id &&
							(!showFollow ? (
								<button
									className={`follow px-3 py-1 font-[500] rounded-full border-[1px] border-color text-sm text-black bg-[#EFF3F4] hover:bg-[#D7DBDC] ${
										show ? "block" : "hidden"
									}`}
									ref={followRef}
									onClick={handleFollow}
								>
									Follow
								</button>
							) : (
								<button
									className={`follow px-3 py-1 font-[500] rounded-full border-[1px] border-color text-sm text-black bg-[#EFF3F4] hover:bg-[#D7DBDC] ${
										show ? "block" : "hidden"
									}`}
									ref={followRef}
									onClick={handleUnfollow}
								>
									Unfollow
								</button>
							))}
					</div>

					<ProfileHeader
						editProfile={editProfile}
						setEditProfile={setEditProfile}
						id={id}
						follow={showFollow}
						setFollow={setFollow}
						handleFollow={handleFollow}
						handleUnfollow={handleUnfollow}
						setShowFollow={setShowButtonFollow}
						tab={tab}
						setTab={setTab}
						changeTab={changeTab}
						setChangeTab={setChangeTab}
					/>
					<ProfileBody changeTab={changeTab} />
				</div>
			)}

			{showButtonFollow && (
				<Follow
					id={id}
					setShowFollow={setShowButtonFollow}
					tab={tab}
					setTab={setTab}
				/>
			)}
		</div>
	);
};

export default Profile;
