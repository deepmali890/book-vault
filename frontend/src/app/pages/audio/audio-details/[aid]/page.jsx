'use client'
import { fatchBook } from '@/app/redux/slices/allBooksSlice';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa';
import { IoPlayCircleSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { AuroraBackground } from "../../../../components/ui/aurora-background";

const page = () => {

    const id = useParams();
    const dispatch = useDispatch()
    let [product, setProduct] = useState({});
    const [filepath, setFilepath] = useState('')
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, SetCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    // console.log(params)


    const audioRef = useRef(null)

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        SetCurrentTime(e.target.value)

    }

    const handleTimeUpdate = () => {
        if (!isNaN(audioRef.current.duration)) {
            SetCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    }

    const handlePlay = () => {
        audioRef.current.play()
        setIsPlaying(true)
    }

    const handlePause = () => {
        audioRef.current.pause()
        setIsPlaying(false)
    }




    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause()
        } else {
            handlePlay()
        }
    }

    useEffect(() => {
        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener('timeupdate', handleTimeUpdate);
            }
        };
    }, []);

    function formetDuration(durationSeconds) {
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0")
        return `${minutes}:${formattedSeconds}`
    }

    const handleSkipForward = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Math.min(audio.currentTime + 10, audio.duration); // Ensure it doesn't exceed the duration
            setCurrentTime(audio.currentTime);
        }
    };

    const handleSkipBackward = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Math.max(audio.currentTime - 10, 0); // Ensure it doesn't go below 0
            setCurrentTime(audio.currentTime);
        }
    };


    const books = useSelector((state) => state.allBooks.value)

    useEffect(() => {
        dispatch(fatchBook())
    }, [dispatch])

    // console.log("shanti",books)

    useEffect(() => {

        if (!(JSON.stringify(books) === '{}')) {
            const bookbyParam = books.data.filter((product) => product._id === id.aid);

            if (bookbyParam[0]) setProduct(bookbyParam[0]);
            setFilepath(books.filepath)
            // console.log('product',productbyParam[0])
            // console.log('FILEPATH',filepath)

        }

    }, [books])
    console.log(product)





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
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
      <div className=" min-h-screen p-10">


<div className="grid sm:grid-cols-1 md:grid-cols-3 ">
    <div className="">
        <img className="mr-6 w-[200px] rounded-lg" src={filepath + product.frontimg} />
    </div>
    <div className=" bg-white/30">
        <div className="bg-red-light"></div>
        <div className=" items-center justify-center  bg-red-lightest">
            <div className=" border-2 py-3 px-8 shadow-lg rounded-lg" >
                <div className="">

                    <div className="w-full ">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-2xl text-grey-darkest font-medium">{product.name} MP3</h3>
                                <p className="text-sm text-grey mt-1"> {
                                    product.parent_categories?.name
                                }</p>
                            </div>
                            <div className="text-red-lighter">
                                <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" /></svg>
                            </div>
                        </div>
                        <audio ref={audioRef} src={filepath + product.audio} loop ></audio>
                        <div className="flex justify-between items-center mt-8">
                            <div className="flex-auto flex items-center justify-evenly">


                                <button onClick={handleSkipBackward} type="button" aria-label="Rewind 10 seconds" className='flex gap-2'>
                                    10s   <svg width="24" height="24" fill="none">
                                        <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>

                            </div>

                            <button onClick={handlePlayPause} className=" cursor-pointer p-8 rounded-full bg-red-light shadow-lg">
                                {isPlaying ? <FaPause /> : <FaPlay />}
                            </button>

                            <div className="flex-auto flex items-center justify-evenly">
                                <button onClick={handleSkipForward} type="button" aria-label="Skip 10 seconds" className="flex gap-2">
                                    <svg width="24" height="24" fill="none">
                                        <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                        <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>  10s
                                </button>


                            </div>

                        </div>
                    </div>
                </div>
                <div className="mx-8 py-4">
                    <div className="flex justify-between text-sm text-grey-darker">
                        <p> {formetDuration(currentTime)}</p>
                        <p>{formetDuration(duration)}</p>
                    </div>
                    <input
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        type="range" name="" id="" className='w-full my-2 accent-[#115568]  h-[4px]' />
                </div>
            </div>
        </div>
    </div>

    <div className='text-right' >

        <h4 className=" uppercase text-gray-500  text-xs">
            {
                product.book_category?.name
            }
        </h4>
        <h1 className=" text-black text-4xl">{product.name}</h1>

        <p className=" mb-2 text-sm">With &nbsp;
            {
                product.authors?.name
            }
        </p>
        <p className=" text-sm">Created by <a>Dilip</a> - 5 songs, 3 hr 2 min</p>

        <p className="text-sm text-gray-600 mt-4"
            style={{
                WebkitLineClamp: 4,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}
        >{product.description}</p>
    </div>
</div>




<table border="1" className="w-full text-center my-10">
    <thead>
        <tr>
            <th>Episode</th>
            <th>Action</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Duration</th>
        </tr>
    </thead>
    <tbody >
        {
            product.multiAudio &&
            product.multiAudio.map((audio, index) => (
                <tr key={index} >
                    <td>{index + 1}</td>
                    <td className='mx-auto'>
                        <div className="mx-auto text-center">
                            <audio src={filepath + audio} controls className='mx-auto'></audio>
                        </div>
                    </td>
                    <td>{product.name}</td>


                    <td>Dilip</td>
                    <td>{duration}</td>
                </tr>
            ))
        }




    </tbody>
</table>


</div>
      </motion.div>
    </AuroraBackground>
          
        </>
    )
}

export default page
