'use client'
import React, { useEffect, useState } from 'react'
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import { GiFeather } from 'react-icons/gi';
import { Cover } from '../components/ui/cover';
import { useDispatch, useSelector } from 'react-redux';
import { fatchAuthor } from '../redux/slices/authorSlice';

const Author = () => {

  const dispatch = useDispatch();
  const [bookData,setBookData]=useState([])
  const[filepath,setFilePath] =useState('')

  const author= useSelector((state)=>state.author.value)


  useEffect(()=>{
    dispatch(fatchAuthor())
  },[dispatch])

  useEffect(() => {
    if (author.data) setBookData(author.data);

    setFilePath(author.filepath)
  }, [author])

  return (
    <div>
      <h3 className='text-7xl text-center font-medium'><Cover className="mx-auto flex gap-4">Favorite Author <GiFeather /> </Cover></h3>

      <AnimatedTestimonials bookData={bookData} filepath={filepath} />
    </div>
  )
}

export default Author
