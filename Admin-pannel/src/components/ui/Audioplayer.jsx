import React, { useEffect, useRef, useState } from 'react'
import { FaPause, FaPlay } from 'react-icons/fa'

const Audioplayer = ({ audioSrc }) => {

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1);

    const audioRef = useRef(null)


    

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
        audioRef.current.volume = e.target.value;
    };

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true)
    }

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false)
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause();
        }
        else {

            handlePlay();
        }

    }

    // const handleseek = (e) => {
    //     audioRef.current.currentTime = e.target.value;
    //     setCurrentTime(e.target.value);
    // }

    // const handleTimeUpdate = () => {
    //     setCurrentTime(audioRef.current.currentTime)
    //     setDuration(audioRef.current.duration)
    // }

    // useEffect(() => {
    //     const audioElement = audioRef.current;
    //     if (audioElement) {
    //         audioElement.addEventListener('timeupdate', handleTimeUpdate);
    //     }

    //     return () => {
    //         if (audioElement) {
    //             audioElement.removeEventListener('timeupdate', handleTimeUpdate);
    //         }
    //     };
    // }, []);

    /// formet time in mm::ss 
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

    return (

        <>
            <div class="mt-6 sm:mt-10 relative z-10 rounded-xl shadow-xl ">
                <div
                    class="bg-white  shadow-2xl border-[1px,1px_0px_1px] border-[#0297B2]  dark:bg-slate-800 transition-all duration-500 dark:border-slate-500 border-b rounded-t-xl text-center px-10 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-10">
                

                    {/* <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={handleseek}
                        className='w-full accent-[#0297B2] h-[1px]'

                    /> */}

                    <audio ref={audioRef} src={audioSrc} controls  autoFocus loop autoPlay   className='py-2 pb-4'></audio>
                    {/* <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                        <div class="text-cyan-500 transition-all duration-500 dark:text-slate-100">{formetDuration(currentTime)}</div>
                        <div class="text-slate-500 transition-all duration-500 dark:text-slate-400">{formetDuration(duration)}</div>
                    </div> */}

                </div>
                <div
                    class="bg-slate-50 text-slate-500  dark:bg-slate-600 transition-all duration-500 dark:text-slate-200 rounded-b-xl flex items-center">
                    <div class="flex-auto flex items-center justify-evenly">


                        <button onClick={handleSkipBackward} type="button" aria-label="Rewind 10 seconds" className='flex gap-2'>
                         10s   <svg width="24" height="24" fill="none">
                                <path d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 5v3.111c0 .491.398.889.889.889H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>

                    </div>

                    {/* <button onClick={handlePlayPause} type="button" class="bg-white text-slate-900 transition-all duration-500 dark:bg-slate-100  dark:text-slate-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center" aria-label="Pause">
                        {isPlaying ? <FaPause className='text-[25px]' /> : <FaPlay className='text-[25px]' />}
                    </button> */}

                    <div class="flex-auto flex items-center justify-evenly">
                        <button onClick={handleSkipForward} type="button" aria-label="Skip 10 seconds" className="flex gap-2">
                            <svg width="24" height="24" fill="none">
                                <path d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M19 5v3.111c0 .491-.398.889-.889.889H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>  10s
                        </button>
                        

                    </div>


                </div>

                {/* <div className='flex  items-center'>
                    <label>Volume</label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className='h-[1px]'
                    />
                </div> */}
            </div>
        </>
    )
}

export default Audioplayer
