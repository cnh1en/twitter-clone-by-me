import React from "react";
import WhatsHappening from "../widget/WhatsHappening";
import WhoToFollow from "../widget/WhoToFollow";

const Widget = () => {
	return (
		<div className="hidden md:block fixed top-0 right-0 xl:w-[400px] md:w-[300px] h-screen border-l-[1px] border-[#2F3336] xl:p-4 p-1 overflow-auto scrollbar">
			<WhoToFollow />
			<WhatsHappening />
		</div>
	);
};

export default Widget;
