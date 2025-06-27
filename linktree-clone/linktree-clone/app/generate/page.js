"use client"
import React from 'react'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { toast } from 'react-toastify'

const Generate = () => {

const [link, setlink] = useState("");
const [pic, setpic] = useState("");
const [handle, sethandle] = useState("");
const [linktext, setlinktext] = useState("");

  const addLink = async (text, link, handle) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "link": link,
      "linktext": text,
      "handle": handle
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

 const r = await fetch("http://localhost:3000/api/add", requestOptions)
const result = await r.json();
toast(result.message)
setlink("");
setlinktext("");
  }

  return (
    <>
      <div className='bg-[#e9c0e9] min-h-screen grid grid-cols-2'>
        <div className="col1 flex justify-center items-center flex-col text-center text-gray-900">
          <h1 className='font-bold text-4xl mb-8'>Create your BitTree</h1>
          <h2 className='font-semibold text-2xl'>Step:1 Claim your Handle</h2>
          <div className="item mx-4">
            <input value={handle || ""} onChange={e=>{sethandle(e.target.value)}} className='px-5 py-3 focus:outline-purple-800 bg-white rounded-full mt-2 ' type="text" placeholder='Claim your Handle' name="handle" />
          </div>
          <div>
            <h2 className='font-semibold text-2xl'>Step:2 Add Links</h2>
            <div className="item mx-4 gap-2 flex">
              <input value={link || ""} onChange={e=>{setlink(e.target.value)}} className='px-5 py-3 focus:outline-purple-800 bg-white rounded-full mt-2 ' type="text" placeholder='Enter link text' name="linkText" />
              <input value={linktext || ""} onChange={e=>{setlinktext(e.target.value)}} className='px-5 py-3 focus:outline-purple-800 bg-white rounded-full mt-2 ' type="text" placeholder='Enter link' name="linkUrl" />
              <button onClick={()=>addLink(link, linktext, handle)} className='rounded-full bg-purple-800 px-4 text-white font-semibold '>Add Link</button>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <h2 className='font-semibold text-2xl flex flex-col'>Step:3 Add your Picture and finalize</h2>
            <input value={pic || ""} onChange={e=>{setpic(e.target.value)}} className='px-5 py-3 focus:outline-purple-800 bg-white rounded-full mt-2 ' type="text" placeholder='Add picture' name="picture" />
            <button className='rounded-full bg-purple-800 px-4 py-2 w-fit text-white font-semibold '>Create your BitLink</button>
          </div>
        </div>
        <div className="col2 w-full h-screen pt-20">
          <Image src="/generate.png" alt="generate your links" width={400} height={600} unoptimized />
          <ToastContainer />
        </div>
      </div>
    </>
  )
}

export default Generate
