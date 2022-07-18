import React from "react";

const DisplayImages = ({ images, setImages }) => {
	return (
		<div className="w-full">
			{images.length === 1 && (
				<div className="images relative">
					<img
						src={URL.createObjectURL(images[0])}
						alt="img"
						className="rounded-xl object-cover max-h-[305px]"
					/>
					<div
						className="absolute top-1 left-1"
						onClick={() => setImages([])}
					>
						<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
					</div>
				</div>
			)}
			{images.length === 2 && (
				<div className="grid grid-cols-2 gap-2 w-full">
					{images.map((image, index) => (
						<div className="images relative">
							<img
								src={URL.createObjectURL(image)}
								alt="img"
								className="rounded-xl w-full h-[305px] object-cover"
							/>

							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(
										images.filter((item, idx) => idx !== index)
									)
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
					))}
				</div>
			)}
			{images.length === 3 && (
				<div className="grid grid-cols-2 gap-2">
					<div className="images relative">
						<img
							src={URL.createObjectURL(images[0])}
							alt="img"
							className="rounded-xl object-cover h-[305px] w-full"
						/>
						<div
							className="absolute top-1 left-1"
							onClick={() =>
								setImages(images.filter((item, idx) => idx !== 0))
							}
						>
							<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
						</div>
					</div>
					<div className="grid grid-rows-2 gap-2 h-[305px]">
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[1])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>

							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 1))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[2])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>

							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 2))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
					</div>
				</div>
			)}
			{images.length === 4 && (
				<div className="grid grid-cols-2 gap-2">
					<div className="grid grid-rows-2 gap-2 h-[305px]">
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[0])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>

							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 0))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[1])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>

							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 1))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
					</div>
					<div className="grid grid-rows-2 gap-2 h-[305px]">
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[2])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>
							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 2))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
						<div className="images relative">
							<img
								src={URL.createObjectURL(images[3])}
								alt="img"
								className="rounded-xl object-cover h-full w-full"
							/>
							<div
								className="absolute top-1 left-1"
								onClick={() =>
									setImages(images.filter((item, idx) => idx !== 3))
								}
							>
								<i className="ri-close-line text-2xl bg-slate-600 hoverAnimation xl:p-0"></i>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DisplayImages;
