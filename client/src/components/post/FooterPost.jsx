import {
  ChatIcon,
  HeartIcon,
  RefreshIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import React from "react";
import ReactTooltip from "react-tooltip";

const FooterPost = ({
  post,
  setShowReply,
  retweet,
  handleUnretweet,
  handleRetweet,
  like,
  handleUnlike,
  handleLike,
  setShareModal,
}) => {
  return (
    <div className="post-footer flex px-10 md:px-12 lg:pr-28 lg:pl-14 justify-between my-3 dark:text-gray-600">
      <div
        className="flex items-center space-x-1 group cursor-pointer"
        data-tip
        data-for="commentTip"
        onClick={() => setShowReply(true)}
      >
        <div className="icon group-hover:bg-[#1d9bf0]/10 p-2 rounded-full">
          <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>

        <ReactTooltip
          id="commentTip"
          place="top"
          effect="solid"
          delayShow={1000}
        >
          Comment
        </ReactTooltip>
        <span className="group-hover:text-[#1d9bf0] text-sm">
          {post?.comments?.length}
        </span>
      </div>

      <div
        className="flex items-center space-x-1 group cursor-pointer"
        data-tip
        data-for="retweetTip"
      >
        <div className="group-hover:bg-green-600/10 p-2 rounded-full">
          {retweet ? (
            <RefreshIcon
              className="h-5 text-green-600"
              onClick={handleUnretweet}
            />
          ) : (
            <RefreshIcon
              className="h-5 group-hover:text-green-600"
              onClick={handleRetweet}
            />
          )}
        </div>
        <span
          className={`group-hover:text-green-600 ${
            retweet && "text-green-600"
          }`}
        >
          {post?.retweet?.length}
        </span>
        <ReactTooltip
          id="retweetTip"
          place="top"
          effect="solid"
          delayShow={1000}
        >
          Retweet
        </ReactTooltip>
      </div>

      <div
        className="flex items-center space-x-1 group cursor-pointer"
        data-tip
        data-for="likeTip"
      >
        <div className="icon group-hover:bg-pink-600/10 p-2 rounded-full">
          {like ? (
            <HeartIconFilled
              className="h-5 text-pink-600"
              onClick={handleUnlike}
            />
          ) : (
            <HeartIcon
              className="h-5 group-hover:text-pink-600"
              onClick={handleLike}
            />
          )}
        </div>

        <span
          className={`group-hover:text-pink-600 ${like && "text-pink-600"}`}
        >
          {post?.likes?.length}
        </span>

        <ReactTooltip id="likeTip" place="top" effect="solid" delayShow={1000}>
          Like
        </ReactTooltip>
      </div>
      <div
        className="flex items-center space-x-1 group cursor-pointer"
        data-tip
        data-for="shareTip"
      >
        <div
          className="icon group-hover:bg-[#1d9bf0]/10 p-2 rounded-full"
          onClick={() => setShareModal(true)}
        >
          <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
        <ReactTooltip id="shareTip" place="top" effect="solid" delayShow={1000}>
          Share
        </ReactTooltip>
      </div>
    </div>
  );
};

export default FooterPost;
