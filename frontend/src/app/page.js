'use client'
import Image from "next/image";
import HeroSection from "./common/HeroSection";
import Features from "./home/Features";
import NewArrivels from "./home/NewArrivels";
import Author from "./home/Author";
import Audio from "./home/Audio";
import OutStory from "./home/OutStory";
import Blog from "./home/Blog";
import { motion } from "framer-motion";
import { AuroraBackground } from "./components/ui/aurora-background";
import { useEffect, useState } from "react";


export default function Home() {

  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Client-side code
  }, []); // Runs only after client renders

  if (windowWidth === undefined) {
    return <div className="h-screen flex justify-center items-center">
    <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
 	<span className='sr-only'>Loading...</span>
  	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
</div>
    </div>; // Fallback content
  }
  return (
    <>


      <HeroSection />
      <Features />
      <NewArrivels />
      <Author />
      <Audio />
      <OutStory />
      <Blog />


    </>
  );
}
