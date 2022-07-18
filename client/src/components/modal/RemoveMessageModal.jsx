import React from "react";

const RemoveMessageModal = ({
  setShowModalRemoveMessage,
  setFlag,
  handleRemoveMessage,
}) => {
  return (
    <div className="absolute w-full h-full top-0 left-0 z-40 bg-black  bg-transparent-config py-2 overflow-auto flex-center pointer-events-none">
      <div className="w-[350px] p-8 bg-black borders-[1px] border-color rounded-2xl dark:bg-white">
        <div className="top">
          <h1 className="text-[20px] mb-2 font-bold text-white dark:text-black">
            Delete message?
          </h1>
          <p className="text-[15px] text-[#71767b] text-left leading-[18px]">
            This message will be deleted for you. Other people in the
            conversation will still be able to see it.
          </p>
        </div>

        <div className="bottom mt-6">
          <div className="buttons flex flex-col gap-4">
            <button
              className="font-[700] text-[15px] rounded-full bg-red-700 py-3 border-[1px] border-color pointer-events-auto border-none"
              onClick={handleRemoveMessage}
            >
              Delete
            </button>
            <button
              className="font-[700] text-[15px] rounded-full py-3 border-[1px] border-color pointer-events-auto text-white dark:text-black dark:border dark:border-gray-300"
              onClick={() => {
                setShowModalRemoveMessage(false);
                setFlag(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveMessageModal;
