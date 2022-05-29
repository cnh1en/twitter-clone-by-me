import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getDataAPI } from "../../utils/fetchData";
import ShowFriendsChat from "./ShowFriendsChat";
import { debounce } from "lodash";
import Chicken from "../../images/chicken.png";
import Loading from "../Loading";

const ComposeMessage = ({ setShowCompose }) => {
	const { auth } = useSelector((state) => state);
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [nullUsers, setNullUsers] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSearch = async (e) => {
		try {
			if (e.target.value) {
				setSearch(e.target.value);
				setLoading(true);
				const res = await getDataAPI(
					`user/search?username=${e.target.value}`,
					auth.token
				);
				setUsers(res.data.users);
				setLoading(false);
			} else setUsers([]);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="fixed w-full h-screen top-0 left-0 z-50 md:bg-transparent-config">
			<div className="w-full h-full bg-black px-3 md:md-modal-new-message">
				<div className="pt-4 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20 space-y-3">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-4">
							<span
								className="w-8 h-8 flex-center hover:hoverAnimation2"
								onClick={() => setShowCompose(false)}
							>
								<i className="ri-close-line text-xl cursor-pointer"></i>
							</span>
							<span className="font-bold">New message</span>
						</div>

						{/* <button className="bg-white px-[18px] py-1.5 rounded-full text-black text-[14px] font-bold">
						Next
					</button> */}
					</div>

					<div className="search-people -mx-3 relative">
						<input
							type="text"
							placeholder="Search people"
							className="peer bg-transparent w-full text-[15px] py-2 pl-16 border-b-[1px] border-color placeholder:text-[#575B5F] focus:outline-none"
							onChange={debounce((e) => handleSearch(e), 500)}
						/>
						<i className="ri-search-line absolute top-1/2 -translate-y-1/2 left-5 font-[200] text-[#575B5F] peer-focus:text-[#1d9cf0]"></i>
					</div>
				</div>

				{loading ? (
					<Loading />
				) : (
					users.length > 0 && (
						<div className="-mx-3">
							<ShowFriendsChat users={users} />
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default ComposeMessage;
