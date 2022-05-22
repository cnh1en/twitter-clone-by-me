import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";

const News = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState("bitcoin");
	const [news, setNews] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`https://newsapi.org/v2/everything?q=${search}&apiKey=57f41659724b4f2893e226b1dba8e6a3`
			)
			.then((res) => {
				setNews(res.data.articles);
				setLoading(false);
			})
			.catch((error) => console.log(error));
	}, [search]);

	return (
		<div className="width-page overflow-auto scrollbar bg-black z-30">
			<div className="py-4 px-3 text-[20px] font-bold bg-transparent sticky top-0 bg-black z-20">
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-4">
						<span
							className="w-8 h-8 flex-center hover:hoverAnimation2"
							onClick={() => navigate(-1)}
						>
							<i className="ri-arrow-left-line text-xl cursor-pointer"></i>
						</span>
						<span className="font-bold">What's happening</span>
					</div>

					{/* <SearchBar /> */}
				</div>
			</div>

			<div className="news">
				{!loading ? (
					news.map((item, index) => (
						<div className="p-4" key={index}>
							<a
								href={item.url}
								target="_blank"
								rel="noreferrer"
								className="flex justify-between items-center"
							>
								<div>
									<span className="text-[#71767b] text-[13px]">
										{item.source.name}
									</span>
									<h1 className="font-bold text-[14px]">
										{item.title}
									</h1>
								</div>
								<div className="img">
									<img
										src={item.urlToImage}
										alt="img"
										className="w-[85px] h-[85px] rounded-xl object-cover"
									/>
								</div>
							</a>
						</div>
					))
				) : (
					<Loading />
				)}
			</div>
		</div>
	);
};

export default News;
