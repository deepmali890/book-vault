'use client'
import { fatchBlog } from '@/app/redux/slices/blogSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { AuroraBackground } from "../../components/ui/aurora-background";

const page = () => {

    const dispatch = useDispatch();
    const [blogData, setBlogData] = useState([])
    const [filepath, setFilePath] = useState('')

    const blogs = useSelector((state) => state.blog.value)


    useEffect(() => {
        dispatch(fatchBlog())
    }, [dispatch])

    useEffect(() => {
        if (blogs.data) setBlogData(blogs.data);

        setFilePath(blogs.filepath)
    }, [blogs])
    return (
        <>

<AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4  bg-transparent items-center justify-center px-4"
      >
         <section className="py-24 ">
                <div className="mx-auto  px-4 sm:px-6 lg:px-8">
                    <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">Our latest  blog</h2>
                    <div className="grid grid-cols-3  gap-10">

                        {
                            blogData.map((items, index) => (
                                <div className="group w-full border border-gray-300 rounded-2xl" key={index}>
                                    <div className="flex items-center">
                                        <img src={filepath + items.thumbnail} alt="blogs tailwind section" className=" scale-95 hover:scale-100 duration-[0.4s] cursor-pointer rounded-t-2xl w-full h-[300px] object-cover" />
                                    </div>
                                    <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                                        <span className="text-indigo-600 font-medium mb-3 block">Mar 01, 20233</span>
                                        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">{items.title}</h4>
                                        <p className="text-gray-600 leading-6 mb-10"
                                            style={{
                                                WebkitLineClamp: 3,
                                                display: '-webkit-box',
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}
                                        >{items.content}</p>
                                        <button className="cursor-pointer text-lg text-indigo-600 font-semibold">Read more..</button>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>
      </motion.div>
    </AuroraBackground>
        

        </>
    )
}

export default page
