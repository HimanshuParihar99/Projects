import Image from "next/image";

export default function Home() {
  return (
  <main>
<section className='bg-[#254f1a] min-h-[100vh] grid grid-cols-2'>
  <div className=" flex flex-col justify-center p-10 gap-4 ml-[5vw]">
    <p className="text-[#d2e823] text-7xl font-bold">Everything you are. In one, simple link in bio.</p>
    <p className="text-white text-xl">Join 70M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
    <div className="input flex gap-5 pt-5">
      <input className="px-3 py-3 rounded-lg focus:outline-green-800 bg-white" type="text" placeholder="bittr.ee/" />
      <button className="bg-[#e9c0e9] px-5 py-4 rounded-full font-semibold text-[14px]">Claim your BitTree</button>
    </div>
    </div>
  <div className=" flex flex-col items-center justify-center mr-[10vw]">
    <Image src="/home.png" alt="home" width={600} height={600} />
  </div>
</section>
<section className='bg-[#e9c0e9] min-h-[100vh]'>
  
</section>
  </main>
  );
}
