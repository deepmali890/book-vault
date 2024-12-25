'use client'
import { fatchBook } from '@/app/redux/slices/allBooksSlice';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { IoPlayCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { ReactReader } from 'react-reader'
import { RiBookShelfFill, RiPlayCircleFill } from 'react-icons/ri';
import { GoStarFill } from 'react-icons/go';
import { CiStar } from "react-icons/ci";
import { FaBookOpenReader } from 'react-icons/fa6';
import { IoIosCart } from 'react-icons/io';
import { createComment, showComment } from '@/app/redux/slices/commentDetailsSlice';
import Cookies from 'js-cookie';



const page = () => {
  const id = useParams();
  const dispatch = useDispatch()
  let [book, setBook] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filepath, setFilepath] = useState('')
  const Route = useRouter()
  const [windowWidth, setWindowWidth] = useState(undefined);
  const [comments, setComment] = useState({})
  const [commentData, setCommentData] = useState([])

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Client-side code
  }, []);



  const books = useSelector((state) => state.allBooks.value)

  useEffect(() => {
    dispatch(fatchBook())
  }, [dispatch])


  useEffect(() => {

    if (!(JSON.stringify(books) === '{}')) {
      const bookbyParam = books.data.filter((item) => item._id === id.pid);

      if (bookbyParam[0]) setBook(bookbyParam[0]);
      setFilepath(books.filepath)


    }

  }, [books])


  const handleSubscribe = () => {
    if (!isSubscribed) {
      // Redirect to subscription page
      alert('Please subscribe to read this book.');
      Route.push('/pages/subscription-page')
    }
    else {
      // Allow access to the book
      window.open(filepath + book.pdf);
    }
  }


  const handleComment = (e) => {
    e.preventDefault()
    dispatch(createComment(comments))
    console.log(comments)
  }

  const allComments = useSelector((state) => state.app.comments)
  console.log('mere comments', allComments)

  useEffect(() => {
    dispatch(showComment())
  }, [dispatch])


  
  const handleAddToCart = (e) => {
    const cookiedata = Cookies.get("book_vault");

    if (!cookiedata) {
        return Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: "You must be logged in to add product to cart.",
        });
    }

    const userData = JSON.parse(cookiedata);

    const data = {
        user: userData.userId,
        book: pid, // Ensure productId is passed correctly

    };
    console.log(data)
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/create-cart`, data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Error in adding to cart', err);
        })
    toast.success(data.message || ' Product added successfully!');
    dispatch(fatchCart(userData.userId));
};



  if (windowWidth === undefined) {
    return <div className="h-screen flex justify-center items-center">

      <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>


    </div>; // Fallback content
  }

  return (
    <>
      <div className="font-sans tracking-wide max-md:mx-auto">
        <div className="bg-gradient-to-r md:min-h-[600px] grid from-black via-gray-900 to-black items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">

          <div className="lg:col-span-3 h-full flex gap-2 p-8">
            <div className="relative hover:scale-110 duration-[0.3s]  h-full flex items-center justify-center lg:min-h-[580px]">
              <img src={filepath + book.frontimg} alt="book" className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8" />


            </div>
            <div className="relative h-full hover:scale-110 duration-[0.3s]  flex items-center justify-center lg:min-h-[580px]">
              <img src={filepath + book.backimg} alt="book" className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8" />


            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{book.name}</h2>

              <div className="flex space-x-1 mt-2">
                <GoStarFill className='text-yellow-400' />
                <GoStarFill className='text-yellow-400' />
                <GoStarFill className='text-yellow-400' />
                <GoStarFill className='text-yellow-400' />
                <CiStar />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Price</h3>
              <div className="flex gap-4 w-full">
                <p className="text-gray-800 text-3xl font-bold mt-4">₹ {book.price}</p>
                <p className="text-gray-600 text-3xl font-bold mt-4 line-through">₹ {book.mrp}</p>
              </div>
            </div>


            {/* 
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
            </div> */}

            <div className="flex flex-wrap gap-4 mt-8">

              <button onClick={handleSubscribe} type="button" className="min-w-[200px] flex gap-2 items-center justify-center px-4 py-3 bg-gray-800  hover:bg-gray-700 text-white text-sm font-semibold rounded">
                <FaBookOpenReader />
                Read Now

              </button>
              <button onClick={handleAddToCart} type="button" className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded flex justify-center items-center gap-2"> <IoIosCart /> Add To Cart </button>
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
              <div className="text-2xl font-semibold translate-x-3 mb-4">
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
                          <h3 className="text-1xl text-grey-darkest font-medium">{book.name}</h3>
                          {
                            book.book_category?.name
                          }
                        </div>
                        <Link href={`/pages/audio/audio-details/${book._id}`}>   <div className="text-7xl cursor-pointer">
                          <RiPlayCircleFill className=' text-gray-800 ' />
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


      </div>

      <section className="mt-8 px-6 grid grid-cols-2 gap-2 mb-20 ">

        <div className="">
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
            <p className="text-sm text-gray-600 mt-4">{book.description}</p>
          </div>
        </div>

        <div className=' rounded-xl border-[1px] border-gray-900'>
          <section className="bg-white dark:bg-gray-900  py-4 antialiased">
            <div className="max-w-2xl mx-auto px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comment</h2>
              </div>
              <form className="mb-6" onSubmit={handleComment}>
                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <label htmlFor="comment" className="sr-only">Your comment</label>
                  <textarea id="comment" rows="3"
                    onChange={(e) => { setComment({ ...comments, name: e.target.value }) }}
                    name='name'
                    className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                    placeholder="Write a comment..." required></textarea>
                </div>
                <button type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white  bg-gray-800 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                  Post comment
                </button>
              </form>
              <article className="text-base bg-white rounded-lg dark:bg-gray-900">
                {allComments && allComments.length > 0 ? (
                  allComments.map((item,index) => (
                    <div key={index}>
                      <p className='text-gray-500 dark:text-gray-400 my-6'> {index+1}. {item.data.name}</p>
                    </div>
                  ))
                ) : (
                  <p>No comments available.</p>
                )}


           
                <div className="flex items-center mt-4 space-x-4">
                  <button type="button"
                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
                    <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    </svg>
                    Reply
                  </button>
                </div>
              </article>



            </div>
          </section>
        </div>

      </section>


      <div className="font-sans bg-white py-4 mx-auto lg:max-w-7xl md:max-w-4xl">
        <h2 className="text-4xl font-extrabold text-gray-800 justify-center items-center mb-16 flex gap-2">Similar Books <RiBookShelfFill /></h2>
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
