import React from 'react'
import Link from 'next/link'
import Image from 'next/image'




const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-white text-black">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[3] p-2 text-black text-sm font-medium  ">
              <li><Link href={"/generatecaption"}>Generate Caption</Link></li>
              <li><Link href={"/"}>User Guide</Link></li>
              <li><Link href={"/pricing"}>Pricing</Link></li>
            </ul>
          </div>
         <Image src="/pic/logoIMCU.png" alt="logo for image captioning" width={150} height={150} /> 
        </div>

        <div className="flex justify-between items-center">
  <div className="navbar-center lg:flex flex-grow hidden justify-center mt-0">
    <ul className="menu menu-horizontal px-5 text-gray-700 flex justify-center scroll-m-20 text-sm font-bold tracking-tight ">
    <li className=' text-teal-700 '><Link href={"/"}>Home</Link></li>
      <li className=' hover:text-teal-700' ><Link href={"/generatecaption"}>Generate Caption</Link></li>
      <li className='  hover:text-teal-700'><Link href={"/"}>User Guide</Link></li>
      <li className=' hover:text-teal-700'><Link href={"/pricing"}>Pricing</Link></li>
    </ul>
  </div>
  <div className="flex ">
  <Link href="/signup">
              <div className="btn h-3 w-32  bg-teal-700 outline outline-offset-2 outline-1 btn-outline hover:bg-transparent hover:outline-teal-900 text-white hover:rounded-2xl duration-300 ml-[34px]">Get Started</div>
            </Link>
</div>
</div>

</div>
</div>

 
 
   
     
  )
}

export default Navbar
