import React from "react";

const CardNews = ({ article }) => {
  return (
    <div className="text-white mb-4 bg-[#16181C] rounded-2xl p-3 dark:bg-[#F7F9F9] dark:border-gray-200 dark:border">
      <a href={article.url} target="_blank" rel="noreferrer">
        <h1 className="title xl:text-[14px] md:text-[12px] text-[#d9d9d9] mb-2 dark:text-black">
          {article.title}
        </h1>

        <div className="">
          <img src={article.urlToImage} alt="img" />
        </div>
      </a>
    </div>
  );
};

export default CardNews;
