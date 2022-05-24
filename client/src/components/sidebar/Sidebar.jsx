import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/modalSlice";
import Avatar from "../Avatar";
import SidebarLink from "./SidebarLink";
import { postDataAPI } from "../../utils/fetchData";
import LogOutModal from "../modal/LogOutModal";

const Sidebar = () => {
	// REDUX
	const {
		auth: { user },
		modal,
	} = useSelector((state) => state);
	const dispatch = useDispatch();

	const [showModal, setShowModal] = useState(false);
	const [showLogOutModal, setShowLogOutModal] = useState(false);
	// REF
	const accountRef = useRef(null);
	const modalRef = useRef(null);

	//HANDLE
	const handleLogout = async () => {
		try {
			await postDataAPI("logout");
			localStorage.removeItem("firstLogin");
			setShowModal(false);
			window.location.href = "/login";
		} catch (error) {
			console.log(error);
		}
	};

	// EFFECT
	useEffect(() => {
		const handleCloseModal = (e) => {
			if (
				!accountRef.current.contains(e.target) &&
				modalRef.current &&
				!modalRef.current.contains(e.target)
			) {
				dispatch(openModal(false));
				setShowModal(false);
			}
		};
		document.addEventListener("click", handleCloseModal);
		return () => {
			document.removeEventListener("click", handleCloseModal);
		};
	}, [dispatch]);
	return (
		<>
			<div
				className={`after:fixed top-0 left-0 w-[70px] h-screen bg-[#000] border-r-[1px] border-[#2F3336] py-4 flex flex-col justify-between xl:w-[402px] xl:py-2 z-10 ${
					modal && "z-30"
				}`}
			>
				<div className="icons flex-center flex-col gap-2 xl:items-start xl:pl-[125px]">
					<SidebarLink
						icon={<i className="text-white ri-twitter-fill text-2xl"></i>}
						iconActive={
							<i className="text-white ri-twitter-fill text-2xl"></i>
						}
						to="/"
						logo={true}
					/>
					<SidebarLink
						icon={<i className="text-white ri-home-line text-2xl"></i>}
						iconActive={
							<i className="text-white ri-home-fill text-2xl"></i>
						}
						text="Home"
						to="/"
					/>
					<SidebarLink
						icon={<i className="text-white ri-search-line text-2xl"></i>}
						iconActive={
							<i className="text-white ri-search-fill text-2xl"></i>
						}
						text="Search"
						to="/search"
					/>

					<SidebarLink
						icon={
							<i className="text-white ri-notification-4-line text-2xl"></i>
						}
						iconActive={
							<i className="text-white ri-notification-4-fill text-2xl"></i>
						}
						text="Notifications"
						to="/notifications"
						badge={true}
					/>
					<SidebarLink
						icon={<i className="text-white ri-mail-line text-2xl"></i>}
						iconActive={
							<i className="text-white ri-mail-fill text-2xl"></i>
						}
						text="Messages"
						to="/messages"
						badge={true}
					/>
					<SidebarLink
						icon={
							<i className="text-white ri-bookmark-line text-2xl"></i>
						}
						iconActive={
							<i className="text-white ri-bookmark-fill text-2xl"></i>
						}
						text="Bookmarks"
						to="/bookmarks"
					/>
					<SidebarLink
						icon={
							<i className="text-white ri-file-list-line text-2xl"></i>
						}
						iconActive={
							<i className="text-white ri-file-list-fill text-2xl"></i>
						}
						text="News"
						to="/news"
					/>
					<SidebarLink
						icon={<i className="text-white ri-user-line text-2xl"></i>}
						iconActive={
							<i className="text-white ri-user-fill text-2xl"></i>
						}
						text="Profile"
						to={`/profile/${user?._id}`}
					/>
					<SidebarLink
						icon={
							<i className="text-white ri-add-circle-line text-2xl"></i>
						}
						iconActive={
							<i className="text-white ri-add-circle-fill text-2xl"></i>
						}
						to="/tweet"
						text="Tweet"
					/>
				</div>
				<div
					className="account flex-center relative pointer-events-auto"
					onClick={() => {
						setShowModal(true);
						dispatch(openModal(true));
					}}
					ref={accountRef}
				>
					<div className="flex-center hoverAnimation space-x-2">
						<Avatar width={10} height={10} src={user?.avatar} />
						<div className="info-account text-white hidden xl:block">
							<p className="font-bold text-[15px]">{user?.fullname}</p>
							<span className="text-sm text-[#71767B]">
								@{user?.username}
							</span>
						</div>
					</div>
					{showModal && (
						<div
							className={`account-modal w-[300px] absolute -top-40 left-1 z-50 bg-black py-3 divide-y-[1px] border-color border-[1px] rounded-xl text-white xl:left-[120px]  ${
								modal && "pointer-events-auto"
							}`}
							ref={modalRef}
						>
							<div className="account-modal-header flex justify-between items-center py-3 px-4">
								<div className="flex gap-2">
									<Avatar
										width="w-12"
										height="h-12"
										src={user?.avatar}
									/>
									<div className="info-account">
										<p className="font-bold text-[15px]">
											{user?.fullname}
										</p>
										<span className="text-sm text-[#71767B]">
											@{user?.username}
										</span>
									</div>
								</div>
								<span>
									<i className="ri-check-line text-2xl text-[#1D9BF0]"></i>
								</span>
							</div>

							<div
								className="account-modal-body p-4 hover:bg-[#d9d9d9] hover:bg-opacity-10 cursor-pointer"
								onClick={() => setShowLogOutModal(true)}
							>
								<span>Log out @{user?.username}</span>
							</div>
						</div>
					)}
				</div>
			</div>
			{showLogOutModal && (
				<div className="fixed top-0 left-0 w-full h-screen z-50">
					<LogOutModal
						handleLogout={handleLogout}
						setShowLogOutModal={setShowLogOutModal}
					/>
				</div>
			)}
		</>
	);
};

export default Sidebar;
