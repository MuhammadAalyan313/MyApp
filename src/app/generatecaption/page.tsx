"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter } from "react-icons/fa"; // Import Facebook and Twitter icons
import { FiType } from "react-icons/fi"; // Import the change font icon

const ImageCaptionGenerator: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("font-serif");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleCaptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  const handleFontChange = () => {
    setFontStyle((prev) =>
      prev === "font-serif" ? "font-sans" : "font-serif"
    );
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-black">
          Generate Caption
        </h1>
        <div className="flex mt-2 mb-10 justify-center">
          <div className="w-[80px] h-1 rounded-full bg-teal-600 inline-flex" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-start md:justify-start ml-36">
        <div className="mr-4 mb-4 mt-3 md:mb-0 md:ml-36">
          <div
            className={`w-96 h-80 mb-16 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 ${
              selectedImage ? "bg-gray-100" : ""
            }`}
          >
            {!selectedImage && (
              <>
                <p>Drag & drop image here</p>
                <label
                  htmlFor="file-input"
                  className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center cursor-pointer"
                >
                  {/* <AiOutlinePlus className="text-4xl" /> */}
                </label>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
            {selectedImage && (
              <Image
                src={selectedImage}
                alt="Uploaded"
                width={300}
                height={300}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Generating Caption in Urdu"
            className={`w-96 h-32 border-4 border-teal-700 border-solid bg-transparent outline-none px-10 mb-24 ml-6 mt-14 shadow-lg text-teal-700 ${fontStyle}`}
          />
          {/* Icons placed at the bottom right */}
          <div className="absolute bottom-12 right-6 flex space-x-3 text-teal-700">
            <FaFacebookF className="text-xl cursor-pointer" />
            <FaTwitter className="text-xl cursor-pointer" />
            <FiType
              className="text-2xl font-extrabold cursor-pointer"
              onClick={handleFontChange}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCaptionGenerator;
