import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../components/Avatar";
import ButtonFollow from "../components/ButtonFollow";
import SearchBar from "../components/SearchBar";
import Chicken from "../images/chicken.png";
import { useParams } from "react-router";
import Header from "../components/header/Header";

const Search = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emptyUsers, setEmptyUsers] = useState(false);
  const [search, setSearch] = useState("");
  const { page } = useParams();

  useEffect(() => {
    document.title = "Search";
  }, [page]);

  return (
    <div className="width-page">
      <div className="hidden">
        <Header />
      </div>
      <div className="py-2 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20 dark:bg-white">
        <SearchBar
          setUsers={setUsers}
          setLoading={setLoading}
          setEmptyUsers={setEmptyUsers}
          setSearch={setSearch}
        />
      </div>

      <div className="pl-4 pr-6 mt-4 space-y-3">
        {!loading ? (
          users.map((user) => (
            <div className="flex gap-2" key={user._id}>
              <Avatar width="w-12" height="h-12" src={user.avatar} />

              <div className="flex flex-col gap-1 grow justify-center">
                <div className="flex justify-between">
                  <div className="name flex flex-col">
                    <Link to={`/profile/${user._id}`}>
                      <h3 className="font-bold hover:underline text-white dark:text-black">
                        {user.fullname}
                      </h3>
                      <span className="text-[15px] text-[#71767b]">
                        @{user.username}
                      </span>
                    </Link>
                  </div>

                  <ButtonFollow user={user} />
                </div>

                <div className="story font-[300]">{user.story}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        )}

        {emptyUsers && (
          <div className="w-[320px] md:w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20">
            <img src={Chicken} alt="chicken" className="object-cover" />
            <div>
              <h1 className="font-bold text-white text-[30px] dark:text-black break-words">
                No results for "{search}"
              </h1>
              <p className="text-[#71767b] text-[15px] dark:text-black">
                Try searching for something
              </p>
            </div>
          </div>
        )}
        {!users.length && !emptyUsers && !loading && (
          <div className="w-[320px] md:w-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div>
              <h1 className="font-semibold text-white text-[30px] text-center dark:text-black">
                Try searching for people
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
