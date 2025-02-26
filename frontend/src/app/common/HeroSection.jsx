"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../components/ui/images-slider";
import Link from "next/link";

const HeroSection = () => {

    const images = [
        "https://png.pngtree.com/thumb_back/fw800/background/20240328/pngtree-e-book-concept-vector-illustration-for-website-banner-and-marketing-image_15696614.jpg",
        "https://thumbs.dreamstime.com/b/book-store-cartoon-web-banner-online-landing-page-templates-dark-room-grunge-typography-archive-digital-books-315495890.jpg",
        "https://img.freepik.com/premium-photo/girl-reads-book-library_853645-18355.jpg",
      ];

  return (
    <div>
      <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.p className="font-bold text-xl  md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-amber-400 py-4">
        Unlock Your Imagination with <br /> <span className="text-7xl">Our Books</span>

          {/* <p></p> */}
        </motion.p>
        <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
        <Link href={'/allProduct'}> <span>Shop now →</span></Link> 
          <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
        </button>
      </motion.div>
    </ImagesSlider>
    </div>
  )
}

export default HeroSection
