import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import ComposeMessage from "../../components/messages/ComposeMessage";
import { getDataAPI } from "../../utils/fetchData";

const Message = () => {
	const { auth } = useSelector((state) => state);
	const navigate = useNavigate();
	const [showCompose, setShowCompose] = useState(false);
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [flag, setFlag] = useState(false);

	useEffect(() => {
		setLoading(true);
		getDataAPI("conversations", auth.token)
			.then((res) => {
				setConversations(res.data.conversations);
				setFlag(true);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	}, [auth.token]);
	return (
		<div className="width-page ">
			<div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<span
							className="w-8 h-8 flex-center hover:hoverAnimation2"
							onClick={() => navigate(-1)}
						>
							<i className="ri-arrow-left-line text-xl cursor-pointer"></i>
						</span>
						<span className="font-bold">Messages</span>
					</div>

					<span
						className="w-8 h-8 flex-center hover:hoverAnimation2"
						onClick={() => setShowCompose(true)}
					>
						<i className="ri-mail-add-line font-[400] text-xl cursor-pointer"></i>
					</span>
				</div>
			</div>

			{!conversations.length && flag ? (
				<div className="md:w-[400px] w-[350px] mx-auto my-8 space-y-8">
					<div className="space-y-1">
						<h1 className="font-bold text-white text-[30px]">
							Welcome to your inbox!
						</h1>
						<p className="text-[#71767b] text-[14px] ">
							Drop a line, share Tweets and more with private
							conversations between you and others on Twitter.
						</p>
					</div>

					<button
						className="bg-[#1d9bf0] px-8 py-[15px] flex-center rounded-full font-[500] text-[17px] hover:bg-[#1a8cd8]"
						onClick={() => setShowCompose(true)}
					>
						Write a message
					</button>
				</div>
			) : (
				<div>
					{!loading ? (
						conversations.map((item) => (
							<div className="flex gap-2	" key={item._id}>
								<Link
									className="flex items-center gap-2 hover:bg-[#16181c] w-full p-2"
									to={`/messages/${
										item.recipients[1]._id === auth.user._id
											? item.recipients[0]._id
											: item.recipients[1]._id
									}`}
								>
									<div className="flex-shrink-0">
										<Avatar
											src={
												item.recipients[1]._id === auth.user._id
													? item.recipients[0].avatar
													: item.recipients[1].avatar
											}
											width="w-12"
											height="h-12"
										/>
									</div>
									<div className="flex flex-col justify-between">
										<div className="flex gap-2">
											<span className="text-[15px]">
												{item.recipients[1]._id === auth.user._id
													? item.recipients[0].fullname
													: item.recipients[1].fullname}
											</span>
											<span className="text-[13px] text-[#71767b]">
												@
												{item.recipients[1]._id === auth.user._id
													? item.recipients[0].username
													: item.recipients[1].username}
											</span>
										</div>

										<span className="text-[13px] text-[#71767b]">
											{item.text.slice(0, 60) + "..."}
										</span>
									</div>
								</Link>
							</div>
						))
					) : (
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
					)}
				</div>
			)}

			{showCompose && <ComposeMessage setShowCompose={setShowCompose} />}
		</div>
	);
};

export default Message;
