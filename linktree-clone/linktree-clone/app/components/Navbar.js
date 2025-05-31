import React from 'react'
import Image from 'next/image'
const Navbar = () => {
  return (
    <nav className='bg-white absolute top-10 w-[85vw] rounded-full p-7 right-[7vw]'>
      <div className="logo">
        <Image loading="lazy" width={118} height={56} src="https://cdn.prod.website-files.com/666255f7f2126f4e8cec6f8f/66634daccb34e6d65a41c76d_download.svg" alt="" className="nav-desktop-logo" />
      </div>
    </nav>
  )
}

export default Navbar
