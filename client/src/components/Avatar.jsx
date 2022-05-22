import React from "react";

const Avatar = ({ width, height, src, positon }) => {
	return (
		<img
			src={src}
			alt="img"
			className={`w-10 h-10 rounded-full object-cover ${width} ${height} ${positon}`}
		/>
	);
};

export default Avatar;
