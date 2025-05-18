"use client"
import React from 'react'
import { useState } from 'react'

const Shorten = () => {
    const [url, seturl] = useState("")
    const [shorturl, setshorturl] = useState("")
    const [generated, setgenerated] = useState(false)

    const generate = () => {
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "url": url,
  "shorturl": shorturl
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("/api/generate", requestOptions)
  .then((response) => response.json())
.then((result) => {
    seturl("")
    setshorturl("")
  console.log(result);
  alert(result.message);
})
  .catch((error) => console.error(error));
    }
    
    
  return (
    <div className='mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded lg flex flex-col gap-4'>
    <h1 className='font-bold text-2xl'>Generate your short URLs</h1>
    <div className='flex flex-col gap-2'>
        <input type="text"
        value={url}
        className='py-2 p-4 bg-white focus:outline-purple-600 rounded-md'
        placeholder='Enter your URL' onChange={e=>{seturl(e.target.value)}} />
        <input type="text"
        value={shorturl}
        className='py-2 p-4 bg-white focus:outline-purple-600 rounded-md'
         placeholder='Enter your preffered short URL text' onChange={e=>{setshorturl(e.target.value)}} />
        <button onClick={generate} className='flex bg-purple-500 rounded shadow-lg p-3 font-bold py-1 text-white justify-center items-center my-3'>Generate</button>
    </div>
    </div>
  )
}

export default Shorten
