'use client'
import { fatchBook } from '@/app/redux/slices/allBooksSlice';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoPlayCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { ReactReader } from 'react-reader'


const page = () => {
  const id = useParams();
  const dispatch = useDispatch()
  let [product, setProduct] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filepath, setFilepath] = useState('')
  const Route = useRouter()
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Client-side code
  }, []);
  // console.log(params)


  const books = useSelector((state) => state.allBooks.value)

  useEffect(() => {
    dispatch(fatchBook())
  }, [dispatch])

  // console.log("shanti",books)

  useEffect(() => {

    if (!(JSON.stringify(books) === '{}')) {
      const bookbyParam = books.data.filter((product) => product._id === id.pid);

      if (bookbyParam[0]) setProduct(bookbyParam[0]);
      setFilepath(books.filepath)
      // console.log('product',productbyParam[0])
      // console.log('FILEPATH',filepath)

    }

  }, [books])
  console.log(product)

  const handleSubscribe = () => {
    if (!isSubscribed) {
      // Redirect to subscription page
      alert('Please subscribe to read this book.');
      Route.push('/pages/subscription-page')
    }
    else {
      // Allow access to the book
      window.open(filepath + product.pdf);
    }
  }

  
  if (windowWidth === undefined) {
    return <div className="h-screen flex justify-center items-center">
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
      <div className="font-sans tracking-wide max-md:mx-auto">
        <div className="bg-gradient-to-r md:min-h-[600px] grid from-black via-gray-900 to-black items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">

          <div className="lg:col-span-3 h-full flex gap-2 p-8">
            <div className="relative hover:scale-110 duration-[0.3s]  h-full flex items-center justify-center lg:min-h-[580px]">
              <img src={filepath + product.frontimg} alt="Product" className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8" />


            </div>
            <div className="relative h-full hover:scale-110 duration-[0.3s]  flex items-center justify-center lg:min-h-[580px]">
              <img src={filepath + product.backimg} alt="Product" className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8" />


            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>

              <div className="flex space-x-1 mt-2">
                <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-gray-800" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <svg className="w-4 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Price</h3>
              <div className="flex gap-4 w-full">
                <p className="text-gray-800 text-3xl font-bold mt-4">₹ {product.price}</p>
                <p className="text-gray-600 text-3xl font-bold mt-4 line-through">₹ {product.mrp}</p>
              </div>
            </div>



            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Quantity</h3>
              <div className="flex divide-x border w-max mt-4 rounded overflow-hidden">
                <button type="button" className="bg-gray-100 w-10 h-9 font-semibold flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 124 124">
                    <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                  </svg>
                </button>
                <button type="button" className="bg-transparent w-10 h-9 font-semibold flex items-center justify-center text-gray-800 text-lg">
                  1
                </button>
                <button type="button" className="bg-gray-800 text-white w-10 h-9 font-semibold flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current inline" viewBox="0 0 42 42">
                    <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">

              <button onClick={handleSubscribe} type="button" className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded">
                Read now

              </button>
              <button type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded">Add to cart</button>
            </div>


            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-6 mr-3" viewBox="0 0 48 48">
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z" data-original="#000000" />
                <path d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z" data-original="#000000" />
              </svg>
              Free delivery on order $100
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-6 mr-3" viewBox="0 0 48 48">
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z" data-original="#000000" />
                <path d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z" data-original="#000000" />
              </svg>
              Book Subscription Plans
            </div>

            <div className="w-full mt-8 ">
              <div className="text-2xl font-semibold translate-x-3">
                Audio Reads
              </div>
              <div className="flex items-center justify-center  bg-red-lightest">
                <div className="bg-white shadow-lg rounded-lg" >
                  <div className="flex items-center px-4">
                    <div>
                      <img className="w-[200px] rounded " src="https://tailwindcss.com/img/card-top.jpg" alt="Album Pic" />
                    </div>
                    <div className="w-full p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-1xl text-grey-darkest font-medium">{product.name}</h3>
                          {
                            product.book_category?.name
                          }
                        </div>
                        <Link href={`/pages/audio/audio-details/${product._id}`}>   <div className="text-7xl cursor-pointer">
                          <IoPlayCircleSharp />
                        </div>
                        </Link>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-2xl px-6">
          <h3 className="text-lg font-bold text-gray-800">Book Features</h3>

          <ul className="grid sm:grid-cols-2 gap-3 mt-4">
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Comprehensive Book Library
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Genre Filters
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Reading Progress Tracking
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Bookmarking
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Digital Reader
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Audiobook Integration
            </li>

            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              Author Profiles
            </li>

            <li className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" className="mr-4 bg-green-500 fill-white rounded-full p-[3px]" viewBox="0 0 24 24">
                <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" data-original="#000000" />
              </svg>
              New Arrivals and Bestsellers
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">Book Description</h3>
            <p className="text-sm text-gray-600 mt-4">{product.description}</p>
          </div>
        </div>
      </div>


      <div className="font-sans bg-white py-4 mx-auto lg:max-w-7xl md:max-w-4xl">
        <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-16">Feature Products</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-sm:justify-center gap-y-8 gap-x-6">

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch1.webp" alt="product1"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">French Connection</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$95.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch2.webp" alt="product2"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">classNameic Bluetooth</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$78.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch3.webp" alt="product3"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Kors Lexington</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$68.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch4.webp" alt="product4"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Smart Watch</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$105.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch5.webp" alt="product5"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Alarm Clock Watch</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$30.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch6.webp" alt="product6"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Wall Clock</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$40.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch7.webp" alt="product7"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">classNameic Watch</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$60.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch8.webp" alt="product8"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">French Watch</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$80.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch1.webp" alt="product1"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">French Connection</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$95.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch2.webp" alt="product2"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">classNameic Bluetooth</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$78.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch3.webp" alt="product3"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Kors Lexington</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$68.00</h4>
            </div>
          </div>

          <div className="flex gap-6 overflow-hidden cursor-pointer">
            <div className="w-24 h-24 shrink-0 bg-gray-100 p-3 overflow-hidden aspect-w-16 aspect-h-8 rounded-lg">
              <img src="https://readymadeui.com/images/watch4.webp" alt="product4"
                className="h-full w-full object-contain" />
            </div>

            <div>
              <h3 className="text-base font-bold text-gray-800">Smart Watch</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">$105.00</h4>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default page
