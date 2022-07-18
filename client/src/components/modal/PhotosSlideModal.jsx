import React, { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowSmLeftIcon, ArrowSmRightIcon } from "@heroicons/react/outline";

const PhotosSlideModal = ({ images, setOpenPhotosSlide, indexImage }) => {
  const [indexSlide, setIndexSlide] = useState(indexImage || 0);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);

  const imagesSwiper = images.map((image, index) => (
    <div className="h-full w-full">
      <img
        src={image.url}
        alt="image_instagram"
        className="object-cover w-full h-full"
      />
    </div>
  ));

  const handleSelectImage = (index) => {
    setIndexSlide((indexSlide) => {
      if (indexSlide === images.length - 1 && index === 1) return 0;
      else if (indexSlide === 0 && index === -1) return images.length - 1;
      else return indexSlide + index;
    });
  };

  const handleCloseSlide = (e) => {
    if (!!buttonRef.current) {
      if (
        !imageRef?.current.contains(e.target) &&
        !buttonRef?.current.contains(e.target)
      ) {
        setOpenPhotosSlide(false);
      }
    } else {
      if (!imageRef?.current.contains(e.target)) {
        setOpenPhotosSlide(false);
      }
    }
  };

  return (
    <div
      className="absolute w-full h-full top-0 left-0 z-30 bg-[#2D363C] bg-opacity-90 flex-center"
      onClick={handleCloseSlide}
    >
      <div
        className="absolute top-5 left-5 text-[30px] cursor-pointer z-50"
        onClick={() => setOpenPhotosSlide(false)}
      >
        <i className="ri-close-line hover:hoverAnimation2"></i>
      </div>

      <div className="w-3/4 h-[90vh]" ref={imageRef}>
        {imagesSwiper[indexSlide]}
      </div>

      {images.length > 1 && (
        <div ref={buttonRef}>
          <div className="prev absolute top-1/2 -translate-y-1/2 left-10 z-50 hover:hoverAnimation2 cursor-pointer">
            <ArrowSmLeftIcon
              className="w-8 h-8"
              onClick={() => handleSelectImage(-1)}
            />
          </div>
          <div className="next absolute top-1/2 -translate-y-1/2 right-10 z-50 hover:hoverAnimation2 cursor-pointer">
            <ArrowSmRightIcon
              className="w-8 h-8"
              onClick={() => handleSelectImage(1)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotosSlideModal;
