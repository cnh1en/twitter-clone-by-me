import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useParams, useMatch, useResolvedPath } from "react-router";
import { useSelector } from "react-redux";

const SidebarLink = ({ icon, text, to, logo, iconActive, badge }) => {
	let resolved = useResolvedPath(to);
	let match = useMatch({ path: resolved.pathname, end: true });
	const { notify } = useSelector((state) => state);
	return (
		<div
			className={`relative sidebar-icon w-12 h-12 flex-center xl:flex xl:gap-4 text-white ${
				logo ? "" : "hoverAnimation"
			}`}
		>
			{to && (
				<NavLink to={to}>
					<div className="flex-center gap-4">
						<span>{match ? iconActive : icon}</span>
						{text && (
							<span
								className={`hidden xl:block ${match && "font-bold"}`}
							>
								{text}
							</span>
						)}
					</div>
				</NavLink>
			)}

			{badge && to === "/notifications" && notify.isRead > 0 && (
				<div className="absolute top-2 xl:left-2 left-1 w-5 h-5 rounded-full bg-[#1D9BF0] flex-center text-sm">
					{notify.isRead}
				</div>
			)}
			{/* {badge && to === "/messages" && (
				<div className="absolute top-2 xl:left-2 left-1 w-5 h-5 rounded-full bg-[#1D9BF0] flex-center text-sm">
					1
				</div>
			)} */}
		</div>
	);
};

export default SidebarLink;
