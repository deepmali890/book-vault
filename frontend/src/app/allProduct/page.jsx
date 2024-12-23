'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fatchBook } from '../redux/slices/allBooksSlice';
import Card from '../common/Card';
import FilterSection from '../common/FilterSection';
import { RiBookShelfFill } from "react-icons/ri";

const page = () => {
  const dispatch = useDispatch();
  const [booksData, setbooksData] = useState([])
  const [filepath, setFilePath] = useState('')


  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Client-side code
  }, []); // Runs only after client renders


  const books = useSelector((state) => state.allBooks.value)



  console.log("shanti",books)




  useEffect(() => {
    dispatch(fatchBook())
  }, [dispatch])

  useEffect(() => {
    if (books.data) setbooksData(books.data);
    

    setFilePath(books.filepath)
  }, [books])



  if (windowWidth === undefined) {
    return <div className="h-screen flex justify-center items-center ">
      <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
    </div>; // Fallback content
  }
  return (
    <>




      
<h2 className="text-4xl font-extrabold text-gray-800 justify-center my-12 flex items-center gap-2">All Books <RiBookShelfFill /></h2>
        <div className="grid grid-cols-[20%_80%] my-10">
         {/* <FilterSection/> */}
         <aside className="">
          <FilterSection/>
         </aside>
            
           <aside>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">



                {
                  booksData.map((product, index) => (
                    <Card key={index} product={product} filePath={filepath} />
                  ))
                }
              </div>
              </aside>
          </div>
          
      
      
    </>
  )
}

export default page
