import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-16 flex bg-purple-700 justify-between px-3 items-center text-white'>
      <div className="logo font-bold text-lg">
    <Link href="/">BitLinks</Link>
      </div>
      <ul className='flex gap-4 justify-center items-center'>
        <Link href="/"><li>Home</li></Link>
        <Link href="/about"><li>About</li></Link>
        <Link href="/shorten"><li>Shorten</li></Link>
        <Link href="/contact"><li>Contact Us</li></Link>
        <li className='flex gap-3 '>
          <Link href="/shorten"><button className='flex bg-purple-500 rounded shadow-lg p-3 font-bold py-1'>Try Now</button></Link>
          <Link href="/github"><button className='flex bg-purple-500 rounded shadow-lg p-3 font-bold py-1'>GitHub</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
