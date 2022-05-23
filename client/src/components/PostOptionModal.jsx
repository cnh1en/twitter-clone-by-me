import {
	BanIcon,
	DocumentAddIcon,
	FlagIcon,
	PencilIcon,
	TrashIcon,
	UserAddIcon,
	UserRemoveIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { openModal } from "../redux/modalSlice";
import { deleteComment } from "../redux/postSelectedSlice";
import { deletePost, updatePost, updatePostP2 } from "../redux/postSlice";
import { deletePostProfile } from "../redux/profileSlice";
import { deleteDataAPI, patchDataAPI } from "../utils/fetchData";
import RemovePostModal from "./modal/RemovePostModal";

const PostOptionModal = ({ auth, post }) => {
	const [openRemovePostModal, setRemovePostModal] = useState(false);
	const {
		postSelected,
		post: { posts },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { page, id } = useParams();
	const navigate = useNavigate();

	const handleRemovePost = async () => {
		try {
			dispatch(deletePost(post._id));
			if (page === "profile") {
				/// delete post from profile page
				dispatch(deletePostProfile(post._id));
				await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
				return;
			} else if (page === "post" && post._id === id) {
				/// delete post from post page
				if (
					postSelected.info.reply.length &&
					!posts.every((item) => item._id !== postSelected.info.reply[0])
				) {
					dispatch(
						updatePostP2({
							id: post._id,
							parentId: postSelected.info.reply[0],
						})
					);
				}

				await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
				navigate(-1);
				return;
			} else if (page === "post" && post._id !== id) {
				/// delete comment from post page
				// await patchDataAPI(
				// 	`comment/${post._id}`,
				// 	{ postId: post.reply[0] },
				// 	auth.token
				// );
				dispatch(
					updatePost({
						newPost: {
							...postSelected.info,
							comments: postSelected.info.comments.filter(
								(item) => item._id !== post._id
							),
						},
						id: postSelected.info._id,
					})
				);
				dispatch(deleteComment(post._id));
				await deleteDataAPI(`post/${post._id}/destroy`, auth.token);
				return;
			}
			await deleteDataAPI(`post/${post._id}/destroy`, auth.token);

			setRemovePostModal(false);
			dispatch(openModal(false));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="space-y-2">
				{auth.user._id !== post.user._id && (
					<>
						<div className="follow flex gap-4 items-center py-2">
							{!auth.user.following.every(
								(item) => item._id !== post.user._id
							) ? (
								<>
									<UserRemoveIcon className="h-5 text-[#71767B] " />
									<span className="font-[400] text-[15px]">
										Unfollow @{post.user.username}
									</span>
								</>
							) : (
								<>
									<UserAddIcon className="h-5 text-[#71767B] " />
									<span className="font-[400] text-[15px]">
										Follow @{post.user.username}
									</span>
								</>
							)}
						</div>
						<div className="follow flex gap-4 items-center py-2">
							<DocumentAddIcon className="h-5 text-[#71767B]" />
							<span className="font-[400] text-[15px]">
								Block @{post.user.username}
							</span>
						</div>
						<div className="follow flex gap-4 items-center py-2">
							<BanIcon className="h-5 text-[#71767B]" />
							<span className="font-[400] text-[15px]">
								Mute @{post.user.username}
							</span>
						</div>
						<div className="follow flex gap-4 items-center py-2">
							<FlagIcon className="h-5 text-[#71767B]" />
							<span className="font-[400] text-[15px]">
								Report @{post.user.username}
							</span>
						</div>
					</>
				)}
				{auth.user._id === post.user._id && (
					<>
						<div
							className="follow flex gap-4 items-center py-2 text-red-700"
							onClick={() => {
								setRemovePostModal(true);
							}}
						>
							<TrashIcon className="h-5" />
							<span className="font-[400] text-[15px]">Remove</span>
						</div>
						<div className="follow flex gap-4 items-center py-2">
							<PencilIcon className="h-5 text-[#71767B]" />
							<span className="font-[400] text-[15px]">Edit</span>
						</div>
					</>
				)}
			</div>
			{openRemovePostModal && (
				<div className="fixed top-0 left-0 w-full h-screen cursor-default">
					<RemovePostModal
						setRemovePostModal={setRemovePostModal}
						handleRemovePost={handleRemovePost}
					/>
				</div>
			)}
		</div>
	);
};

export default PostOptionModal;