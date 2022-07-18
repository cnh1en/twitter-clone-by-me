import React from "react";

const LoadMoreBtn = ({ result, page, load, handleLoadMore }) => {
  return (
    <div className="mt-4">
      {result < 5 * (page - 1)
        ? ""
        : !load && (
            <button
              className="bg-blue-500 text-white p-2 rounded-md block m-auto focus:outline-none hover:opacity-70"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </div>
  );
};

export default LoadMoreBtn;
