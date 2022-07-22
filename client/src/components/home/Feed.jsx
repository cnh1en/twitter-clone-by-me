import React, { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../header/Header";
import InfiniteListPost from "../infinite/InfiniteList";
import Input from "../Input";

const Feed = () => {
  const param = useParams();

  useEffect(() => {
    document.title = "Home / Twitter";
  }, [param]);

  return (
    <div className="width-page text-white min-h-screen overflow-y-auto z-10 pb-8 h-screen scrollbar-thin">
      <Header />
      <Input animation />
      <InfiniteListPost />
    </div>
  );
};

export default Feed;
