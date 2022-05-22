import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loading } from "../../redux/loadSlice";
import { getPosts } from "../../redux/postSlice";
import Header from "../header/Header";
import Input from "../Input";
import Post from "../post/Post";

const Feed = () => {
	const {
		post: { posts },
		auth,
	} = useSelector((state) => state);
	const param = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Home / Twitter";
	}, [param]);

	useEffect(() => {
		if (auth.token) {
			dispatch(loading(true));
			dispatch(getPosts(auth.token));
			dispatch(loading(false));
		}
	}, [auth, dispatch]);

	return (
		<div className="width-page text-white h-screen overflow-auto scrollbar-thin z-10 pb-8">
			<Header />
			<Input animation={true} />
			<div className="divide-y-[1px] divide-[#2F3336] border-t-[1px] border-color">
				{posts.map((post) => (
					<Post post={post} key={post._id} />
				))}
			</div>
		</div>
	);
};

export default Feed;
