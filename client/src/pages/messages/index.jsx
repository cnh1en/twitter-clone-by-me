import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Header from "../../components/header/Header";
import Loading from "../../components/Loading";
import ComposeMessage from "../../components/messages/ComposeMessage";
import { getDataAPI } from "../../utils/fetchData";

const Message = () => {
  const { auth, online } = useSelector((state) => state);
  const navigate = useNavigate();
  const { page } = useParams();
  const [showCompose, setShowCompose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [flag, setFlag] = useState(false);

  const isOnlineCheck = (id) => !!online?.onlines.find((item) => item === id);

  useEffect(() => {
    document.title = "Messages";
  }, [page]);

  useEffect(() => {
    setLoading(true);
    getDataAPI("conversations", auth.token)
      .then((res) => {
        setConversations(res.data.conversations);
        setFlag(true);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [auth.token]);
  return (
    <div className="width-page ">
      <div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black dark:bg-white z-20">
        <div className="hidden">
          <Header />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span
              className="w-8 h-8 flex-center hover:hoverAnimation2"
              onClick={() => navigate(-1)}
            >
              <i className="ri-arrow-left-line text-xl cursor-pointer text-white dark:text-black"></i>
            </span>
            <span className="font-bold text-white dark:text-black">
              Messages
            </span>
          </div>

          <span
            className="w-8 h-8 flex-center hover:hoverAnimation2"
            onClick={() => setShowCompose(true)}
          >
            <i className="ri-mail-add-line font-[400] text-xl cursor-pointer text-white dark:text-black"></i>
          </span>
        </div>
      </div>

      {!conversations.length && flag ? (
        <div className="md:w-[400px] w-[350px] mx-auto my-8 space-y-8">
          <div className="space-y-1">
            <h1 className="font-bold text-white text-[30px] bg:text-black">
              Welcome to your inbox!
            </h1>
            <p className="text-[#71767b] text-[14px] ">
              Drop a line, share Tweets and more with private conversations
              between you and others on Twitter.
            </p>
          </div>

          <button
            className="bg-[#1d9bf0] px-8 py-[15px] flex-center rounded-full font-[500] text-[17px] hover:bg-[#1a8cd8] text-white bg:text-black"
            onClick={() => setShowCompose(true)}
          >
            Write a message
          </button>
        </div>
      ) : (
        <div>
          {!loading ? (
            conversations.map((item) => (
              <div className="flex gap-2" key={item._id}>
                <Link
                  className="flex items-center gap-2 hover:bg-[#16181c] w-full p-2 dark:hover:bg-gray-200"
                  to={`/messages/${
                    item.recipients[1]._id === auth.user._id
                      ? item.recipients[0]._id
                      : item.recipients[1]._id
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Avatar
                      src={
                        item.recipients[1]._id === auth.user._id
                          ? item.recipients[0].avatar
                          : item.recipients[1].avatar
                      }
                      width="w-12"
                      height="h-12"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex gap-2 items-center">
                      <span className="text-[15px] text-white dark:text-black">
                        {item.recipients[1]._id === auth.user._id
                          ? item.recipients[0].fullname
                          : item.recipients[1].fullname}
                      </span>
                      <span className="text-[13px] text-[#71767b]">
                        @
                        {item.recipients[1]._id === auth.user._id
                          ? item.recipients[0].username
                          : item.recipients[1].username}
                      </span>
                      {isOnlineCheck(
                        item.recipients[1]._id === auth.user._id
                          ? item.recipients[0]._id
                          : item.recipients[1]._id
                      ) && (
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      )}
                    </div>

                    <span className="text-[13px] text-[#71767b]">
                      {item.text.length > 60
                        ? item.text.slice(0, 60) + "..."
                        : item.text}
                    </span>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      )}

      {showCompose && <ComposeMessage setShowCompose={setShowCompose} />}
    </div>
  );
};

export default Message;
