import React, { useState } from "react";

const Header = () => {
	const [modeTheme, setModeTheme] = useState(false);

	return (
		<div className="py-4 px-3 text-[20px] font-bold bg-transparent flex justify-between sticky top-0 bg-black z-20">
			<h2>Home</h2>
			<div
				className="dark-mode cursor-pointer"
				onClick={() => setModeTheme(!modeTheme)}
			>
				{!modeTheme ? (
					<i className="ri-sun-line"></i>
				) : (
					<i className="ri-moon-fill"></i>
				)}
			</div>
		</div>
	);
};

export default Header;
