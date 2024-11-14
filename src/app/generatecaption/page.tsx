"use client";
import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter } from "react-icons/fa"; // Import Facebook and Twitter icons
import { FiType } from "react-icons/fi"; // Import the change font icon
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

const ImageCaptionGenerator: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("font-serif");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
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

  const handleGenerateCaption = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await fetch('http://localhost:5000/generatecaption', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setCaption(result.caption);
      } else {
        alert('Error generating caption: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const shareUrl = selectedImage ? URL.createObjectURL(selectedImage) : '';

  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-10">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-black">
          Generate Caption
        </h1>
        <div className="flex mt-2 mb-10 justify-center">
          <div className="w-[80px] h-1 rounded-full bg-teal-600 inline-flex" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center space-x-8">
        <div className="mb-4 mt-3">
          <div
            className={`w-[400px] h-[400px] border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 ${
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
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </>
            )}
            {selectedImage && (
              <Image
                src={URL.createObjectURL(selectedImage)}
                alt="Uploaded"
                width={400} // Increase image width
                height={400} // Increase image height
              />
            )}
          </div>
        </div>

        <div className="flex flex-col items-center">
          <input
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Generated Caption"
            className={`w-[500px] h-[100px] border-4 border-teal-700 border-solid bg-transparent outline-none px-10 shadow-lg text-teal-700 ${fontStyle}`}
          />
          <button
            className="mt-4 flex space-x-3 text-white bg-teal-800 px-4 py-2 rounded"
            onClick={handleGenerateCaption}
          >
            Generate
          </button>
          <div className="mt-4 flex space-x-3 text-teal-700">
            <FacebookShareButton
              url={shareUrl}
              quote={caption}
              className="flex items-center"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={caption}
              className="flex items-center"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
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
