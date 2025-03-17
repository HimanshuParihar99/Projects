import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full fixed bottom-0' >
<div>
<div className="logo font-bold text-2xl ">
         <span className="text-green-500">&lt;</span>
          Pass
         <span className="text-green-500">OP/&gt;</span>
          </div>
</div>
    
    <div className='flex items-center gap-2'>
    Created with <img src="/icons/heart.svg" className='w-5' alt="" /> by Himanshu Parihar
    </div>
      </div>
  )
}

export default Footer
