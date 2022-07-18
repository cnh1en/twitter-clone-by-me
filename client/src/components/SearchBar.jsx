import React, { useState } from "react";
import { debounce } from "lodash";
import { getDataAPI } from "../utils/fetchData";
import { useSelector } from "react-redux";

const SearchBar = ({ setUsers, setLoading, setEmptyUsers, setSearch }) => {
  const { auth } = useSelector((state) => state);
  const [focus, setFocus] = useState(false);

  const handleSearch = async (e) => {
    try {
      if (e.target.value) {
        setEmptyUsers(false);
        setSearch(e.target.value);
        setLoading(true);
        const res = await getDataAPI(
          `user/search?username=${e.target.value}`,
          auth.token
        );
        if (!res.data.users.length) setEmptyUsers(true);
        setUsers(res.data.users);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor="search"
        className="absolute top-1/2 -translate-y-1/2 left-6 flex-center"
      >
        <i
          className={`ri-search-line font-[400] ${
            focus && "text-[#1d9bf0]"
          } dark:text-gray-500`}
        ></i>
      </label>
      <input
        type="text"
        id="search"
        className="bg-[#202327] py-3 rounded-full pl-14 w-full text-[14px] font-[300] focus:outline-none focus:border-sky-500 focus:outline-[#1D9BF0] dark:bg-[#F7F9F9] dark:border dark:border-gray-200 dark:text-black"
        placeholder="Search Twitter"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={debounce((e) => handleSearch(e), 500)}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
