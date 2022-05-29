import { MailIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import ReactTooltip from "react-tooltip";
import { useNavigate } from "react-router";
import { patchDataAPI } from "../../utils/fetchData";
import { updateAuthUser, updateMute } from "../../redux/authSlice";
import UnfollowModal from "../modal/UnfollowModal";

const ProfileHeader = ({
	editProfile,
	setEditProfile,
	id,
	handleFollow,
	handleUnfollow,
	follow,
	setShowFollow,
	tab,
	setTab,
	changeTab,
	setChangeTab,
}) => {
	const { auth, profile } = useSelector((state) => state);
	const navigate = useNavigate();
	const [mute, setMute] = useState(false);
	const [unfollowModal, setUnfollowModal] = useState(false);
	const dispatch = useDispatch();

	const handleMute = async () => {
		try {
			setMute(true);
			dispatch(
				updateAuthUser({
					mute: [...auth.user.mute, profile.info._id],
				})
			);
			await patchDataAPI(`user/mute/${profile.info._id}`, null, auth.token);
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnmute = async () => {
		try {
			setMute(false);
			dispatch(
				updateAuthUser({
					mute: auth.user.mute.filter((item) => item !== profile.info._id),
				})
			);
			await patchDataAPI(
				`user/unmute/${profile.info._id}`,
				null,
				auth.token
			);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (
			auth.user.mute.length > 0 &&
			!auth.user.mute.every((item) => item !== profile.info._id)
		) {
			setMute(true);
		} else setMute(false);
	}, [auth.user.mute, profile.info._id]);
	return (
		<div className="profile-head">
			<div className="">
				<div className="img-background relative">
					<img
						src={profile?.info.background}
						alt="background"
						className="h-[200px] w-full object-cover"
					/>
					<Avatar
						width="w-[135px]"
						height="h-[135px]"
						src={profile?.info.avatar}
						positon="absolute -bottom-[72.5px] left-4"
					/>
				</div>
				<div className="flex justify-end mr-4 mt-4 items-center gap-3">
					{auth.user._id !== id &&
						!auth.user.following.every((item) => item._id !== id) &&
						(!mute ? (
							<div
								className="w-[34px] h-[34px] flex-center rounded-full border-[1px] border-color cursor-pointer hover:bg-[#eff3f4]/10"
								data-tip
								data-for="notifyTip"
								onClick={handleMute}
							>
								<i className="ri-notification-line text-xl"></i>
								<ReactTooltip
									id="notifyTip"
									place="bottom"
									effect="solid"
									delayShow={500}
								>
									Notify
								</ReactTooltip>
							</div>
						) : (
							<div
								className="w-[34px] h-[34px] flex-center rounded-full border-[1px] border-color cursor-pointer hover:bg-[#eff3f4]/10"
								data-tip
								data-for="notifyTip"
								onClick={handleUnmute}
							>
								<i className="ri-notification-off-line text-xl"></i>
								<ReactTooltip
									id="notifyTip"
									place="bottom"
									effect="solid"
									delayShow={500}
								>
									Turn on notifications
								</ReactTooltip>
							</div>
						))}

					{auth.user._id !== id && (
						<div
							className="w-[34px] h-[34px] flex-center rounded-full border-[1px] border-color cursor-pointer hover:bg-[#eff3f4]/10"
							data-tip
							data-for="messagesTip"
							onClick={() => navigate(`/messages/${id}`)}
						>
							<MailIcon className="h-5" />
							<ReactTooltip
								id="messagesTip"
								place="bottom"
								effect="solid"
								delayShow={500}
							>
								Messages
							</ReactTooltip>
						</div>
					)}

					{auth.user._id === id ? (
						<button
							className="edit-profile px-3 py-1 font-[500] rounded-full border-[1px] border-color block   bg-black hover:bg-[#eff3f41a]"
							onClick={() => setEditProfile(!editProfile)}
						>
							Edit profile
						</button>
					) : follow ? (
						<button
							className="unfollow px-3 py-1 font-[500] rounded-full border-[1px] border-color block   text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
							onClick={() => setUnfollowModal(true)}
						>
							Unfollow
						</button>
					) : (
						<button
							className="follow px-3 py-1 font-[500] rounded-full border-[1px] border-color block   text-black bg-[#EFF3F4] hover:bg-[#D7DBDC]"
							onClick={handleFollow}
						>
							Follow
						</button>
					)}
				</div>

				<div className="profile mt-[42px] mx-5">
					<h2 className="font-bold">{profile?.info.fullname}</h2>
					<span className="text-[#71767B]">@{profile?.info.username}</span>

					<div className="mt-3 flex flex-col  gap-2">
						<div className="story font-[300]">{profile?.info.story}</div>
						{profile?.info.website && (
							<div className="website flex gap-2">
								<i className="ri-links-line"></i>
								<a
									href={profile?.info.website}
									target="_blank"
									rel="noreferrer"
									className="text-[#1D9BF0] hover:underline"
								>
									{profile?.info.website}
								</a>
							</div>
						)}
					</div>
					<div className="flex gap-4">
						{profile.address && (
							<div className="text-[#71767B] flex items-center gap-2 my-2">
								<i className="ri-map-pin-line"></i>
								<span>{profile?.info.address}</span>
							</div>
						)}
						<div className="text-[#71767B] flex items-center gap-2 my-2">
							<i className="ri-calendar-2-line"></i>
							<span>
								Joined{" "}
								{moment(profile?.info.createdAt).format("MMMM Do")}
							</span>
						</div>
					</div>
					<div className="follow flex gap-3">
						<span
							// to={`/profile/${id}/following`}
							onClick={() => {
								setShowFollow(true);
								setTab(false);
							}}
							className="following flex items-center gap-1"
						>
							{profile?.info.following?.length}
							<span className="text-[#71767B]">Following</span>
						</span>
						<span
							// to={`/profile/${id}/followers`}
							onClick={() => {
								setShowFollow(true);
								setTab(true);
							}}
							className="followers flex items-center gap-1"
						>
							{profile?.info.followers?.length}
							<span className="text-[#71767B]">Follwers</span>
						</span>
					</div>
				</div>

				{editProfile && auth.user._id === id && (
					<EditProfile setEditProfile={setEditProfile} />
				)}
				<div className="tabs flex h-[54px] mt-4">
					<span
						className={`w-full flex-center hover:bg-opacity-10 hover:bg-[#d9d9d9] cursor-pointer relative font-bold text-[#71767b] ${
							changeTab === "tweets" && "text-white"
						}`}
						onClick={() => setChangeTab("tweets")}
					>
						Tweets
						{changeTab === "tweets" && (
							<span className="absolute bottom-0 h-1 min-w-[56px] bg-[#1D9BF0] rounded-full"></span>
						)}
					</span>
					<span
						className={`w-full flex-center hover:bg-opacity-10 hover:bg-[#d9d9d9] cursor-pointer relative font-bold text-[#71767b] ${
							changeTab === "retweets" && "text-white"
						}`}
						onClick={() => setChangeTab("retweets")}
					>
						Retweets
						{changeTab === "retweets" && (
							<span className="absolute bottom-0 h-1 min-w-[56px] bg-[#1D9BF0] rounded-full"></span>
						)}
					</span>
					{auth.user._id === id && (
						<span
							className={`w-full flex-center hover:bg-opacity-10 hover:bg-[#d9d9d9] cursor-pointer relative font-bold text-[#71767b] ${
								changeTab === "likes" && "text-white"
							}`}
							onClick={() => setChangeTab("likes")}
						>
							Likes
							{changeTab === "likes" && (
								<span className="absolute bottom-0 h-1 min-w-[56px] bg-[#1D9BF0] rounded-full"></span>
							)}
						</span>
					)}
				</div>
			</div>

			{unfollowModal && (
				<div className="fixed top-0 left-0 w-full h-screen cursor-default z-30">
					<UnfollowModal
						username={profile.info.username}
						handleUnfollow={handleUnfollow}
						setUnfollowModal={setUnfollowModal}
					/>
				</div>
			)}
		</div>
	);
};

export default ProfileHeader;
