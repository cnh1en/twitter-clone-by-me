import React from "react";

const LogOutModal = ({ handleLogout, setShowLogOutModal }) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-[100] bg-[#242D34] py-2 overflow-auto flex-center pointer-events-none dark:bg-[#999999]">
      <div className="w-[350px] p-8 bg-black dark:bg-white border border-color rounded-2xl pointer-events-none dark:border-none">
        <div className="top">
          <div className="logo text-center">
            <i className="ri-twitter-fill text-white text-[50px] dark:text-twitter"></i>
          </div>
          <h1 className="text-[20px] text-white mb-2 font-bold dark:text-black">
            Log out of Twitter?
          </h1>
          <p className="text-[15px] text-[#71767b] text-left leading-[18px]">
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
          </p>
        </div>

        <div className="bottom mt-6">
          <div className="buttons flex flex-col gap-4">
            <button
              className="font-[700] text-[15px] rounded-full bg-white py-3 border-[1px] border-color pointer-events-auto text-black dark:bg-red-600 outline-none border-none dark:text-white"
              onClick={handleLogout}
            >
              Log out
            </button>
            <button
              className="font-[700] text-[15px] rounded-full py-3 border border-color pointer-events-auto text-white dark:border-gray-300 dark:text-black"
              onClick={() => setShowLogOutModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModal;
