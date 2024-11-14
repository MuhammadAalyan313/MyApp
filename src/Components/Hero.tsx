"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter } from "react-icons/fa"; // Import Facebook and Twitter icons
import { FiType } from "react-icons/fi"; // Import the change font icon

const DragAndDropImage: React.FC = () => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [droppedImage, setDroppedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState<string>('');
  const [fontStyle, setFontStyle] = useState<string>("font-serif");

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setDroppedImage(reader.result as string);
      }
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(e.target.value);
  };

  const handleFontChange = () => {
    setFontStyle((prev) => (prev === "font-serif" ? "font-sans" : "font-serif"));
  };

  const handleGenerateCaption = () => {
    if (droppedImage && caption) {
      alert(`Your caption: "${caption}" for the uploaded image is ready!`);
    } else {
      alert('Please upload an image and enter a caption.');
    }
  };

  return (
    <div>
      {/* Main Content */}
      <div className='mb-[100px]'>
        <div className="relative min-h-[80vh] flex items-center justify-between">
          {/* Content Wrapper */}
          <div className="relative flex w-full h-full">
            {/* Blob on the left side */}
            <div className="relative w-1/2 p-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/pic/blob.jpeg')" }}
              ></div>
              <div className="absolute top-10 left-10 text-white z-10">
                <h1 className="mt-10 text-4xl font-extrabold tracking-tight lg:text-5xl">Caption Your Image</h1>
                <p className="mb-9 mt-9">
                  This platform empowers you to transform your <br/> special moments into expressive captions,<br />
                  Capture the essence of your memories with words,<br/>preserving them for eternity and sharing <br/>
                  them with loved ones.
                </p>
                <div className="flex justify-centre ml-28">
                  <Link href="/signup" className="btn h-10 w-32 bg-teal-900 outline outline-offset-2 outline-1 btn-outline text-white hover:rounded-2xl duration-300 flex items-center justify-center cursor-pointer">
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Character image on the right side */}
            <div className="relative w-1/2 p-5 flex items-center justify-center">
              <div 
                className="relative w-[500px] h-[500px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/pic/Charac.png')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Trial Section */}
      <div className="text-center mb-10 mt-14 ml-10">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-black">
          Trial
        </h1>
        <div className="flex mt-2 mb-10 justify-center">
          <div className="w-[80px] h-1 rounded-full bg-teal-600 inline-flex" />
        </div>
      </div>

      {/* Drag & Drop Section */}
      <div className="flex flex-col md:flex-row items-center justify-start md:justify-start ml-36">
        <div className="mr-4 mb-4 mt-3 md:mb-0 md:ml-36">
          <div
            className={`w-96 h-80 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 ${
              dragging ? 'bg-gray-100' : ''
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!droppedImage && <p>Drag & drop image here</p>}
            {droppedImage && (
              <Image src={droppedImage} alt="Uploaded" width={300} height={300} />
            )}
          </div>
          <div className="flex flex-wrap justify-center mt-6">
            <div className="w-24 h-20 mr-2">
              <Image src="/pic/cat.jpg" alt="Image 1" width={100} height={100} />
            </div>
            <div className="w-24 h-20 mr-2">
              <Image src="/pic/dog.jpg" alt="Image 2" width={100} height={100} />
            </div>
            <div className="w-24 h-20 mr-2">
              <Image src="/pic/bird.jpg" alt="Image 3" width={100} height={100} />
            </div>
          </div>
        </div>

        <div className="relative">
          <input
            type="text"
            value={caption}
            onChange={handleCaptionChange}
            placeholder="Generating...."
            className={`w-96 h-36 border-4 border-teal-700 border-solid bg-transparent outline-none px-10 mb-24 ml-6 shadow-lg ${fontStyle}`}
          />
          <button
            className="absolute bottom-12 left-8 flex space-x-3 text-white bg-teal-800 px-4 py-2 rounded"
            onClick={handleGenerateCaption}
          >
            Generate
          </button>
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

export default DragAndDropImage;
