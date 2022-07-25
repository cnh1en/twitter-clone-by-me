import React from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

const Header = () => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <div className="py-4 px-3 text-[20px] font-bold bg-transparent flex justify-between sticky top-0 bg-black dark:bg-white dark:bg-opacity-80 z-20">
      <h2 className="dark:text-black">Home</h2>
      <div
        className="dark-mode cursor-pointer"
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        <div className="dark:text-black">
          {!isDark ? (
            <i className="ri-sun-line"></i>
          ) : (
            <i className="ri-moon-fill"></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
