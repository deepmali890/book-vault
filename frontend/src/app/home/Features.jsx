'use client'
import React, { useEffect, useState } from 'react'
import { MdOutlineCategory } from "react-icons/md"
import { Cover } from '../components/ui/cover'
import { useDispatch, useSelector } from 'react-redux'
import { featureBookCategory } from '../redux/slices/featureBookCategorySlice'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Link from 'next/link'

const Features = () => {
    const dispatch = useDispatch()
    const [featureBookCats, setFeatureBookCats] = useState([])
    const [filepath, setFilePath] = useState('')

    const featureBook = useSelector((state) => state.featureBook.value)

    useEffect(() => {
        dispatch(featureBookCategory())
    }, [dispatch])

    useEffect(() => {
        if (featureBook.data) setFeatureBookCats(featureBook.data)
        if (featureBook.filepath) setFilePath(featureBook.filepath)
    }, [featureBook])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        arrows: true,
        responsive: [
            {
                breakpoint: 1280,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 640,
                settings: { slidesToShow: 1 }
            }
        ]
    }

    return (
        <div className="w-full px-6 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <section className="max-w-[1460px] mx-auto py-10 sm:py-14 md:py-20">
                <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800">
                    <Cover className="flex justify-center items-center gap-3">
                        Featured Categories <MdOutlineCategory className="text-indigo-600 text-3xl" />
                    </Cover>
                </h3>

                <div className="mt-10">
                    <Slider {...settings}>
                        {featureBookCats.map((items, index) => (
                            <div key={index} className="px-2">
                                <Link href={`/subCategory/${items.slug}`}>
                                    <div className="w-full rounded-md overflow-hidden transition-transform transform hover:scale-105 duration-300">
                                        <img
                                            src={items.thumbnail}
                                            alt={items.name}
                                            className="w-full h-[400px] object-cover rounded-md"
                                        />
                                        <h5 className="text-center mt-3 text-base font-semibold text-gray-700">
                                            {items.name}
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
        </div>
    )
}

export default Features
