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
  const [filepath2,setfilepath2] = useState('')

  const books = useSelector((state) => state.allBooks.value);
  const author_filepath = useSelector((state) => state.author.value);


  const filteredBooks = books.data && books.data.filter((book) => book.authors._id === authorId);




  useEffect(() => {

    setfilepath2(books.filepath)

    setFilePath(author_filepath.filepath);
    // Fetch all books
  }, [author_filepath,books]);


  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">{(filteredBooks && filteredBooks[0].authors.name)}</h2>
            <p className="mb-4">{(filteredBooks && filteredBooks[0].authors.description)}</p>
            <p>{(filteredBooks && filteredBooks[0].short_description)}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg"
              src={authors.thumbnail}
              alt="Author Thumbnail"
            />


            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src={filepath2 +  (filteredBooks && filteredBooks[0]?.frontimg || 'default-frontimg.jpg')}
              alt="Front Image"
            />
          </div>
        </div>
      </section>

      <div className=" grid grid-cols-5 gap-6">
        {
          filteredBooks && filteredBooks.map((product, index) => (
            <Card key={index} product={product} filePath={filepath2} />
          ))
        }
      </div>
    </>
  )
}

export default page
