import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='flex fixed justify-between bg-white top-12 w-[90vw] rounded-full p-4 px-7 right-[6vw]'>
      <div className="logo flex gap-4">
        <Image loading="lazy" width={118} height={56} src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" className="nav-desktop-logo" />
        <ul className='flex gap-10 mx-5 items-center text-[#3a3a3ae6] font-semibold text-[16px]'>
          <li>Products</li>
          <li>Templates</li>
          <li>Marketplace</li>
          <li>Learn</li>
          <li>Pricing</li>
        </ul>
      </div>
      <div className='flex gap-3 font-semibold items-center text-[18px]'>
        <button className="login bg-gray-200 p-4 rounded-lg">Log in</button>
        <button className="signup bg-gray-900 p-4 rounded-full text-white">Sign up free</button>
      </div>
    </nav>
  )
}

export default Navbar
