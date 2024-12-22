'use client'
import Blog from '@/app/home/Blog'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import myphoto from '../../../../public/Dilip-removebg-preview.png'

const page = () => {
  return (
 <>
 <section className="pt-10 overflow-hidden mb-20 dark:bg-gray-800 md:pt-0 sm:pt-16 2xl:pt-16">
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center grid-cols-1 md:grid-cols-2">

            <div>
                <h2 className="text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl lg:text-5xl">Hey 👋 I
                    am
                    <br className="block sm:hidden" /> Dilip Mali
                </h2>
                <p className="max-w-lg mt-3 text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:mt-8">
                Welcome to our book haven! I'm a passionate book enthusiast and curator, dedicated to bringing you a curated collection of amazing reads. With a deep love for storytelling and discovering new worlds, I aim to share a diverse range of books across genres to inspire, educate, and entertain. Whether you're a casual reader or a bibliophile, my goal is to provide you with books that will captivate your mind and enrich your life. Join me on this literary journey and let’s dive into the world of endless stories!
                </p>

                <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 md:mt-8">
                    <span className="relative inline-block">
                        <span className="absolute inline-block w-full bottom-0.5 h-2 bg-gray-300 dark:bg-gray-900"></span>
                    <span className="relative"> Have a question? </span>
                    </span>

                    <br className="block sm:hidden" />Ask me on
                  <Link href={'https://x.com/home'}>   <span
                        className="transition-all duration-200 text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-500 hover:underline">Twitter</span></Link>
                </p>
            </div>

            <div className="relative">
                <img className="absolute inset-x-0 bottom-0 -mb-48 -translate-x-1/2 left-1/2" src="https://cdn.rareblocks.xyz/collection/celebration/images/team/1/blob-shape.svg" alt="" />

                <Image className="relative w-full xl:max-w-lg xl:mx-auto 2xl:origin-bottom 2xl:scale-110" src={myphoto} alt="" />
            </div>

        </div>
    </div>
</section>


<Blog/>
 </>
  )
}

export default page
