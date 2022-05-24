import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { openModal } from "../redux/modalSlice";
import { comment, commentInComment } from "../redux/postSelectedSlice";
import { createComment, createPost } from "../redux/postSlice";
import { postDataAPI } from "../utils/fetchData";
import { imageUpload } from "../utils/imageUpload";
import Avatar from "./Avatar";
import LoadingLine from "./LoadingLine";
import TextareaAutosize from "react-textarea-autosize";
import { unwrapResult } from "@reduxjs/toolkit";
import { createNotify } from "../redux/notifySlice";
import { updatePostInBookmarks } from "../redux/bookmarkSlice";

const Input = ({
	back,
	replyPost,
	setShowReply,
	setStartAnimation,
	animation,
}) => {
	// STATE
	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [animationLoading, setAnimationLoading] = useState(false);
	const [hiddenFooterInput, setHiddenFooterInput] = useState(false);
	// ROUTER
	const navigate = useNavigate();
	const { page, id } = useParams();
	// REF
	const inputImageRef = useRef(null);
	const emojisPickerRef = useRef(null);
	const smileRef = useRef(null);
	// REDUX
	const dispatch = useDispatch();
	const { auth, socket } = useSelector((state) => state);

	//HANDLE
	const handleChangeImages = (e) => {
		if (e.target.files) {
			setImages([...images, ...e.target.files]);
		}
	};
	const handleCloseImages = (e) => {
		setImages([]);
	};
	const handleChangeInput = (e) => {
		setContent(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let media = [];
		try {
			setStartAnimation && setStartAnimation(true);
			animation && setAnimationLoading(true);
			setHiddenFooterInput(true);
			if (images.length > 0) {
				media = await imageUpload(images);
			}
			// CREATE POST
			if (!replyPost) {
				const resultAction = await dispatch(
					createPost({
						token: auth.token,
						post: { content, images: media },
						socket,
					})
				);
				const result = unwrapResult(resultAction);
				socket.socketClient.emit("createPost", { post: result.newPost });

				const msg = {
					id: result.newPost._id,
					text: "added a new post",
					recipients: result.newPost.user.followers,
					url: `/post/${result.newPost._id}`,
					content,
					image: media.length ? media[0].url : "",
					user: auth.user,
					isRead: false,
					action: "post",
				};
				const res = await postDataAPI("notify", msg, auth.token);
				socket.socketClient.emit("createNotify", {
					msg: { ...msg, _id: res.data.notify._id },
				});

				back && navigate(-1);
				setContent("");
				setImages([]);
			}
			/// CREATE COMMENT
			else {
				const res = await postDataAPI(
					"posts",
					{
						content,
						images: media,
						reply: [replyPost._id],
					},
					auth.token
				);
				await dispatch(
					createComment({
						newPost: res.data.newPost,
						id: replyPost._id,
					})
				);
				socket.socketClient.emit("createComment", {
					newPost: res.data.newPost,
					replyPost,
				});

				if (page === "post" && id === replyPost._id) {
					dispatch(
						comment({
							_id: res.data.newPost._id,
							content,
							images: media,
							comments: [],
							reply: [replyPost._id],
							retweet: [],
							likes: [],
							user: auth.user,
						})
					);
				} else if (page === "post" && id !== replyPost._id) {
					/// add comment in comment
					dispatch(
						commentInComment({
							id: replyPost._id,
							comment: res.data.newPost._id,
						})
					);
				} else if (page === "bookmarks") {
					const newPost = {
						...replyPost,
						comments: [...replyPost.comments, res.data.newPost._id],
					};
					dispatch(updatePostInBookmarks(newPost));
				}

				if (replyPost.user._id !== auth.user._id) {
					const msg = {
						id: res.data.newPost._id,
						text: "comments in your post",
						recipients: [replyPost.user._id],
						url: `/post/${replyPost._id}`,
						content,
						image: replyPost.images.length ? replyPost.images[0].url : "",
						user: auth.user,
						isRead: false,
						action: "comment",
					};
					const result = await postDataAPI("notify", msg, auth.token);
					socket.socketClient.emit("createNotify", {
						msg: { ...msg, _id: result.data.notify._id },
					});
				}
				setStartAnimation && setStartAnimation(false);
				setContent("");
				setImages([]);
				setShowReply(false);
			}
			animation && setAnimationLoading(false);
			setHiddenFooterInput(false);
		} catch (error) {
			console.log(error);
		}
	};

	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setContent(content + emoji);
	};

	// EFFECT
	useEffect(() => {
		const handleCloseModal = (e) => {
			if (
				!smileRef.current.contains(e.target) &&
				emojisPickerRef.current &&
				!emojisPickerRef.current.contains(e.target)
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
		<div className="space-y-2">
			{animationLoading && <LoadingLine />}
			<div className="input flex gap-3 px-4 bg-black">
				<Avatar width="w-12" height="h-12" src={auth.user?.avatar} />

				<div className="input-post grow">
					<div className="relative">
						<TextareaAutosize
							name="status"
							id="status"
							minRows="2"
							className={`w-full bg-transparent focus:outline-none text-xl ${
								hiddenFooterInput && "text-[#d9d9d9]"
							}`}
							placeholder="What's happening?"
							onChange={handleChangeInput}
							value={content}
							maxLength="200"
							disabled={hiddenFooterInput}
						/>

						{images.length > 0 && !hiddenFooterInput && (
							<div className="images pb-3 relative">
								<img
									src={URL.createObjectURL(images[0])}
									alt="img"
									className="rounded-xl h-[220px] object-cover"
								/>
								<div
									className="absolute top-1 left-1"
									onClick={handleCloseImages}
								>
									<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
								</div>
							</div>
						)}
					</div>
					<div
						className={`text-[#1D9BF0] flex justify-between py-2 ${
							hiddenFooterInput && "hidden"
						}`}
					>
						<div className="space-x-3">
							<i
								className="ri-image-line text-xl hoverAnimation xl:p-1"
								onClick={() => inputImageRef.current.click()}
							></i>
							<span
								className="relative pointer-events-auto"
								ref={smileRef}
							>
								<i
									className="ri-emotion-happy-line text-xl hoverAnimation xl:p-1"
									onClick={() => {
										dispatch(openModal(!showModal));
										setShowModal(!showModal);
									}}
								></i>

								{showModal && (
									<span ref={emojisPickerRef}>
										<Picker
											onSelect={addEmoji}
											style={{
												position: "absolute",
												marginTop: "36px",
												marginLeft: "-36px",
												maxWidth: "320px",
												borderRadius: "20px",
												pointerEvents: "auto",
												zIndex: "10",
											}}
											theme="dark"
										/>
									</span>
								)}
							</span>
							<i className="ri-map-pin-2-line text-xl hoverAnimation xl:p-1"></i>
						</div>

						{/* INPUT IMAGES */}
						<input
							type="file"
							className="hidden"
							ref={inputImageRef}
							onChange={handleChangeImages}
						/>

						<div className="space-x-4">
							<span className="text-[12px]">{content.length} / 200</span>
							<button
								className={`py-2 px-5 rounded-full bg-[#1D9BF0] text-white font-[500] text-[14px] ${
									!content.length && "opacity-60"
								}`}
								onClick={handleSubmit}
								disabled={content.length ? false : true}
							>
								Tweet
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Input;
