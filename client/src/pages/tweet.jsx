import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import LoadingLine from "../components/LoadingLine";

const Tweet = () => {
  const navigate = useNavigate();
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <div className="fixed w-full h-screen top-0 left-0 z-30 bg-black md:bg-transparent-config pb-2 overflow-auto">
      <div className="block md:hidden">{startAnimation && <LoadingLine />}</div>
      <div className="tweet-head text-white mt-4 px-3 md:hidden space-y-2">
        <i
          className="ri-arrow-left-line text-xl cursor-pointer hover:hoverAnimation2 p-2 text-white dark:text-black"
          onClick={() => navigate(-1)}
        ></i>
        <Input back={true} setStartAnimation={setStartAnimation} />
      </div>

      <div className="tweet-body text-white md:md-tweet-post w-[600px] hidden md:block bg-black dark:bg-white dark:border dark:border-gray-300 z-30 rounded-2xl pt-[1px]">
        <div className="md:block absolute top-0 left-2 right-2">
          {startAnimation && <LoadingLine />}
        </div>
        <div className="px-3 py-4 rounded-2xl flex flex-col">
          <i
            className="ri-close-line text-2xl mb-2 px-2 py-1 hover:hoverAnimation2 max-w-max text-white dark:text-black"
            onClick={() => navigate(-1)}
          ></i>
          <Input back={true} setStartAnimation={setStartAnimation} />
        </div>
      </div>
    </div>
  );
};

export default Tweet;
