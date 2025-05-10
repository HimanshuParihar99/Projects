import Image from "next/image";

export default function Home() {
  return (
<>
<main className="bg-purple-50">
  <section className="grid grid-cols-2 h-[50vh]"> 
    
  <div className="bg-purple-100 flex flex-col justify-center items-center">
    <p className="text-3xl font-bold" >
    The best URL shortener in the Market
    </p>
    <p className="px-30 text-center">
      we are the most staright forward URL shortener in the world.
      Shorten your long links in seconds with our easy-to-use URL shortener. Clean, fast, and reliable — our tool helps you create compact, shareable links that are perfect for social media, messaging, and more. 
    </p>
      
    </div>
  <div className="bg-purple-100 flex justify-start relative">
    <Image className="mix-blend-darken" src={"/vector.jpg"} alt="Vector" fill={true} />
  </div>
  </section>
</main>
</>
  );
}
