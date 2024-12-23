'use client'
import React, { useEffect, useState } from 'react'
// import { Cover } from "../components/ui/cover";
import { MdOutlineCategory } from "react-icons/md";
import { Cover } from '../components/ui/cover';
import { useDispatch, useSelector } from 'react-redux';
import { featureBookCategory } from '../redux/slices/featureBookCategorySlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Features = () => {

    const dispatch = useDispatch();
    const [featureBookCats, setFeatureBookCats] = useState([])
    const [filepath, setFilePath] = useState('')

    const featureBook = useSelector((state) => state.featureBook.value)
    // console.log("niku", featureBook)


    useEffect(() => {
        dispatch(featureBookCategory())
    }, [dispatch])

    useEffect(() => {
        if (featureBook.data) setFeatureBookCats(featureBook.data);

        setFilePath(featureBook.filepath)
    }, [featureBook])

    const settings = {
        dots: false,               // Displays navigation dots below the slider.
        infinite: true,           // Enables infinite loop for slides. After the last slide, it loops back to the first.
        speed: 500,               // Duration (in milliseconds) of transition between slides.
        slidesToShow: 4,          // Number of slides to show at once in the carousel.
        slidesToScroll: 1,        // Number of slides to scroll at a time.
        autoPlay: true,           // Enables autoplay of the carousel/slider. The slides will change automatically.
        autoplaySpeed: 1000,      // Speed of autoplay transition in milliseconds (this is optional but often used with autoplay).
        pauseOnHover: true,       // Pauses autoplay when hovering over the carousel.
        arrows: true,             // Displays navigation arrows for manual slide control.
        responsive: [             // Allows you to define breakpoints for responsiveness on different screen sizes.
            {
                breakpoint: 1024, // For screens smaller than 1024px
                settings: {
                    slidesToShow: 3, // Show 3 slides on smaller screens
                    slidesToScroll: 1, 
                    dots: true, // Still show dots on smaller screens
                }
            },
            {
                breakpoint: 600,  // For screens smaller than 600px
                settings: {
                    slidesToShow: 1,  // Show 1 slide on very small screens
                    slidesToScroll: 1,
                    dots: false,  // Dots are hidden on very small screens
                }
            }
        ]
    };
    

    return (
        <div>
            <section className='max-w-[1460px] mx-auto py-[50px]'>
                <h3 className='text-center text-6xl font-medium'>
                    <Cover className="mx-auto flex gap-4">Featured Categories <MdOutlineCategory /></Cover>
                </h3>


                <Slider {...settings}>
                    {
                        featureBookCats.map((items,index)=>(
                            <div className='my-10 ' key={index}>
                        <div className=' w-full h-full rounded-md'>
                            <img className='w-[300px] h-[500px] rounded-md scale-95  hover:scale-105 duration-[0.5s] cursor-pointer  object-cover' src={filepath + items.thumbnail} alt="Mens Jackets" />
                            <h5 className='text-[15px] mt-2 font-semibold'>{items.name}</h5>
                        </div>
                    </div>
                        ))
                    }
                </Slider>




            </section>
        </div>
    )
}

export default Features
