import React from "react";
import { useRef } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

const ShareModal = ({ url, setShareModal }) => {
  const shareRef = useRef(null);
  const handleCloseShareModal = (e) => {
    if (!shareRef?.current.contains(e.target)) {
      setShareModal(false);
    }
  };

  return (
    <div
      className="absolute w-full h-full top-0 left-0 z-30 bg-black bg-transparent-config py-2 overflow-auto flex-center"
      onClick={handleCloseShareModal}
    >
      <div
        className="share-modal bg-black w-[440px] rounded-2xl px-6 pt-3 pb-8 dark:bg-white"
        ref={shareRef}
      >
        <div className="flex items-center justify-center border-b border-color py-3 dark:border-gray-300 -mx-6">
          <span className="font-[600] text-xl text-white dark:text-black">
            Share
          </span>
        </div>

        <div>
          <p className="my-5 text-white dark:text-black">Share this link via</p>
          <div className="flex justify-between mt-3 mb-8">
            <div data-tip data-for="facebookTip">
              <FacebookShareButton url={url}>
                <FacebookIcon round={true} size={44} />
              </FacebookShareButton>
              <ReactTooltip
                id="facebookTip"
                place="bottom"
                effect="solid"
                delayShow={600}
              >
                Facebook
              </ReactTooltip>
            </div>

            <div data-tip data-for="twitterTip">
              <TwitterShareButton url={url}>
                <TwitterIcon round={true} size={44} />
              </TwitterShareButton>
              <ReactTooltip
                id="twitterTip"
                place="bottom"
                effect="solid"
                delayShow={600}
              >
                Twitter
              </ReactTooltip>
            </div>

            <div data-tip data-for="emailTip">
              <EmailShareButton url={url}>
                <EmailIcon round={true} size={44} />
              </EmailShareButton>
              <ReactTooltip
                id="emailTip"
                place="bottom"
                effect="solid"
                delayShow={600}
              >
                Email
              </ReactTooltip>
            </div>

            <div data-tip data-for="telegramTip">
              <TelegramShareButton url={url}>
                <TelegramIcon round={true} size={44} />
              </TelegramShareButton>
              <ReactTooltip
                id="telegramTip"
                place="bottom"
                effect="solid"
                delayShow={600}
              >
                Telegram
              </ReactTooltip>
            </div>

            <div data-tip data-for="whatsupTip">
              <WhatsappShareButton url={url}>
                <WhatsappIcon round={true} size={44} />
              </WhatsappShareButton>
              <ReactTooltip
                id="whatsupTip"
                place="bottom"
                effect="solid"
                delayShow={600}
              >
                What's up
              </ReactTooltip>
            </div>
          </div>
        </div>

        <div>
          <p className="my-5 text-white dark:text-black">Or copy link</p>
          <div className="flex border border-color p-2 rounded-md gap-1 dark:border-gray-300">
            <input
              type="text"
              className="outline-none border-none bg-black flex-grow dark:bg-white dark:text-gray-700"
              value={url}
            />
            <button
              className="bg-[#1d9bf0] py-2 px-3 rounded-md hover:opacity-80 text-[13px]"
              onClick={() => {
                navigator.clipboard.writeText(url);
                toast("Copied!!!");
              }}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
