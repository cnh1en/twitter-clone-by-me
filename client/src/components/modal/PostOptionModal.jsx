import {
  DocumentAddIcon,
  FlagIcon,
  PencilIcon,
  TrashIcon,
  UserAddIcon,
  UserRemoveIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { updateAuthUser } from "../../redux/authSlice";
import { deleteInBookmarks, pushInBookmarks } from "../../redux/bookmarkSlice";
import { openModal } from "../../redux/modalSlice";
import {
  deleteComment,
  updatePostSelected,
} from "../../redux/postSelectedSlice";
import { deletePost, updatePost, updatePostP2 } from "../../redux/postSlice";
import {
  deleteInBookmarksProfile,
  deletePostProfile,
  pushInBookmarkProfile,
} from "../../redux/profileSlice";
import {
  deleteDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import RemovePostModal from "./RemovePostModal";
import UnfollowModal from "./UnfollowModal";

const PostOptionModal = ({ auth, post, setShowOptionPostModal }) => {
  const [openRemovePostModal, setRemovePostModal] = useState(false);
  const {
    postSelected,
    post: { posts },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { page, id } = useParams();
  const navigate = useNavigate();

  const [checkBookmark, setBookmark] = useState(false);
  const [follow, setFollow] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);

  const handleRemovePost = async () => {
    try {
      dispatch(deletePost(post._id));
      if (page === "profile") {
        /// delete post from profile page
        dispatch(deletePostProfile(post._id));
        toast("Your Tweet was deleted", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
        dispatch(openModal(false));
        return;
      } else if (page === "post" && post._id === id) {
        /// delete post from post page
        if (
          postSelected.info.reply.length &&
          !posts.every((item) => item._id !== postSelected.info.reply[0])
        ) {
          dispatch(
            updatePostP2({
              id: post._id,
              parentId: postSelected.info.reply[0],
            })
          );
        }
        toast("Your Tweet was deleted", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
        dispatch(openModal(false));

        navigate(-1);
        return;
      } else if (page === "post" && post._id !== id) {
        /// delete comment from post page

        dispatch(
          updatePost({
            newPost: {
              ...postSelected.info,
              comments: postSelected.info.comments.filter(
                (item) => item._id !== post._id
              ),
            },
            id: postSelected.info._id,
          })
        );
        dispatch(deleteComment(post._id));
        toast("Your Tweet was deleted", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
        dispatch(openModal(false));

        return;
      }
      toast("Your Tweet was deleted", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
      setRemovePostModal(false);
      dispatch(openModal(false));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePushInBookmarks = async () => {
    try {
      const newPost = {
        ...post,
        bookmarks: [...post.bookmarks, auth.user._id],
      };
      dispatch(pushInBookmarks(newPost));

      if (page === "post" && postSelected.info._id !== post._id) {
        dispatch(
          updatePostSelected({
            ...postSelected.info,
            comments: postSelected.info.comments.map((item) =>
              item._id === newPost._id ? newPost : item
            ),
          })
        );
      } else if (page === "post" && postSelected.info._id === post._id) {
        dispatch(updatePostSelected(newPost));
      } else if (page === "profile") {
        const newPost = {
          ...post,
          bookmarks: [...post.bookmarks, auth.user._id],
        };
        dispatch(pushInBookmarkProfile({ post: newPost }));
      }
      dispatch(updatePost({ id: newPost._id, newPost }));
      setBookmark(true);
      setShowOptionPostModal(false);
      dispatch(openModal(false));
      await patchDataAPI(`/bookmark/${post._id}`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteInBookmarks = async () => {
    try {
      const newPost = {
        ...post,
        bookmarks: post.bookmarks.filter((item) => item !== auth.user._id),
      };
      dispatch(deleteInBookmarks(post._id));

      if (page === "post" && postSelected.info._id !== post._id) {
        dispatch(
          updatePostSelected({
            ...postSelected.info,
            comments: postSelected.info.comments.map((item) =>
              item._id === newPost._id ? newPost : item
            ),
          })
        );
      } else if (page === "post" && postSelected.info._id === post._id) {
        dispatch(updatePostSelected(newPost));
      } else if (page === "profile") {
        const newPost = {
          ...post,
          bookmarks: post.bookmarks.filter((item) => item !== auth.user._id),
        };
        dispatch(deleteInBookmarksProfile(newPost));
      }

      dispatch(updatePost({ id: newPost._id, newPost }));
      setBookmark(false);
      setShowOptionPostModal(false);
      dispatch(openModal(false));
      await patchDataAPI(`/bookmark/${post._id}/destroy`, null, auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFollow = async () => {
    try {
      setFollow(true);
      await postDataAPI(`user/follow/${post.user._id}`, null, auth.token);
      dispatch(
        updateAuthUser({
          following: [...auth.user.following, post.user],
        })
      );
      dispatch(openModal(false));
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnfollow = async () => {
    try {
      // setUnfollowModal(true);
      await postDataAPI(`user/unfollow/${post.user._id}`, null, auth.token);
      toast(`You unfollowed @${post.user.username}`, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(
        updateAuthUser({
          following: auth.user.following.filter(
            (item) => item._id !== post.user._id
          ),
        })
      );
      setFollow(false);
      dispatch(openModal(false));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      post.bookmarks.length &&
      !post.bookmarks.every((item) => item !== auth.user._id)
    ) {
      setBookmark(true);
    } else setBookmark(false);
  }, [auth.user._id, post.bookmarks]);

  useEffect(() => {
    if (!auth.user.following.every((item) => item._id !== post.user._id)) {
      setFollow(true);
    } else setFollow(false);
  }, [post.user._id, auth.user.following]);

  return (
    <div>
      <div className="space-y-2 shadow-2xl dark:shadow-none">
        {auth.user._id !== post.user._id && (
          <>
            <div className="follow flex gap-4 items-center py-2">
              {follow ? (
                <div
                  className="flex gap-4 dark:text-black"
                  onClick={() => setUnfollowModal(true)}
                >
                  <UserRemoveIcon className="h-5 text-[#71767B] " />
                  <span className="font-[400] text-[15px]">
                    Unfollow @{post.user.username}
                  </span>
                </div>
              ) : (
                <div className="flex gap-4" onClick={handleFollow}>
                  <UserAddIcon className="h-5 text-[#71767B] " />
                  <span className="font-[400] text-[15px]">
                    Follow @{post.user.username}
                  </span>
                </div>
              )}
            </div>
            {!checkBookmark ? (
              <div
                className="follow flex gap-4 items-center py-2"
                onClick={handlePushInBookmarks}
              >
                <DocumentAddIcon className="h-5 text-[#71767B]" />
                <span className="font-[400] text-[15px] dark:text-black text-white">
                  Bookmark
                </span>
              </div>
            ) : (
              <div
                className="follow flex gap-4 items-center py-2"
                onClick={handleDeleteInBookmarks}
              >
                <DocumentAddIcon className="h-5 text-[#71767B]" />
                <span className="font-[400] text-[15px] dark:text-black text-white">
                  Remove Tweet from Bookmarks
                </span>
              </div>
            )}

            <div
              className="follow flex gap-4 items-center py-2"
              onClick={() => {
                toast(`Reported ${post.user.username} !!`);
                setShowOptionPostModal(false);
                dispatch(openModal(false));
              }}
            >
              <FlagIcon className="h-5 text-[#71767B]" />
              <span className="font-[400] text-[15px] dark:text-black text-white">
                Report @{post.user.username}
              </span>
            </div>
          </>
        )}
        {auth.user._id === post.user._id && (
          <>
            <div
              className="follow flex gap-4 items-center py-2 text-red-700"
              onClick={() => {
                setRemovePostModal(true);
              }}
            >
              <TrashIcon className="h-5" />
              <span className="font-[400] text-[15px]">Remove</span>
            </div>
            {/* <div className="follow flex gap-4 items-center py-2">
              <PencilIcon className="h-5 text-[#71767B]" />
              <span className="font-[400] text-[15px] dark:text-black text-white">
                Edit
              </span>
            </div> */}

            {!checkBookmark ? (
              <div
                className="follow flex gap-4 items-center py-2"
                onClick={handlePushInBookmarks}
              >
                <DocumentAddIcon className="h-5 text-[#71767B]" />
                <span className="font-[400] text-[15px] dark:text-black text-white">
                  Bookmark
                </span>
              </div>
            ) : (
              <div
                className="follow flex gap-4 items-center py-2"
                onClick={handleDeleteInBookmarks}
              >
                <DocumentAddIcon className="h-5 text-[#71767B]" />
                <span className="font-[400] text-[15px] dark:text-black text-white">
                  Remove Tweet from Bookmarks
                </span>
              </div>
            )}
          </>
        )}
      </div>
      {openRemovePostModal && (
        <div className="fixed top-0 left-0 w-full h-screen cursor-default">
          <RemovePostModal
            setRemovePostModal={setRemovePostModal}
            handleRemovePost={handleRemovePost}
          />
        </div>
      )}

      {unfollowModal && (
        <div className="fixed top-0 left-0 w-full h-screen cursor-default">
          <UnfollowModal
            handleUnfollow={handleUnfollow}
            setUnfollowModal={setUnfollowModal}
            username={post.user.username}
          />
        </div>
      )}
    </div>
  );
};

export default PostOptionModal;
