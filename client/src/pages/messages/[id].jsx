import { TrashIcon } from "@heroicons/react/outline";
import { Picker } from "emoji-mart";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import TextareaAutoSize from "react-textarea-autosize";
import Avatar from "../../components/Avatar";
import Loading from "../../components/Loading";
import LoadingLine from "../../components/LoadingLine";
import ComposeMessage from "../../components/messages/ComposeMessage";
import InformationFriendChat from "../../components/messages/InformationFriendChat";
import Message from "../../components/messages/Message";
import RemoveConversationModal from "../../components/modal/RemoveConversationModal";
import RemoveMessageModal from "../../components/modal/RemoveMessageModal";
import { createMessage, getMessages } from "../../redux/conversationSlice";
import { openModal } from "../../redux/modalSlice";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";

const Conversation = () => {
  const [showCompose, setShowCompose] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showRemoveConversationModal, setShowRemoveConversationModal] =
    useState(false);
  const [flag, setFlag] = useState(false);
  const endScrollRef = useRef(null);

  const { auth, conversation, socket, online } = useSelector((state) => state);
  const { id } = useParams();

  const emojisPickerRef = useRef(null);
  const smileRef = useRef(null);
  const inputImageRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleInput = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    let media = [];
    setLoadingImage(true);
    try {
      if (image) {
        media = await imageUpload([image]);
      }
      const message = {
        text: text.trim(),
        sender: auth.user,
        recipient: user._id,
        media: media.length ? media[0].url : "",
      };
      setText("");
      dispatch(createMessage(message));
      socket.socketClient.emit("createMessage", message);
      await postDataAPI("createMessage", message, auth.token);
      scrollToBottom();
      setImage("");
      setLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };
  const scrollToBottom = () => {
    endScrollRef?.current.scrollIntoView({ behavior: "smooth" });
  };
  const sendMessageOnEnter = async (e) => {
    if (e.key === "Enter") {
      console.log("ENTER");
      e.preventDefault();
      if (!text) return;
      handleSubmit();
    }
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
  };

  const handleRemoveConversation = async () => {
    try {
      await deleteDataAPI(`/conversation/${id}/destroy`, auth.token);
      setShowRemoveConversationModal(false);
      navigate("/messages");
    } catch (error) {
      console.log(error);
    }
  };

  const isOnlineCheck = (id) => !!online?.onlines.find((item) => item === id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setShowCompose(false);
      Promise.all([
        getDataAPI(`/user/${id}`, auth.token),
        getDataAPI(`/messages/${id}`, auth.token),
      ])
        .then((values) => {
          setUser(values[0].data.user);
          setMessages(values[1].data.messages);
          dispatch(getMessages(values[1].data.messages));
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }
  }, [id, auth.token, dispatch]);

  useEffect(() => {
    const handleCloseModal = (e) => {
      if (
        !smileRef.current.contains(e.target) &&
        emojisPickerRef.current &&
        !emojisPickerRef.current.contains(e.target)
      ) {
        dispatch(openModal(false));
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, [dispatch]);

  return !loading ? (
    <div className="width-page">
      <div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black dark:bg-white z-20">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span
              className="w-8 h-8 flex-center hover:hoverAnimation2"
              onClick={() => navigate(-1)}
            >
              <i className="ri-arrow-left-line text-xl cursor-pointer text-white dark:text-black"></i>
            </span>
            <span className="font-bold flex items-center gap-2">
              <Avatar src={user?.avatar} width="w-10" height="h-10" />
              <div className="flex flex-col">
                <span className="text-[18px] text-white dark:text-black">
                  {user?.fullname}
                </span>
                <span className="text-[13px] text-[#71767b] font-[400]">
                  @{user?.username}
                </span>
              </div>
              {isOnlineCheck(id) && (
                <div className="w-2 h-2 rounded-full bg-green-500 ml-2"></div>
              )}
            </span>
          </div>

          <div className="flex gap-2">
            <span
              className="w-8 h-8 flex-center hover:hoverAnimation2 cursor-pointer text-white dark:text-black"
              onClick={() => setShowRemoveConversationModal(true)}
            >
              <TrashIcon className="h-5" />
            </span>
            <span
              className="w-8 h-8 flex-center hover:hoverAnimation2 cursor-pointer text-white dark:text-black"
              onClick={() => setShowCompose(true)}
            >
              <i className="ri-mail-add-line font-[400] text-xl"></i>
            </span>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div
        className={`display-message overflow-auto scrollbar  ${
          flag ? "z-50" : "z-30"
        }`}
      >
        <InformationFriendChat user={user} />
        {conversation.messages?.map((item, index) => (
          <div key={index} className="px-4">
            {item.sender._id !== auth.user._id ? (
              <Message message={item} left={true} setFlag={setFlag} />
            ) : (
              <Message message={item} left={false} setFlag={setFlag} />
            )}
          </div>
        ))}

        <div ref={endScrollRef}></div>
      </div>

      {/* INPUT */}
      <div className="input-message py-2 flex-center space-x-2 px-3 border-t-[1px] border-color bg-black dark:bg-white dark:border-gray-200 z-30">
        {loadingImage && (
          <div className="absolute top-0 left-0 w-full	">
            <LoadingLine />
          </div>
        )}
        <div
          className="w-8 h-8 flex-center hover:hoverAnimation2 cursor-pointer"
          onClick={() => inputImageRef.current.click()}
        >
          <i className="ri-image-line text-xl text-[#1987D2]"></i>
          <input
            type="file"
            className="hidden"
            ref={inputImageRef}
            onChange={handleInputImage}
          />
        </div>
        <div className="w-8 h-8 flex-center hover:hoverAnimation2 cursor-pointer relative pointer-events-auto">
          <i
            className="ri-emotion-line text-xl text-[#1987D2]"
            onClick={() => {
              dispatch(openModal(!showModal));
              setShowModal(!showModal);
            }}
            ref={smileRef}
          ></i>

          {showModal && (
            <span ref={emojisPickerRef}>
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  bottom: "28px",
                  left: "18px",
                  maxWidth: "320px",
                  borderRadius: "20px",
                  pointerEvents: "auto",
                  zIndex: "50",
                }}
                theme="dark"
              />
            </span>
          )}
        </div>

        <div className="grow border border-color rounded-2xl p-2 flex items-start flex-col dark:border-gray-200">
          {image && (
            <div className="images pb-3 relative">
              <img
                src={URL.createObjectURL(image)}
                alt="img"
                className="rounded-xl h-[150px] w-[150px] object-cover"
              />
              <div
                className="absolute top-0.5 left-1"
                onClick={() => setImage("")}
              >
                <i className="ri-close-line text-xl bg-slate-600 hoverAnimation xl:p-0"></i>
              </div>
            </div>
          )}

          <TextareaAutoSize
            minRows="1"
            type="text"
            className="w-full py-1 pl-2 focus:outline-none text-[14px] placeholder:font-[300] bg-transparent dark:bg-white dark:text-black"
            placeholder="Start a new message"
            value={text}
            onChange={handleInput}
            onKeyDown={sendMessageOnEnter}
          />
        </div>
        <button
          className={`button w-10 h-10 flex-center ${
            !!text.trim() && "hover:hoverAnimation2 cursor-pointer"
          }`}
          disabled={!text || !text.trim()}
          onClick={handleSubmit}
        >
          <i className="ri-send-plane-2-line text-[#1987D2]"></i>
        </button>
      </div>
      {showCompose && <ComposeMessage setShowCompose={setShowCompose} />}
      {showRemoveConversationModal && (
        <RemoveConversationModal
          handleRemoveConversation={handleRemoveConversation}
          setShowRemoveConversationModal={setShowRemoveConversationModal}
        />
      )}
    </div>
  ) : (
    <div className="width-page z-50 bg-black dark:bg-white">
      <Loading />
    </div>
  );
};

export default Conversation;
