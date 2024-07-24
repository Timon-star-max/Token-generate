import Image from "next/image";
import Link from "next/link";
import React from "react";
import WaveAnimation from "./animate/WaveAnimation";
import Background from "@/public/images/background/background.svg";

const Header = () => {
  return (
    <div className="h-screen flex flex-col md:justify-center items-center relative max-w-[1600px] mx-auto">
      <WaveAnimation></WaveAnimation>
      <Image
        src={Background}
        alt=""
        width={495} // Use ternary operator to conditionally set width
        height={495}
        className="absolute md:hidden z-1"
      />

      <div className="absolute bottom-32 curveBg md:bottom-0 h-[60%] md:h-[55%] w-full  text-white ">
        <div className="w-full  hidden md:flex justify-between md:px-8 md:gap-[430px]">
          <h1 className="md:w-[498px] px-4 py-10 text-center ml-4 text-sm">
            Create your token on EVM-compatible blockchain such as Ethereum,
            BSC, Base, Polygon, etc.
          </h1>
          <h1 className="md:w-[498px] px-3 py-10 text-center mr-4 text-sm">
            Enabling seamless and secure deployment of custom tokens on the
            blockchain with just a few clicks.
          </h1>
        </div>
        <div className="w-full flex flex-col text-center justify-center items-center md:px-16 px-2 space-y-4 md:mt-3 mt-[90px]">
          <h1 className=" pt-20 md:pt-0 md:text-xl md:font-medium font-normal uppercase">
            Pioneering the Next Generation
          </h1>
          <h1 className="font-extrabold leading-[1.25em] text-transparent text-4xl md:text-5xl bg-clip-text bg-gradient-to-b from-white to-[#9B9B9B] uppercase">
            Token <br /> Generate Applications
          </h1>
          <h1 className="w-full text-center text-sm md:hidden px-4">
            Create your token on EVM-compatible blockchain such as Ethereum,
            BSC, Base, Polygon, etc. Enabling seamless and secure deployment of
            custom tokens on the blockchain with just a few clicks.
          </h1>
          <Link href="#deploy">
            <button className="before:ease relative h-10 px-4 overflow-hidden bg-[#05B7D1] text-white shadow-2xl transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#069fb5] before:duration-300 hover:text-white hover:sbg-[#ff3932] hover:before:h-64 hover:before:-translate-y-32 rounded-lg">
              <span className="relative z-10">Get Start</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
