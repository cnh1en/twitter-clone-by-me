import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import ButtonFollow from "./ButtonFollow";

const Follow = ({ setShowFollow, tab, setTab }) => {
	// profile user
	const { profile } = useSelector((state) => state);
	return (
		<>
			<div className="width-page divide-y-[1px] divide-[#2F3336] z-50 bg-black">
				<div className="space-y-2">
					<div className="flex items-center justify-between sticky top-0 z-30 h-[53px] bg-transparent px-3">
						<div className="flex items-center gap-4">
							<span
								className="w-8 h-8 flex-center hover:hoverAnimation2"
								onClick={() => setShowFollow(false)}
							>
								<i className="ri-arrow-left-line text-xl cursor-pointer"></i>
							</span>
							<div className="flex flex-col">
								<span className="font-bold">
									{profile?.info.fullname}
								</span>
								<span className="text-[#71767b] text-[13px]">
									@{profile?.info.username}
								</span>
							</div>
						</div>
					</div>

					<div className="tabs flex h-[54px]">
						<span
							className="followers w-1/2 flex-center hover:bg-opacity-10 hover:bg-[#d9d9d9] cursor-pointer relative"
							onClick={() => setTab(true)}
						>
							Followers
							{tab && (
								<span className="absolute bottom-0 h-1 min-w-[56px] bg-[#1D9BF0] rounded-full"></span>
							)}
						</span>
						<span
							className="following w-1/2 flex-center hover:bg-opacity-10 hover:bg-[#d9d9d9] cursor-pointer relative"
							onClick={() => setTab(false)}
						>
							Following
							{!tab && (
								<span className="absolute bottom-0 h-1 min-w-[56px] bg-[#1D9BF0] rounded-full"></span>
							)}
						</span>
					</div>
				</div>
				{tab ? (
					<div className="followers p-3 space-y-3">
						{profile?.info.followers?.map((follower) => (
							<div className="flex gap-2" key={follower._id}>
								<Avatar
									width="w-12"
									height="h-12"
									src={follower.avatar}
								/>

								<div className="flex flex-col gap-1 grow justify-center">
									<div className="flex justify-between">
										<div className="name flex flex-col">
											<Link to={`/profile/${follower._id}`}>
												<h3 className="font-bold hover:underline">
													{follower.fullname}
												</h3>
												<span className="text-[15px] text-[#71767b]">
													@{follower.username}
												</span>
											</Link>
										</div>

										<ButtonFollow user={follower} />
									</div>

									<div className="story font-[300]">
										{follower.story}
									</div>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="following p-3 space-y-3">
						{profile?.info.following?.map((following) => (
							<div className="flex gap-2" key={following._id}>
								<Avatar
									width="w-12"
									height="h-12"
									src={following.avatar}
								/>

								<div className="flex flex-col gap-1 grow justify-center">
									<div className="flex justify-between">
										<div className="name flex flex-col">
											<Link to={`/profile/${following._id}`}>
												<h3 className="font-bold hover:underline">
													{following.fullname}
												</h3>
												<span className="text-[15px] text-[#71767b]">
													@{following.username}
												</span>
											</Link>
										</div>

										<ButtonFollow user={following} />
									</div>

									<div className="story font-[300]">
										{following.story}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Follow;
