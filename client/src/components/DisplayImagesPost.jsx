import React from "react";

const DisplayImagesPost = ({ images, setOpenPhotosSlide, setSelectImage }) => {
  return (
    <div
      className="w-full"
      onClick={() => {
        setOpenPhotosSlide(true);
      }}
    >
      {images.length === 1 && (
        <div className="images relative" onClick={() => setSelectImage(0)}>
          <img
            src={images[0].url}
            alt="img"
            className="rounded-xl object-cover max-h-[305px]"
          />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-2 w-full">
          {images.map((image, index) => (
            <div
              className="images relative"
              key={index}
              onClick={() => setSelectImage(index)}
            >
              <img
                src={image.url}
                alt="img"
                className="rounded-xl w-full h-[305px] object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {images.length === 3 && (
        <div className="grid grid-cols-2 gap-2">
          <div className="images relative" onClick={() => setSelectImage(0)}>
            <img
              src={images[0].url}
              alt="img"
              className="rounded-xl object-cover h-[305px] w-full"
            />
          </div>
          <div className="grid grid-rows-2 gap-2 h-[305px]">
            <div className="images relative" onClick={() => setSelectImage(1)}>
              <img
                src={images[1].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
            <div className="images relative" onClick={() => setSelectImage(2)}>
              <img
                src={images[2].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
      {images.length === 4 && (
        <div className="grid grid-cols-2 gap-2">
          <div className="grid grid-rows-2 gap-2 h-[305px]">
            <div className="images relative" onClick={() => setSelectImage(0)}>
              <img
                src={images[0].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
            <div className="images relative" onClick={() => setSelectImage(1)}>
              <img
                src={images[1].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          </div>
          <div className="grid grid-rows-2 gap-2 h-[305px]">
            <div className="images relative" onClick={() => setSelectImage(2)}>
              <img
                src={images[2].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
            <div className="images relative" onClick={() => setSelectImage(3)}>
              <img
                src={images[3].url}
                alt="img"
                className="rounded-xl object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayImagesPost;
