import { TrashIcon } from "@heroicons/react/outline";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../../redux/conversationSlice";
import { deleteDataAPI } from "../../utils/fetchData";
import Avatar from "../Avatar";
import RemoveMessageModal from "../modal/RemoveMessageModal";

const Message = ({ message, left, setFlag }) => {
  const { auth, modal } = useSelector((state) => state);
  const [showTrash, setShowTrash] = useState(false);
  const [showModalRemoveMessage, setShowModalRemoveMessage] = useState(false);

  const dispatch = useDispatch();

  const handleRemoveMessage = async () => {
    try {
      dispatch(deleteMessage(message._id));
      setShowModalRemoveMessage(false);
      await deleteDataAPI(`/message/${message._id}/destroy`, auth.token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      {left ? (
        <div className="py-2 mb-2 items-center">
          <div className="flex gap-1 items-center w-3/4">
            <Avatar src={message.sender.avatar} width="w-8" height="h-8" />
            <div
              className="mr-auto w-3/4 flex justify-start items-center gap-2"
              onMouseOver={() => setShowTrash(true)}
              onMouseOut={() => setShowTrash(false)}
            >
              {message.text && (
                <span className="px-3 py-2 rounded-xl bg-[#2F3336] text-left dark:bg-gray-200 dark:text-black">
                  {message.text}
                  {message.media && (
                    <img
                      src={message.media}
                      alt="media"
                      className="max-w-[300px] object-cover rounded-xl"
                    />
                  )}
                </span>
              )}
              {!message.text && (
                <img
                  src={message.media}
                  alt="media"
                  className="max-w-[300px] object-cover rounded-xl"
                />
              )}
            </div>
          </div>
          <p className="text-[12px] mt-1 text-[#71767b] text-left">
            {moment(message.createdAt).format("LT")}
          </p>
        </div>
      ) : (
        <div
          className="ml-auto w-3/4 py-2 mb-2"
          onMouseOver={() => setShowTrash(true)}
          onMouseOut={() => setShowTrash(false)}
        >
          <div className="flex justify-end items-center gap-2 cursor-pointer">
            {showTrash && (
              <div
                className="w-8 h-8 flex-center hover:hoverAnimation2 rounded-full cursor-pointer"
                onClick={() => {
                  setShowModalRemoveMessage(true);
                  setFlag(true);
                }}
              >
                <TrashIcon className="h-5 text-[#71767b]" />
              </div>
            )}

            {message.text && (
              <span className="px-3 py-2 rounded-xl bg-[#1D9BF0] text-left relative">
                {message.text}
                {message.media && (
                  <img
                    src={message.media}
                    alt="media"
                    className="max-w-[300px] object-cover rounded-xl"
                  />
                )}
              </span>
            )}
            {!message.text && (
              <img
                src={message.media}
                alt="media"
                className="max-w-[300px] object-cover rounded-xl"
              />
            )}
          </div>
          <p className="text-[12px] mr-1 text-[#71767b] text-right mt-1">
            {moment(message.createdAt).format("LT")}
          </p>
        </div>
      )}

      {showModalRemoveMessage && (
        <div className="fixed top-0 left-0 w-full h-screen z-[100] flex-center pointer-events-auto">
          <RemoveMessageModal
            setShowModalRemoveMessage={setShowModalRemoveMessage}
            setFlag={setFlag}
            handleRemoveMessage={handleRemoveMessage}
          />
        </div>
      )}
    </div>
  );
};

export default Message;
