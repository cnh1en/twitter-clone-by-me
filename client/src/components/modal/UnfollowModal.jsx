import React from "react";

const UnfollowModal = ({ username, setUnfollowModal, handleUnfollow }) => {
	return (
		<div className="absolute w-full h-full top-0 left-0 z-30 bg-black bg-transparent-config py-2 overflow-auto flex-center pointer-events-none">
			<div className="w-[350px] p-8 bg-black border-[1px] border-color rounded-2xl pointer-events-none">
				<div className="top">
					<h1 className="text-[20px] mb-2 font-bold">
						Unfollow @{username}
					</h1>
					<p className="text-[15px] text-[#71767b] text-left leading-[18px]">
						Their Tweets will no longer show up in your home timeline. You
						can still view their profile, unless their Tweets are
						protected.
					</p>
				</div>

				<div className="bottom mt-6">
					<div className="buttons flex flex-col gap-4">
						<button
							className="font-[700] text-[15px] rounded-full bg-white py-3 border-[1px] border-color pointer-events-auto text-black"
							onClick={() => {
								handleUnfollow();
								setUnfollowModal(false);
							}}
						>
							Unfollow
						</button>
						<button
							className="font-[700] text-[15px] rounded-full py-3 border-[1px] border-color pointer-events-auto"
							onClick={() => setUnfollowModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UnfollowModal;
