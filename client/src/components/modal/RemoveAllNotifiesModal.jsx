import React from "react";

const RemoveAllNotifiesModal = ({ setShowModal, handleRemoveAllNotifies }) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-30 bg-black md:bg-transparent-config py-2 overflow-auto flex-center pointer-events-none">
      <div className="w-[350px] p-8 bg-black borders-[1px] border-color rounded-2xl dark:bg-white">
        <div className="top">
          <h1 className="text-[20px] mb-2 font-bold text-white dark:text-black">
            Delete all notifies?
          </h1>
          <p className="text-[15px] text-[#71767b] text-left leading-[18px]">
            This can’t be undone and it will be removed from your profile, the
            timeline of any accounts that follow you, and from Twitter search
            results.
          </p>
        </div>

        <div className="bottom mt-6">
          <div className="buttons flex flex-col gap-4">
            <button
              className="font-[700] text-[15px] rounded-full bg-red-600 py-3 border border-color pointer-events-auto text-white dark:border-none"
              onClick={handleRemoveAllNotifies}
            >
              Delete
            </button>
            <button
              className="font-[700] text-[15px] rounded-full py-3 border border-color pointer-events-auto text-white dark:text-black dark:border-gray-300"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveAllNotifiesModal;
