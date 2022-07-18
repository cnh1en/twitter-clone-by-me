import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loading } from "../../redux/loadSlice";
import {
  addPosts,
  getPosts,
  updatePage,
  updateResult,
} from "../../redux/postSlice";
import Header from "../header/Header";
import Input from "../Input";
import Loading from "../Loading";
import LoadMoreBtn from "../LoadMoreBtn";
import Post from "../post/Post";

const Feed = () => {
  const { post, auth } = useSelector((state) => state);
  const param = useParams();
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    dispatch(addPosts({ page: post.page, limit: 5, token: auth.token }))
      .then(unwrapResult)
      .then((result) => {
        dispatch(updatePage());
        dispatch(updateResult(result.posts.length));
      });

    setLoad(false);
  };
  useEffect(() => {
    document.title = "Home / Twitter";
  }, [param]);

  useEffect(() => {
    if (auth.token) {
      dispatch(loading(true));
      dispatch(getPosts({ token: auth.token, limit: 5 }))
        .then(unwrapResult)
        .then((result) => {
          dispatch(updateResult(result.posts.length));
        });
      dispatch(loading(false));
    }
  }, [auth, dispatch]);

  useEffect(() => {
    dispatch(updatePage(2));
  }, []);

  return (
    <div className="width-page text-white min-h-screen overflow-y-auto scrollbar-thin z-10 pb-8 ">
      <Header />
      <Input animation={true} />
      {!post.loading ? (
        <div className="divide-y-[1px] divide-[#2F3336] border-t-[1px] border-color dark:divide-gray-200 dark:border-gray-200">
          {post.posts.map((post) => (
            <Post post={post} key={post._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}

      {!load && (
        <LoadMoreBtn
          handleLoadMore={handleLoadMore}
          page={post.page}
          load={load}
          result={post.result}
        />
      )}
    </div>
  );
};

export default Feed;
