import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 text-white h-[44vh] px-5 md:px-0 text-xs md:text-base">
        <div className="flex items-center justify-center gap-6 text-3xl font-bold md:gap-5 md:text-5xl">
          Get Me a Chai{" "}
          <span>
            <Image className="invertImg" src="/tea.gif" width={88} height={88} alt="Tea" />
          </span>
        </div>
        <p className="text-center md:text-left">
          A crowdfunding platform for creators to fund their projects.
        </p>
        <p className="text-center md:text-left">
          A place where your fans can buy you a chai. Unleash the power of your fans and get your projects funded.
        </p>
        <div>
          <Link href="/login">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Start Here
            </button>
          </Link>
          <Link href="/about">
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Read More
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="container mx-auto px-10 pb-32 pt-14 text-white">
        <h2 className="mb-14 text-3xl font-bold text-center">Your Fans Can Buy You a Chai</h2>
        <div className="flex justify-around gap-5">
          {[
            { src: "/man.gif", title: "Fans want to help", text: "Your fans are available to support you" },
            { src: "/coin.gif", title: "Fans want to contribute", text: "Your fans are willing to contribute financially" },
            { src: "/group.gif", title: "Fans want to collaborate", text: "Your fans are ready to collaborate with you" },
          ].map(({ src, title, text }, index) => (
            <div key={index} className="flex flex-col items-center justify-center space-y-3">
              <Image className="bg-slate-400 rounded-full p-2 text-black" width={88} height={88} src={src} alt={title} />
              <p className="font-bold text-center">{title}</p>
              <p className="text-center">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="container mx-auto flex flex-col items-center justify-center pb-32 pt-14 text-white">
        <h2 className="mb-14 text-3xl font-bold text-center">Learn More About Us</h2>
        {/* Responsive YouTube Embed */}
        <div className="w-[90%] h-[40vh] md:w-[50%] lg:w-[50%] xl:w-[50%]">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ojuUnfqnUI0?si=wMUv4DG3ia6Wt4zn"
            title="YouTube Video Player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
