import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthUser } from "../../redux/authSlice";
import { setCallback } from "../../redux/callbackSlice";
import { updateProfileUser } from "../../redux/profileSlice";
import { patchDataAPI } from "../../utils/fetchData";
import { imageUpload } from "../../utils/imageUpload";
import Avatar from "../Avatar";
import LoadingLine from "../LoadingLine";

const EditProfile = ({ setEditProfile }) => {
	// REDUX
	const { auth, callback } = useSelector((state) => state);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	// STATE
	const [info, setInfo] = useState({
		name: auth.user.fullname,
		story: auth.user.story,
		address: auth.user.address,
		website: auth.user.website,
		avatar: auth.user.avatar,
		background: auth.user.background,
	});

	const [images, setImages] = useState({
		avatar: auth.user.avatar,
		background: auth.user.background,
	});

	const [check, setCheck] = useState({
		avatar: false,
		background: false,
	});
	//REF
	const avatarRef = useRef(null);
	const backgroundRef = useRef(null);

	// HANDLE
	const handleChangeInput = (e) => {
		setInfo({ ...info, [e.target.name]: e.target.value });
	};
	const handleChangeImage = (e) => {
		if (e.target.files[0]) {
			setInfo({
				...info,
				[e.target.name]: e.target.files[0],
			});
			setImages({
				...images,
				[e.target.name]: URL.createObjectURL(e.target.files[0]),
			});
			setCheck({ ...check, [e.target.name]: true });
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let avatarFinal = info.avatar,
			backgroundFinal = info.background;
		if (check.avatar) {
			const [avatar] = await imageUpload([info.avatar]);
			avatarFinal = avatar.url;
			setCheck({ ...check, avatar: false });
		}
		if (check.background) {
			const [background] = await imageUpload([info.background]);
			backgroundFinal = background.url;
			setCheck({ ...check, background: false });
		}

		patchDataAPI(
			`user/${auth.user._id}`,
			{ ...info, avatar: avatarFinal, background: backgroundFinal },
			auth.token
		)
			.then((res) => {
				dispatch(updateAuthUser(res.data.user));
				dispatch(updateProfileUser(res.data.user));
				setEditProfile(false);
				setLoading(false);
				dispatch(setCallback(!callback));
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="fixed top-0 left-0 w-full h-screen z-50 md:bg-transparent-config">
			<div className="absolute top-0 left-0 w-full z-30 md:md-tweet-post md:w-[600px] md:h-[650px] md:rounded-2xl bg-black h-screen overflow-auto scrollbar pb-8">
				<div className="edit-header px-3 sticky top-0 z-30 bg-transparent">
					{loading && <LoadingLine />}
					<div className="flex justify-between items-center py-2">
						<div className="flex items-center gap-6">
							<span className="w-[40px] h-[40px] hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full flex-center">
								<i
									className="ri-arrow-left-line cursor-pointer text-2xl md:hidden"
									onClick={() => setEditProfile(false)}
								></i>
								<i
									className="ri-close-line cursor-pointer text-2xl hidden md:block"
									onClick={() => setEditProfile(false)}
								></i>
							</span>
							<span className="text-[20px] font-[500]">
								Edit profile
							</span>
						</div>
						<button
							className="px-4 py-1 font-[500] rounded-full bg-white text-black max-w-max hover:bg-[#D7DBDC]"
							onClick={handleSubmit}
						>
							Save
						</button>
					</div>
				</div>

				<div className="edit-body relative">
					{loading && (
						<div className="absolute top-0 left-0 w-full h-full bg-black z-10 bg-transparent"></div>
					)}
					<div className="relative">
						<div className="background relative">
							<img
								src={images.background}
								alt="background"
								className="h-[191px] w-full object-cover"
							/>
							<div className="position-center flex gap-3">
								<span
									className="w-10 h-10 bg-[#0f1419bf] bg-opacity-50 cursor-pointer rounded-full flex-center hover:bg-[#272c30bf]"
									onClick={() => backgroundRef.current.click()}
								>
									<i className="ri-camera-line text-[20px]"></i>
									<input
										type="file"
										className="hidden"
										name="background"
										ref={backgroundRef}
										onChange={handleChangeImage}
									/>
								</span>
								<span className="w-10 h-10 bg-[#0f1419bf] bg-opacity-50 cursor-pointer rounded-full flex-center hover:bg-[#272c30bf]">
									<i className="ri-close-line text-[20px]"></i>
								</span>
							</div>
						</div>

						<div className="absolute left-4 -bottom-[56px]">
							<Avatar src={images.avatar} width="w-28" height="h-28" />
							<span
								className="position-center w-10 h-10 bg-[#0f1419bf] bg-opacity-50 cursor-pointer rounded-full flex-center hover:bg-[#272c30bf]"
								onClick={() => avatarRef.current.click()}
							>
								<i className="ri-camera-line text-[20px]"></i>
								<input
									type="file"
									name="avatar"
									className="hidden"
									ref={avatarRef}
									onChange={handleChangeImage}
								/>
							</span>
						</div>
					</div>

					<div className="form mt-[80px] w-full p-3 space-y-6">
						{/* NAME */}
						<div className="relative">
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-3 pt-7 pb-3 bg-black border-2 border-color rounded-md focus:outline-none focus:border-[#1D9BF0] peer"
								value={info.name}
								onChange={handleChangeInput}
								maxLength="50"
							/>
							<label
								htmlFor="name"
								className={`absolute text-[16px] left-3 top-3 peer-focus:text-[12px] peer-focus:text-[#1D9BF0] duration-100 text-[#71767B] transform ${
									info.name && "text-[12px]"
								}`}
							>
								Name
							</label>

							<span className="absolute top-3 right-3 text-[12px] hidden peer-focus:block">
								{info.name.length} / 50
							</span>
						</div>

						{/* BIO */}
						<div className="relative">
							<textarea
								type="text"
								id="story"
								name="story"
								rows="4"
								className="w-full px-3 pt-7 pb-3 bg-black border-2 border-color rounded-md focus:outline-none focus:border-[#1D9BF0] peer scrollbar"
								value={info.story}
								onChange={handleChangeInput}
								maxLength="160"
							></textarea>
							<label
								htmlFor="story"
								className={`absolute text-[16px] text-[#71767B] left-3 top-3 peer-focus:text-[12px] peer-focus:text-[#1D9BF0] duration-100 transform ${
									info.story && "text-[12px]"
								}`}
							>
								Bio
							</label>
							<span className="absolute top-3 right-3 text-[12px] hidden peer-focus:block">
								{info.story.length} / 160
							</span>
						</div>

						{/* LOCATION */}
						<div className="relative">
							<input
								type="text"
								id="address"
								name="address"
								className="w-full px-3 pt-7 pb-3 bg-black border-2 border-color rounded-md focus:outline-none focus:border-[#1D9BF0] peer"
								value={info.address}
								onChange={handleChangeInput}
								maxLength="30"
							/>
							<label
								htmlFor="address"
								className={`absolute text-[16px] text-[#71767B] left-3 top-3 peer-focus:text-[12px] peer-focus:text-[#1D9BF0] duration-100 transform ${
									info.address && "text-[12px]"
								}`}
							>
								Location
							</label>
							<span className="absolute top-3 right-3 text-[12px] hidden peer-focus:block">
								{info.address.length} / 30
							</span>
						</div>

						{/* WEBSITE */}
						<div className="relative">
							<input
								type="text"
								id="website"
								name="website"
								className="w-full px-3 pt-7 pb-3 bg-black border-2 border-color rounded-md focus:outline-none focus:border-[#1D9BF0] peer"
								value={info.website}
								onChange={handleChangeInput}
								maxLength="100"
							/>
							<label
								htmlFor="website"
								className={`absolute text-[16px] text-[#71767B] left-3 top-3 peer-focus:text-[12px] peer-focus:text-[#1D9BF0] duration-100 transform ${
									info.website && "text-[12px]"
								}`}
							>
								Website
							</label>
							<span className="absolute top-3 right-3 text-[12px] hidden peer-focus:block">
								{info.website.length} / 100
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
