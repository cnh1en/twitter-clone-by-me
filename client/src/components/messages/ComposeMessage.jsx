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
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
