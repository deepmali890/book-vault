'use client'
import Card from '@/app/common/Card';
import { fatchBook } from '@/app/redux/slices/allBooksSlice';
import { featureBookCategory } from '@/app/redux/slices/featureBookCategorySlice';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

  // const [subCategoryData,SetSubCategoryData] = useState([])
  const [filepath,setFilePath] = useState('')

  const dispatch = useDispatch();
  const { categories } = useParams();
  // console.log('categories>>>>',categories)
  const books = useSelector((state) => state.allBooks.value);

  console.log('Books Data >>>>',books);
  const filteredBooks = books.data && books.data.filter((book) => book.book_category.slug === categories);

  console.log('filteredBooks>>',filteredBooks)
  
useEffect(()=>{
  setFilePath(books.filepath)
},[books])
  useEffect(() => {
    dispatch(fatchBook()); 
   // Fetch all books
  }, [dispatch]);
  

  return (
    <div>
      <div className="">
     
        <div className="">
          <div className="font-sans py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12">Books Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-12">

           {
            filteredBooks && filteredBooks.map((product, index) =>(
              <Card key={index} product={product} filePath={filepath}/>
            ))
           }


              {/*
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> */}



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
