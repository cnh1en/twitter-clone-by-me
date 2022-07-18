import React from "react";
import { useSelector } from "react-redux";
import Post from "../post/Post";

const ProfileBody = ({ changeTab }) => {
  const { profile } = useSelector((state) => state);

  const setTab = (profile) => {
    switch (changeTab) {
      case "tweets":
        return profile.posts.map((post) => <Post post={post} key={post._id} />);
      case "retweets":
        return profile.retweets.map((post) => (
          <Post post={post} key={post._id} />
        ));
      default:
        return profile.likePosts.length ? (
          profile.likePosts.map((post) => <Post post={post} key={post._id} />)
        ) : (
          <div className="md:w-[400px] w-[280px] mx-auto my-8">
            <h1 className="font-bold text-white text-[30px] dark:text-black">
              You don’t have any likes yet
            </h1>
            <p className="text-[#71767b] text-[15px] dark:text-black">
              Tap the heart on any Tweet to show it some love. When you do,
              it’ll show up here.
            </p>
          </div>
        );
    }
  };
  return (
    <div className="divide-y divide-[#2F3336] border-t border-color dark:border-gray-200 dark:divide-gray-200">
      {setTab(profile)}
    </div>
  );
};

export default ProfileBody;
