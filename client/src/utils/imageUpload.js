import axios from "axios";

export const checkImage = (file) => {
	let err = "";
	if (!file) return (err = "File does not exist");
	if (file.size > 1024 * 1024) {
		err = "The largest image size is 1mb.";
	}
	if (file.type !== "image/jpeg" && file.type !== "image/png") {
		err = "Image format is incorrect.";
	}
	return err;
};
export const imageUpload = async (images) => {
	let imgArr = [];
	for (const item of images) {
		const formData = new FormData();
		if (item.camera) {
			formData.append("file", item.camera);
		} else {
			formData.append("file", item);
			formData.append("upload_preset", "frzurm2f");
			formData.append("cloud_name", "cnh1en");
			const res = await axios.post(
				"https://api.cloudinary.com/v1_1/cnh1en/upload",
				formData
			);
			console.log(res.data);
			imgArr.push({
				public_id: res.data.public_id,
				url: res.data.secure_url,
			});
		}
	}
	return imgArr;
};
