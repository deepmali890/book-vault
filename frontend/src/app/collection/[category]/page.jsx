'use client'

import Card from "@/app/common/Card";
import { fatchBookByParentCategory } from "@/app/redux/slices/bookByParentCategory";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const page = () => {
 const { category } = useParams();
 
  const dispatch = useDispatch()
  const [bookData, setBookData] = useState([])
  const [filepath, setFilepath] = useState('')

  // console.log(category)

  const books = useSelector((state) => state.bookByParentCategory.value)
  const categories = useSelector((state) => state.parentCategory.value)

  // console.log("books", books )

  useEffect(() => {
    const selectedCategory = categories.filter((categoryObj) => categoryObj.name === category)
    if (selectedCategory.length === 0) return;
    dispatch(fatchBookByParentCategory(selectedCategory[0]._id))
    // console.log("hello", selectedCategory)
  }, [categories])


  useEffect(()=>{
    if (books.data) setBookData(books.data);
    setFilepath(books.filepath)
    console.log("product=====>", books)
  },[books])

  // useEffect(() => {
  //   if (books.data) setBookData(books.data);

  //   // setProductData(products.data)  
  //   setFilepath(books.filepath)
  //   console.log('productData', books)
  // }, [books])

  // console.log('dilip ji',bookData)
  return (
    <>
      <div className="font-sans py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
        {/* <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12"> Persnol Financee Book</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-12">

          {
            bookData.map((product, index) => (
              <Card key={index} product={product} filePath={filepath} />
            ))
          }



        </div>
      </div>
    </>
  )
}

export default page
