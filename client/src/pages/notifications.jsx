import {
  HeartIcon,
  PlusCircleIcon,
  RefreshIcon,
  ReplyIcon,
  TrashIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import RemoveAllNotifiesModal from "../components/modal/RemoveAllNotifiesModal";
import { deleteAllNotifies, getIsRead, readNotify } from "../redux/notifySlice";
import { deleteDataAPI, patchDataAPI } from "../utils/fetchData";

const Notifications = () => {
  const navigate = useNavigate();
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { page } = useParams();

  const handleReadNotify = async (item) => {
    try {
      if (!item.isRead) {
        dispatch(readNotify({ id: item._id }));
        await patchDataAPI(`isReadNotify/${item._id}`, null, auth.token);
        /// update notify
        dispatch(getIsRead(notify.isRead - 1));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveAllNotifies = async () => {
    try {
      dispatch(deleteAllNotifies());
      setShowModal(false);
      await deleteDataAPI("deleteAllNotifies", auth.token);
    } catch (error) {
      console.log(error);
    }
  };

  const typeNotify = (notify) => {
    switch (notify.action) {
      case "like":
        return <HeartIcon className="h-[25px] text-[#F91880]" />;

      case "post":
        return <PlusCircleIcon className="h-[25px] text-[#1D9BF0]" />;

      case "comment":
        return <ReplyIcon className="h-[25px] text-[#1D9BF0]" />;

      case "retweet":
        return <RefreshIcon className="h-[25px] text-green-600" />;

      default:
        return <UsersIcon className="h-[25px] text-[#1D9BF0]" />;
    }
  };

  useEffect(() => {
    document.title = "Notifications";
  }, [page]);

  return (
    <div className="width-page divide-y-[1px] divide-[#2F3336] dark:divide-gray-200 overflow-scroll scrollbar">
      <div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20 dark:bg-white dark:opacity-80">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span
              className="w-8 h-8 flex-center hover:hoverAnimation2 text-white dark:text-black"
              onClick={() => navigate(-1)}
            >
              <i className="ri-arrow-left-line text-xl cursor-pointer"></i>
            </span>
            <span className="font-bold text-white dark:text-black">
              Notifications
            </span>
          </div>
        </div>
      </div>

      <div className="notifies-body">
        {!notify.notifies.length ? (
          <div className="md:w-[400px] w-[300px] mx-auto my-32">
            <h1 className="font-bold text-white text-[30px]">
              Nothing to see here — yet
            </h1>
            <p className="text-[#71767b] text-[15px]">
              When someone mentions you, you’ll find it here.
            </p>
          </div>
        ) : (
          notify.notifies.map((notify, index) => (
            <Link
              to={notify.url}
              className={`space-y-2 py-4 px-6 flex justify-between items-center border-b-[1px] border-color dark:border-gray-200 ${
                !notify.isRead && "bg-[#16181C] dark:bg-gray-100"
              }`}
              key={index}
              onClick={() => handleReadNotify(notify)}
            >
              <div className="flex items-center gap-8">
                <div className="action">{typeNotify(notify)}</div>
                <div className="space-y-2">
                  <Avatar src={notify.user.avatar} />
                  <p className="text-white dark:text-black">
                    <span className="font-bold">{notify.user.username} </span>
                    {notify.text}
                  </p>
                </div>
              </div>

              <div className="image">
                {notify.image && (
                  <img
                    src={notify.image}
                    alt="img"
                    className="w-[85px] h-[85px] object-cover rounded-xl"
                  />
                )}
              </div>
            </Link>
          ))
        )}
      </div>

      {notify.notifies.length > 0 && (
        <div className="notifies-footer mb-4">
          <p
            className="mt-4 text-center text-blue-500 flex justify-center gap-2 cursor-pointer hover:underline"
            onClick={() => setShowModal(true)}
          >
            <TrashIcon className="h-5" />
            <span>Delete all</span>
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed top-0 left-0 w-full h-screen cursor-default z-20 flex-center">
          <RemoveAllNotifiesModal
            setShowModal={setShowModal}
            handleRemoveAllNotifies={handleRemoveAllNotifies}
          />
        </div>
      )}
    </div>
  );
};

export default Notifications;
