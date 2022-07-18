import { DotsHorizontalIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updatePostInBookmarks } from "../../redux/bookmarkSlice";
import { openModal } from "../../redux/modalSlice";
import {
  likeComment,
  likeSelectedPost,
  retweetComment,
  shareSelectedPost,
  unlikeComment,
  unlikeSelectedPost,
  unretweetComment,
  unshareSelectedPost,
} from "../../redux/postSelectedSlice";
import {
  likePost,
  retweetPost,
  unlikePost,
  unretweetPost,
} from "../../redux/postSlice";
import {
  likePostProfile,
  retweetProfile,
  unlikePostProfile,
  unretweetPostProfile,
} from "../../redux/profileSlice";
import { postDataAPI } from "../../utils/fetchData";
import Avatar from "../Avatar";
import DisplayImagesPost from "../DisplayImagesPost";
import InfoTip from "../InfoTip";
import PhotosSlideModal from "../modal/PhotosSlideModal";
import PostOptionModal from "../modal/PostOptionModal";
import ReplyModal from "../modal/ReplyModal";
import ShareModal from "../modal/ShareModal";
import FooterPost from "./FooterPost";

const Post = ({ post }) => {
  const { auth, modal, socket } = useSelector((state) => state);
  const { page, id } = useParams();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [retweet, setRetweet] = useState(false);
  const [showOptionPostModal, setShowOptionPostModal] = useState(false);
  const [showInfoTip, setShowInfoTip] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [openPhotosSlide, setOpenPhotosSlide] = useState(false);
  const [selectImage, setSelectImage] = useState(0);

  const dotRef = useRef(null);
  const modalRef = useRef(null);
  const infoTip = useRef(null);
  const photosRef = useRef(null);
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      setLike(true);
      if (page === "profile") {
        dispatch(
          likePostProfile({
            post: {
              ...post,
              likes: [...post.likes, auth.user._id],
            },
            socket: socket,
          })
        );
      }
      if (page === "post" && id === post._id) {
        dispatch(likeSelectedPost(auth.user._id));
      } else if (page === "post" && id !== post._id) {
        // like comment
        dispatch(likeComment({ id: post._id, like: auth.user._id }));
      } else if (page === "bookmarks") {
        const newPost = { ...post, likes: [...post.likes, auth.user._id] };
        dispatch(updatePostInBookmarks(newPost));
      }

      dispatch(likePost({ id: post._id, like: auth.user._id, socket }));
      await postDataAPI(`post/${post._id}/like`, null, auth.token);
      socket.socketClient.emit("likePost", { like: auth.user, post });

      const msg = {
        id: post._id,
        text: "liked a post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: "",
        image: post.images.length ? post.images[0].url : "",
        user: auth.user,
        isRead: false,
        action: "like",
      };
      /// SOCKET
      const result = await postDataAPI("notify", msg, auth.token);
      if (result.data.status) {
        socket.socketClient.emit("createNotify", {
          msg: result.data.notify,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnlike = async () => {
    try {
      setLike(false);
      if (page === "profile") {
        dispatch(
          unlikePostProfile({
            ...post,
            likes: post.likes.filter((item) => item !== auth.user._id),
          })
        );
      }
      if (page === "post" && id === post._id) {
        dispatch(unlikeSelectedPost(auth.user._id));
      } else if (page === "post" && id !== post._id) {
        dispatch(unlikeComment({ id: post._id, like: auth.user._id }));
      } else if (page === "bookmarks") {
        const newPost = {
          ...post,
          likes: post.likes.filter((item) => item !== auth.user._id),
        };
        dispatch(updatePostInBookmarks(newPost));
      }

      dispatch(unlikePost({ id: post._id, like: auth.user._id }));
      await postDataAPI(`post/${post._id}/unlike`, null, auth.token);
      //SOCKET
      socket.socketClient.emit("unlikePost", { like: auth.user, post });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRetweet = async () => {
    try {
      setRetweet(true);
      if (page === "profile") {
        dispatch(
          retweetProfile({
            ...post,
            retweet: [...post.retweet, auth.user._id],
          })
        );
      }

      if (page === "post" && id === post._id) {
        dispatch(shareSelectedPost(auth.user._id));
      } else if (page === "post" && id !== post._id) {
        dispatch(retweetComment({ id: post._id, retweet: auth.user._id }));
      } else if (page === "bookmarks") {
        const newPost = {
          ...post,
          retweet: [...post.retweet, auth.user._id],
        };
        dispatch(updatePostInBookmarks(newPost));
      }
      dispatch(retweetPost({ id: post._id, retweet: auth.user._id }));
      socket.socketClient.emit("retweetPost", {
        post,
        retweet: auth.user._id,
      });
      await postDataAPI(`post/${post._id}/retweet`, null, auth.token);

      const msg = {
        id: post._id,
        text: "retweet your post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: "",
        image: post.images.length ? post.images[0].url : "",
        user: auth.user,
        isRead: false,
        action: "retweet",
      };
      /// SOCKET
      const result = await postDataAPI("notify", msg, auth.token);
      if (result.data.status) {
        socket.socketClient.emit("createNotify", {
          msg: result.data.notify,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnretweet = async () => {
    try {
      setRetweet(false);
      if (page === "profile") {
        dispatch(
          unretweetPostProfile({
            ...post,
            retweet: post.retweet.filter((item) => item !== auth.user._id),
          })
        );
      }
      if (page === "post" && id === post._id) {
        dispatch(unshareSelectedPost(auth.user._id));
      } else if (page === "post" && id !== post._id) {
        dispatch(unretweetComment({ id: post._id, retweet: auth.user._id }));
      } else if (page === "bookmarks") {
        const newPost = {
          ...post,
          retweet: post.retweet.filter((item) => item !== auth.user._id),
        };
        dispatch(updatePostInBookmarks(newPost));
      }
      dispatch(unretweetPost({ id: post._id, retweet: auth.user._id }));
      socket.socketClient.emit("unretweetPost", {
        post,
        retweet: auth.user._id,
      });
      await postDataAPI(`post/${post._id}/unretweet`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseOver = (e) => {
    setShowInfoTip(true);
  };
  const handleMouseOut = (e) => {
    setShowInfoTip(false);
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`/post/${post._id}`);
  };
  useEffect(() => {
    if (
      post.likes?.length > 0 &&
      !post.likes?.every((item) => item !== auth.user._id)
    ) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [auth.user._id, post.likes]);

  useEffect(() => {
    if (
      post.retweet?.length > 0 &&
      !post?.retweet?.every((item) => item !== auth.user._id)
    ) {
      setRetweet(true);
    } else {
      setRetweet(false);
    }
  }, [auth.user._id, post.retweet]);

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (
        !dotRef.current.contains(e.target) &&
        modalRef.current &&
        !modalRef.current.contains(e.target)
      ) {
        dispatch(openModal(false));
        setShowOptionPostModal(false);
      }
    };
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, [dispatch]);

  return (
    <div>
      <div className="flex px-3 pt-3 gap-3">
        <div className="shrink-0">
          <Avatar width="w-12" height="h-12" src={post.user?.avatar} />
        </div>
        <div className="post-right flex flex-col grow">
          <div className="post-info-user flex justify-between items-center">
            <div className=" flex gap-1">
              <Link to={`/profile/${post.user?._id}`} className="space-x-2">
                <span
                  className="font-[500] hover:underline relative text-white dark:text-black dark:font-[600]"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  {post.user?.fullname}

                  {/* MODAL */}
                  {showInfoTip && !page && (
                    <div
                      className="absolute bg-black w-[300px] p-3 border-color border-[1px] rounded-xl z-10 dark:bg-white dark:border-gray-300"
                      ref={infoTip}
                    >
                      <InfoTip post={post} />
                    </div>
                  )}
                </span>
                <span className="text-[#71767B] font-[400]">
                  @{post.user?.username}
                </span>
              </Link>
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

            <div
              className="flex items-center space-x-1 group cursor-pointer relative"
              ref={dotRef}
            >
              <div
                className="icon group-hover:bg-[#1d9bf0]/10 p-2 rounded-full dark:text-gray-700"
                onClick={() => {
                  setShowOptionPostModal(!showOptionPostModal);
                  dispatch(openModal(true));
                }}
              >
                <DotsHorizontalIcon className="h-5 group-hover:text-[#1d9bf0]" />
              </div>

              {/* MODAL */}

              {showOptionPostModal && (
                <div
                  className={`absolute -bottom-4 right-0 w-[310px] divide-y border-color border bg-black rounded-xl p-3 z-50 dark:bg-white dark:border-none modal-shadow ${
                    modal && "pointer-events-auto"
                  }`}
                  ref={modalRef}
                >
                  <PostOptionModal
                    auth={auth}
                    post={post}
                    setShowOptionPostModal={setShowOptionPostModal}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="post-content grow cursor-pointer">
            <Link
              to={`/post/${post._id}`}
              className="content font-[400] mb-3 block text-white dark:text-black"
            >
              {post.content}
            </Link>
            {post?.images?.length > 0 && (
              <div ref={photosRef}>
                <DisplayImagesPost
                  images={post.images}
                  setOpenPhotosSlide={setOpenPhotosSlide}
                  setSelectImage={setSelectImage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <FooterPost
        post={post}
        setShowReply={setShowReply}
        retweet={retweet}
        handleUnretweet={handleUnretweet}
        handleRetweet={handleRetweet}
        like={like}
        handleUnlike={handleUnlike}
        handleLike={handleLike}
        setShareModal={setShareModal}
      />

      {showReply && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black bg-transparent-config z-50">
          <ReplyModal setShowReply={setShowReply} post={post} />
        </div>
      )}
      {shareModal && (
        <div className="fixed top-0 left-0 w-full h-screen z-50">
          <ShareModal
            url={`http://localhost:3000/post/${post._id}`}
            setShareModal={setShareModal}
          />
        </div>
      )}
      {openPhotosSlide && (
        <div className="fixed top-0 left-0 w-full h-screen z-50">
          <PhotosSlideModal
            images={post.images}
            setOpenPhotosSlide={setOpenPhotosSlide}
            indexImage={selectImage}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
