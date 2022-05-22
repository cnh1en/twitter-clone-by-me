import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchPostSelected } from "../../redux/postSelectedSlice";
import MyPost from "../../components/post/Post";
import Loading from "../../components/Loading";
import { unwrapResult } from "@reduxjs/toolkit";
import Chicken from "../../images/chicken.png";

const Post = () => {
	const { auth, postSelected } = useSelector((state) => state);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [nullPage, setNullPage] = useState(true);

	useEffect(() => {
		if (postSelected.info) {
			document.title = `@${postSelected.info.user?.username} on Twitter`;
		}
	}, [postSelected.info]);
	useEffect(() => {
		if (id) {
			dispatch(fetchPostSelected({ id, token: auth.token }))
				.then(unwrapResult)
				.then((result) => {
					if (!result.post) {
						setNullPage(true);
						console.log(result.post);
					} else setNullPage(false);
				});
		}
	}, [id, auth.token, dispatch]);
	return (
		<div className="width-page overflow-auto h-screen scrollbar">
			<div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20">
				<div className="flex items-center gap-4">
					<span
						className="w-8 h-8 flex-center hover:hoverAnimation2"
						onClick={() => navigate(-1)}
					>
						<i className="ri-arrow-left-line text-xl cursor-pointer"></i>
					</span>
					<span className="font-bold">Tweet</span>
				</div>
			</div>

			{!postSelected.loading ? (
				<>
					<div className="post">
						{!nullPage ? (
							<>
								<div className="border-b-[1px] border-color">
									<MyPost post={postSelected.info} />
								</div>
								<div className="comments">
									{postSelected.info?.comments?.map((item, index) => (
										<MyPost post={item} key={item._id} />
									))}
								</div>
							</>
						) : (
							<div className="md:w-[400px] w-[280px] mx-auto my-8 text-center">
								<img
									src={Chicken}
									alt="chicken"
									className="object-cover"
								/>
								<h1 className="font-bold text-white text-[20px]">
									Hmm...this page doesn’t exist. Try searching for
									something else.
								</h1>
							</div>
						)}
					</div>
				</>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Post;
