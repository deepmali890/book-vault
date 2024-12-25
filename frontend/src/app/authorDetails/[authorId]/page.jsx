'use client'
import Card from '@/app/common/Card'
import { fatchBook } from '@/app/redux/slices/allBooksSlice'
import { fatchAuthor } from '@/app/redux/slices/authorSlice'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const page = () => {
  const { authorId } = useParams()
  const dispatch = useDispatch()
  const [filepath, setFilePath] = useState('')

  const books = useSelector((state) => state.allBooks.value);
  const author_filepath = useSelector((state) => state.author.value);
 
  const filteredBooks = books.data && books.data.filter((book) => book.authors._id === authorId);




 


  useEffect(() => {

    setFilePath(author_filepath.filepath);
    // Fetch all books
  }, [author_filepath]);




  // useEffect(() => {
  //   dispatch(fatchBook());
  //   dispatch(fatchAuthor());
  //   // Fetch all books
  // }, [dispatch]);



  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">We didn't reinvent the wheel</h2>
            <p className="mb-4">We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need. Small enough to be simple and quick, but big enough to deliver the scope you want at the pace you need.</p>
            <p>We are strategists, designers and developers. Innovators and problem solvers. Small enough to be simple and quick.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src={filepath + (filteredBooks && filteredBooks[0].authors.thumbnail)}
              alt="Author Thumbnail"
            />


            <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="office content 2" />
          </div>
        </div>
      </section>

      <div className=" grid grid-cols-5 gap-6">
        {
          filteredBooks && filteredBooks.map((product, index) => (
            <Card key={index} product={product} filePath={filepath} />
          ))
        }
      </div>
    </>
  )
}

export default page
