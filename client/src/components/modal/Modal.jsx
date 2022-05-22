import React from "react";

const Modal = ({ children, showModal }) => {
	return (
		<div
			className={`fixed top-0 left-0 w-full h-screen overflow-auto z-30 bg-black hidden ${
				showModal && "block"
			}`}
		>
			{children}
		</div>
	);
};

export default Modal;
