import React from "react";
import { useNavigate } from "react-router";
import Avatar from "../Avatar";
import Input from "../Input";
import moment from "moment";
import LoadingLine from "../LoadingLine";
import { useState } from "react";

const ReplyModal = ({ post, setShowReply }) => {
  const [startAnimation, setStartAnimation] = useState(false);
  return (
    <div className="fixed w-full h-screen top-0 left-0 z-30 bg-black md:bg-transparent-config pb-2 overflow-auto">
      <div className="md:hidden">{startAnimation && <LoadingLine />}</div>
      <div className="tweet-head text-white flex flex-col justify-between px-3 md:hidden">
        <span className="w-10 h-10 rounded-full flex-center hover:hoverAnimation2 mb-4 ml-2 cursor-pointer">
          <i
            className="ri-arrow-left-line text-2xl max-w-max"
            onClick={() => setShowReply(false)}
          ></i>
        </span>

        <div className="space-y-2">
          <div className="px-4 flex gap-2">
            <Avatar width="w-12" height="h-12" src={post.user.avatar} />
            <div className="flex gap-1 items-center">
              <span className="font-[500]">{post.user.fullname}</span>
              <span className="text-[#71767B] font-[400]">
                @{post.user.username}
              </span>
              <span className="flex-center text-[#71767B]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                </svg>
              </span>
              <span className="text-[#71767B] font-[400]">
                {moment(post.createdAt).fromNow(true)}
              </span>
            </div>
          </div>

          <div className="flex gap-8 py-3">
            <span className="ml-[37px] h-auto w-[1px] bg-[#71767B]"></span>
            <span>{post.content}</span>
          </div>

          <Input
            replyPost={post}
            setShowReply={setShowReply}
            setStartAnimation={setStartAnimation}
          />
        </div>
      </div>

      <div className="tweet-body text-white md:md-tweet-post w-[600px] hidden md:block bg-black z-30 rounded-2xl">
        <div className="hidden md:block absolute top-0 left-2 right-2">
          {startAnimation && <LoadingLine />}
        </div>
        <div className="px-3 py-4 rounded-2xl bg-black dark:bg-white">
          <span className="w-10 h-10 rounded-full flex-center hover:hoverAnimation2 mb-4 ml-2 cursor-pointer">
            <i
              className="ri-close-line text-2xl max-w-max text-white dark:text-black"
              onClick={() => setShowReply(false)}
            ></i>
          </span>
          <div className="space-y-2">
            <div className="px-4 flex gap-2">
              <Avatar width="w-12" height="h-12" src={post.user.avatar} />
              <div className="flex gap-1 items-center">
                <span className="font-[500] text-white dark:text-black">
                  {post.user.fullname}
                </span>
                <span className="text-[#71767B] font-[400]">
                  @{post.user.username}
                </span>
                <span className="flex-center text-[#71767B]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-dot"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                  </svg>
                </span>
                <span className="text-[#71767B] font-[400]">
                  {moment(post.createdAt).fromNow(true)}
                </span>
              </div>
            </div>

            <div className="flex gap-8 py-3">
              <span className="ml-[37px] h-auto w-[1px] bg-[#71767B]"></span>
              <span className="text-white dark:text-black">{post.content}</span>
            </div>

            <Input
              replyPost={post}
              setShowReply={setShowReply}
              setStartAnimation={setStartAnimation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyModal;
