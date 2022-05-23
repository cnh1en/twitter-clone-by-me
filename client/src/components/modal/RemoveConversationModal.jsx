import React from "react";

const RemoveConversationModal = ({
	handleRemoveConversation,
	setShowRemoveConversationModal,
}) => {
	return (
		<div className="fixed w-full h-screen top-0 left-0 z-50 bg-black bg-transparent-config flex-center">
			<div className="w-[350px] p-8 bg-black borders-[1px] border-color rounded-2xl">
				<div className="top">
					<h1 className="text-[20px] mb-2 font-bold">
						Leave conversation?
					</h1>
					<p className="text-[15px] text-[#71767b] text-left leading-[18px]">
						This conversation will be deleted from your inbox. Other
						people in the conversation will still be able to see it.
					</p>
				</div>

				<div className="bottom mt-6">
					<div className="buttons flex flex-col gap-4">
						<button
							className="font-[700] text-[15px] rounded-full bg-red-700 py-3 border-[1px] border-color pointer-events-auto"
							onClick={handleRemoveConversation}
						>
							Leave
						</button>
						<button
							className="font-[700] text-[15px] rounded-full py-3 border-[1px] border-color pointer-events-auto"
							onClick={() => setShowRemoveConversationModal(false)}
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RemoveConversationModal;
