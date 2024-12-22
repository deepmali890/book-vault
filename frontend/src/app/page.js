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


export default function Home() {
  return (
 <>

 
 <HeroSection/>
 <Features/>
 <NewArrivels/>
 <Author/>
 <Audio/>
 <OutStory/>
 <Blog/>
 
 
 </>
  );
}
