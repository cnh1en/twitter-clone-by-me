import React from "react";
import { useSelector } from "react-redux";
import Post from "../post/Post";

const ProfileBody = ({ changeTab }) => {
	const { profile, loading } = useSelector((state) => state);

	return (
		<div className="divide-y-[1px] divide-[#2F3336] border-t-[1px] border-color">
			{changeTab === "tweets" &&
				profile.posts.map((post) => <Post post={post} key={post._id} />)}
			{changeTab === "likes" &&
				(profile.likePosts.length ? (
					profile.likePosts.map((post) => (
						<Post post={post} key={post._id} />
					))
				) : (
					<div className="md:w-[400px] w-[280px] mx-auto my-8">
						<h1 className="font-bold text-white text-[30px]">
							You don’t have any likes yet
						</h1>
						<p className="text-[#71767b] text-[15px]">
							Tap the heart on any Tweet to show it some love. When you
							do, it’ll show up here.
						</p>
					</div>
				))}
			{changeTab === "retweets" &&
				profile.retweets.map((post) => <Post post={post} key={post._id} />)}
		</div>
	);
};

export default ProfileBody;
