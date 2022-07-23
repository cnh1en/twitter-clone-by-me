import React, { useState } from "react";
import { useInfiniteScroll } from "react-infinite-scroll-hook";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadMoreNotifies, updatePageNotifies } from "../../redux/notifySlice";
import { getDataAPI } from "../../utils/fetchData";
import Avatar from "../Avatar";

function InfiniteNotifies({ handleReadNotify, typeNotify }) {
  const LIMIT = 10;
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const loadNotifies = async () => {
    if (auth.token) {
      await dispatch(updatePageNotifies());
      const result = await getDataAPI(
        `notifies?limit=${LIMIT}&page=${notify.page}`,
        auth.token
      );
      if (result.data.notifies < (notify.page - 1) * LIMIT) {
        setHasNextPage(false);
      }
      await dispatch(loadMoreNotifies(result.data.notifies));
    }
  };

  async function handleLoadMore() {
    setLoading(true);
    await loadNotifies();
    setLoading(false);
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    threshold: 400,
    onLoadMore: handleLoadMore,
  });

  return (
    <div ref={infiniteRef}>
      {notify.notifies.length > 0 ? (
        notify.notifies.map((notify, index) => (
          <Link
            to={notify.url}
            className={`space-y-2 py-4 px-6 flex justify-between items-center border-b border-color dark:border-gray-200 ${
              !notify.isRead && "bg-[#16181C] dark:bg-gray-100"
            }`}
            key={notify._id}
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
      ) : loading ? (
        <div className="flex flex-col justify-center items-center mt-4">
          <svg
            role="status"
            className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="md:w-[400px] w-[300px] mx-auto my-32 text-center">
          <h1 className="font-bold text-white text-[30px] dark:text-black">
            Nothing to see here — yet
          </h1>
          <p className="text-[#71767b] text-[15px]">
            When someone mentions you, you’ll find it here.
          </p>
        </div>
      )}
    </div>
  );
}

export default InfiniteNotifies;
