'use client'
import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { Cover } from '../components/ui/cover'
import { GiSecretBook } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { fatchBook } from '../redux/slices/allBooksSlice';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewArrivels = () => {
    let [quickAdd, setQuickAdd] = useState(false)

    const dispatch = useDispatch();
    const [booksData, setbooksData] = useState([])
    const [filepath, setFilePath] = useState('')

    const books = useSelector((state) => state.allBooks.value)

    // console.log("shanti",books)


    useEffect(() => {
        dispatch(fatchBook())
    }, [dispatch])

    useEffect(() => {
        if (books.data) setbooksData(books.data);

        setFilePath(books.filepath)
    }, [books])

    const settings = {
        dots: false,               // Displays navigation dots below the slider.
        infinite: true,           // Enables infinite loop for slides. After the last slide, it loops back to the first.
        speed: 500,               // Duration (in milliseconds) of transition between slides.
        slidesToShow: 5 ,          // Number of slides to show at once in the carousel.
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
                <h3 className='text-6xl text-center font-medium'><Cover className="mx-auto flex items-center gap-4">New Arrival <GiSecretBook /> </Cover></h3>
                <div className='my-10'>


                    <Slider {...settings} className='gap-4'>

                        {
                            booksData.map((product, index) => (
                                <Card key={index} product={product} filePath={filepath} />
                            ))
                        }

                    </Slider>






                </div>
            </section>
        </div>
    )
}

export default NewArrivels


