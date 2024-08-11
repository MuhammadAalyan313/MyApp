import React from 'react'
import Image from 'next/image'

const Services = () => {
  return (
    <section className="body-font mb-[100px] mt-[100px]">
      <div className="container px-5 mx-auto">
        <div className="text-center mb-10">
          <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-black">
            Our Services
          </h1>
          <div className="flex mt-2 mb-10 justify-center">
            <div className="w-[80px] h-1 rounded-full bg-teal-600 inline-flex" />
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          <div className="p-4 mx-auto lg:w-1/3 flex flex-col text-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                <Image 
                  src={require("../../public/pic/custom.png")}
                  alt="Customize" 
                  width={100} 
                  height={100}
                  className='w-20 h-20'
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-bold capitalize">
                  Customization
                </h2>
                <p className="scroll-m-20 text-lg tracking-tight first:mt-0 mt-3 text-black">
                  You can captioned images with different styles, fonts, and layouts.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 mx-auto lg:w-1/3 flex flex-col text-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                <Image 
                  src={require("../../public/pic/sup.png")}
                  alt="Customer Service" 
                  width={100} 
                  height={100}
                  className='w-20 h-20 mb-2'
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-bold capitalize">
                  24/7 Customer Service
                </h2>
                <p className="scroll-m-20 text-lg tracking-tight first:mt-0 mt-3 text-black">
                  Our support team is available 24/7 to assist with any questions you may have.
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 mx-auto lg:w-1/3 flex flex-col text-center items-center">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full mb-5 flex-shrink-0">
                <Image 
                  src={require("../../public/pic/share.png")}
                  alt="Sharing" 
                  width={50} 
                  height={50}
                  className='w-20 h-20 mb-2'
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-bold capitalize">
                  Sharing
                </h2>
                <p className="scroll-m-20 text-lg tracking-tight first:mt-0 mt-3 text-black">
                  You can easily share your captioned images on various social networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
