'use client'
import React, { useEffect, useState } from 'react'
import Card from '../common/Card'
import { Cover } from '../components/ui/cover'
import { GiSecretBook } from "react-icons/gi"
import { useDispatch, useSelector } from 'react-redux'
import { fatchBook } from '../redux/slices/allBooksSlice'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const NewArrivals = () => {
    const dispatch = useDispatch()
    const [booksData, setBooksData] = useState([])
    const [filePath, setFilePath] = useState('')
    const books = useSelector((state) => state.allBooks.value)

    useEffect(() => {
        dispatch(fatchBook())
    }, [dispatch])

    useEffect(() => {
        if (books.data) setBooksData(books.data)
        if (books.filepath) setFilePath(books.filepath)
    }, [books])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 480,
                settings: { slidesToShow: 1 }
            }
        ]
    }

    return (
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <section className="max-w-[1460px] mx-auto py-10 sm:py-14 md:py-20">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-semibold text-gray-800">
                    <Cover className="flex justify-center items-center gap-3">
                        New Arrival <GiSecretBook className="text-indigo-600 text-3xl" />
                    </Cover>
                </h3>

                <div className="mt-10">
                    <Slider {...settings}>
                        {booksData.map((product, index) => (
                            <div key={index} className="px-2">
                                <Card product={product} filePath={filePath} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </div>
    )
}

export default NewArrivals
