import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import { postDataAPI } from "../../utils/fetchData";
import Avatar from "../Avatar";
import LogOutModal from "../modal/LogOutModal";
import SidebarLink from "./SidebarLink";

const TweetIcon = (props) => {
  return (
    <span>
      <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <g>
          <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
        </g>
      </svg>
    </span>
  );
};

const Sidebar = () => {
  // REDUX
  const {
    auth: { user },
    modal,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [showLogOutModal, setShowLogOutModal] = useState(false);
  // REF
  const accountRef = useRef(null);
  const modalRef = useRef(null);

  //HANDLE
  const handleLogout = async () => {
    try {
      await postDataAPI("logout");
      localStorage.removeItem("firstLogin");
      setShowModal(false);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  // EFFECT
  useEffect(() => {
    const handleCloseModal = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        dispatch(openModal(false));
        setShowModal(false);
      } else if (accountRef.current.contains(e.target)) {
        setShowModal(true);
        dispatch(openModal(true));
      }
    };
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, [dispatch]);
  return (
    <>
      <div
        className={`after:fixed top-0 left-0 w-[70px] h-screen bg-[#000] dark:bg-white border-r-[1px] border-[#2F3336] dark:border-r dark:border-gray-200 py-4 flex flex-col justify-between xl:w-[402px] xl:py-2 z-10 ${
          modal && "z-30"
        }`}
      >
        <div className="icons flex-center flex-col gap-2 xl:items-start xl:pl-[125px]">
          <SidebarLink
            icon={<i className="text-twitter ri-twitter-fill text-[36px]"></i>}
            iconActive={
              <i className="text-twitter ri-twitter-fill text-[36px]"></i>
            }
            to="/"
            logo={true}
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-home-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-home-fill text-2xl"></i>
            }
            text="Home"
            to="/"
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-search-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-search-fill text-2xl"></i>
            }
            text="Search"
            to="/search"
          />

          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-notification-4-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-notification-4-fill text-2xl"></i>
            }
            text="Notifications"
            to="/notifications"
            badge={true}
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-mail-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-mail-fill text-2xl"></i>
            }
            text="Messages"
            to="/messages"
            badge={true}
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-bookmark-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-bookmark-fill text-2xl"></i>
            }
            text="Bookmarks"
            to="/bookmarks"
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-file-list-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-file-list-fill text-2xl"></i>
            }
            text="News"
            to="/news"
          />
          <SidebarLink
            icon={
              <i className="text-white dark:text-black ri-user-line text-2xl"></i>
            }
            iconActive={
              <i className="text-white dark:text-black ri-user-fill text-2xl"></i>
            }
            text="Profile"
            to={`/profile/${user?._id}`}
          />
          <SidebarLink
            className={"px-16 bg-twitter py-3 rounded-full flex-center"}
            offHover={true}
            tweet={true}
            icon={<TweetIcon width="24px" fill="white" />}
            iconActive={
              <i className="text-white  ri-add-circle-fill text-2xl"></i>
            }
            to="/tweet"
            text="Tweet"
          />
        </div>
        <div
          className="account flex-center relative pointer-events-auto"
          ref={accountRef}
        >
          <div className="flex-center hoverAnimation space-x-2">
            <Avatar width={10} height={10} src={user?.avatar} />
            <div className="info-account text-white hidden xl:block">
              <p className="font-bold text-[15px] text-white dark:text-black">
                {user?.fullname}
              </p>
              <span className="text-sm text-[#71767B]">@{user?.username}</span>
            </div>
          </div>
          {showModal && (
            <div
              className={`account-modal w-[300px] absolute -top-40 left-1 z-50 bg-black dark:bg-white dark:border-none py-3 divide-y dark:divide-gray-300 border-color border rounded-xl text-white xl:left-[120px]  ${
                modal && "pointer-events-auto"
              } modal-shadow`}
              ref={modalRef}
            >
              <div className="account-modal-header flex justify-between items-center py-3 px-4">
                <div className="flex gap-2">
                  <Avatar width="w-12" height="h-12" src={user?.avatar} />
                  <div className="info-account">
                    <p className="font-bold text-[15px] text-white dark:text-black">
                      {user?.fullname}
                    </p>
                    <span className="text-sm text-[#71767B]">
                      @{user?.username}
                    </span>
                  </div>
                </div>
                <span>
                  <i className="ri-check-line text-2xl text-[#1D9BF0]"></i>
                </span>
              </div>

              <div
                className="account-modal-body p-4 hover:bg-[#d9d9d9] hover:bg-opacity-10 cursor-pointer"
                onClick={() => setShowLogOutModal(true)}
              >
                <span className="text-white dark:text-gray-500">
                  Log out @{user?.username}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      {showLogOutModal && (
        <div className="fixed top-0 left-0 w-full h-screen z-50">
          <LogOutModal
            handleLogout={handleLogout}
            setShowLogOutModal={setShowLogOutModal}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
