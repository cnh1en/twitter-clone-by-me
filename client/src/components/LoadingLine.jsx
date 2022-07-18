import React from "react";

const LoadingLine = () => {
  return (
    <div className="w-full h-[3px] relative overflow-hidden rounded-[20px]">
      <div className="absolute -left-1/2 h-[3px] w-1/2 bg-blue-500 animate-[lineAnim_1s_ease-in-out_infinite] rounded-[20px]"></div>
    </div>
  );
};

export default LoadingLine;
