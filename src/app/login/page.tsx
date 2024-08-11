import React from 'react'
import Image from 'next/image'

const Page = () => {
  return (
    <div className="flex justify-center items-center mt-12">
      <div className="card w-full md:w-96 bg-white shadow-xl">
        <figure className="px-10 flex flex-col items-center">
          <div className="aspect-w-1 aspect-h-1">
            <Image src="/pic/logoIMCU.png" alt="logo for image captioning" width={130} height={130} />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-teal-700 mt-2">Login</h1>
        </figure>

        {/* Signup form */}
        <div className="p-8 mt-0">
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 block w-full rounded-md bg-white border border-gray-300 text-black" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 w-80 bg-teal-700 text-white rounded-md  hover:bg-gray-700">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Page;
