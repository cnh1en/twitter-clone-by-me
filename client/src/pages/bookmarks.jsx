import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Bookmark from "../images/bookmark.png";
import { getBookmarks } from "../redux/bookmarkSlice";
import { getDataAPI } from "../utils/fetchData";
import Post from "../components/post/Post";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import Header from "../components/header/Header";

const Bookmarks = () => {
  const { auth, bookmark } = useSelector((state) => state);
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    setLoading(true);
    getDataAPI("/bookmarks", auth.token)
      .then((res) => {
        dispatch(getBookmarks(res.data.bookmarks));
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [auth.token, dispatch]);

  useEffect(() => {
    document.title = "Bookmarks";
  }, [page]);
  return (
    <div className="width-page h-screen overflow-auto scrollbar pb-8">
      <div className="hidden">
        <Header />
      </div>
      <div className="p-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20 dark:bg-white dark:bg-opacity-80">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="">
              <span className="font-bold text-[20px] text-white dark:text-black">
                Bookmarks
              </span>
              <div className="text-[13px] font-[400] text-[#71767b]">
                @{auth.user.username}
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : !bookmark.bookmarks.length ? (
        <div className="w-[320px] md:w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
          <img src={Bookmark} alt="chicken" className="object-cover" />
          <div>
            <h1 className="font-bold text-white text-[30px] dark:text-black">
              Save Tweets for later
            </h1>
            <p className="text-[#71767b] text-[15px]">
              Don’t let the good ones fly away! Bookmark Tweets to easily find
              them again in the future.
            </p>
          </div>
        </div>
      ) : (
        <div className="bookmarks divide-y-[1px] divide-[#2f3336] dark:divide-gray-200">
          {bookmark.bookmarks?.map((bookmark) => (
            <Post post={bookmark} key={bookmark._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
