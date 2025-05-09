'use client'
import React, { useEffect, useState } from 'react'
import { AnimatedTestimonials } from "../components/ui/animated-testimonials"
import { GiFeather } from 'react-icons/gi'
import { Cover } from '../components/ui/cover'
import { useDispatch, useSelector } from 'react-redux'
import { fatchAuthor } from '../redux/slices/authorSlice'

const Author = () => {
  const dispatch = useDispatch()
  const [bookData, setBookData] = useState([])
  const [filepath, setFilePath] = useState('')

  const author = useSelector((state) => state.author.value)

  useEffect(() => {
    dispatch(fatchAuthor())
  }, [dispatch])

  useEffect(() => {
    if (author.data) setBookData(author.data)
    if (author.filepath) setFilePath(author.filepath)
  }, [author])

  return (
    <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 sm:py-14 md:py-20">
      <h3 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-800">
        <Cover className="flex justify-center items-center gap-3">
          Favorite Author <GiFeather className="text-3xl text-indigo-600" />
        </Cover>
      </h3>

      <div className="mt-10">
        <AnimatedTestimonials bookData={bookData} filepath={filepath} />
      </div>
    </div>
  )
}

export default Author
