"use client";
import { fatchBook } from "@/app/redux/slices/allBooksSlice";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { ReactReader } from "react-reader";
import { RiBookShelfFill, RiPlayCircleFill } from "react-icons/ri";
import { GoStarFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { FaBookOpenReader } from "react-icons/fa6";
import { IoIosCart } from "react-icons/io";

import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  const id = useParams();
  const dispatch = useDispatch();
  let [book, setBook] = useState({});
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [filepath, setFilepath] = useState("");
  const Route = useRouter();
  const [windowWidth, setWindowWidth] = useState(undefined);

  useEffect(() => {
    setWindowWidth(window.innerWidth); // Client-side code
  }, []);

  const books = useSelector((state) => state.allBooks.value);

  useEffect(() => {
    dispatch(fatchBook());
  }, [dispatch]);

  useEffect(() => {
    if (!(JSON.stringify(books) === "{}")) {
      const bookbyParam = books.data.filter((item) => item._id === id.pid);

      if (bookbyParam[0]) setBook(bookbyParam[0]);
      setFilepath(books.filepath);
    }
  }, [books]);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      // Redirect to subscription page
      alert("Please subscribe to read this book.");
      Route.push("/pages/subscription-page");
    } else {
      // Allow access to the book
      window.open(filepath + book.pdf);
    }
  };

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
      book: id.pid, // Ensure productId is passed correctly
    };
    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/cart/create-cart`, data)
      .then((res) => {
        console.log(res);
        console.log("Added to Cart");
        dispatch(fatchCart(userData.userId));
      })
      .catch((err) => {
        console.error("Error in adding to cart", err);
      });
    toast.success(data.message || " Product added successfully!");
    dispatch(fatchCart(userData.userId));
  };

  if (windowWidth === undefined) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
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
      </div>
    ); // Fallback content
  }

  return (
    <>
      <div className="font-sans tracking-wide max-md:mx-auto">
        <div className="bg-gradient-to-r md:min-h-[600px] grid from-black via-gray-900 to-black items-start grid-cols-1 lg:grid-cols-5 md:grid-cols-2">
          <div className="lg:col-span-3 h-full flex gap-2 p-8">
            <div className="relative hover:scale-110 duration-[0.3s]  h-full flex items-center justify-center lg:min-h-[580px]">
              <img
                src={filepath + book.frontimg}
                alt="book"
                className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8"
              />
            </div>
            <div className="relative h-full hover:scale-110 duration-[0.3s]  flex items-center justify-center lg:min-h-[580px]">
              <img
                src={filepath + book.backimg}
                alt="book"
                className="lg:w-3/5 w-3/4 h-full object-contain max-lg:p-8"
              />
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-100 py-6 px-8 h-full">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{book.name}</h2>

              <div className="flex space-x-1 mt-2">
                <GoStarFill className="text-yellow-400" />
                <GoStarFill className="text-yellow-400" />
                <GoStarFill className="text-yellow-400" />
                <GoStarFill className="text-yellow-400" />
                <CiStar />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Price</h3>
              <div className="flex gap-4 w-full">
                <p className="text-gray-800 text-3xl font-bold mt-4">
                  ₹ {book.price}
                </p>
                <p className="text-gray-600 text-3xl font-bold mt-4 line-through">
                  ₹ {book.mrp}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={handleSubscribe}
                type="button"
                className="min-w-[200px] flex gap-2 items-center justify-center px-4 py-3 bg-gray-800  hover:bg-gray-700 text-white text-sm font-semibold rounded"
              >
                <FaBookOpenReader />
                Read Now
              </button>
              <button
                onClick={handleAddToCart}
                type="button"
                className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded flex justify-center items-center gap-2"
              >
                {" "}
                <IoIosCart /> Add To Cart{" "}
              </button>
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Free delivery on order $100
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-800 mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current w-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path d="M15.5 33.3h19.1v2H15.5z" data-original="#000000" />
                <path
                  d="M45.2 35.3H43v-2h2.2c.4 0 .8-.4.8-.8v-9.1c0-.4-.3-.6-.5-.7l-3.2-1.3c-.3-.2-.8-.5-1.1-1l-6.5-10c-.1-.2-.4-.3-.7-.3H2.8c-.4 0-.8.4-.8.8v21.6c0 .4.4.8.8.8h3.9v2H2.8C1.3 35.3 0 34 0 32.5V10.9c0-1.5 1.3-2.8 2.8-2.8h31.3c1 0 1.9.5 2.4 1.3l6.5 10 .4.4 2.9 1.2c1.1.5 1.7 1.4 1.7 2.5v9.1c0 1.4-1.3 2.7-2.8 2.7z"
                  data-original="#000000"
                />
                <path
                  d="M26.5 21H3.9v-9.4h22.6zM5.9 19h18.6v-5.4H5.9zm32.9 2H27.9v-9.4h6.3zm-8.9-2h5.7L33 13.6h-3.1zm-19 20.9c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6zm27.9 9.2c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6 5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6zm0-9.2c-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6-1.6-3.6-3.6-3.6z"
                  data-original="#000000"
                />
              </svg>
              Book Subscription Plans
            </div>

            <div className="w-full mt-8 ">
              <div className="text-2xl font-semibold translate-x-3 mb-4">
                Audio Reads
              </div>
              <div className="flex items-center justify-center  bg-red-lightest">
                <div className="bg-white shadow-lg rounded-lg">
                  <div className="flex items-center px-4">
                    <div>
                      <img
                        className="w-[200px] rounded "
                        src="https://tailwindcss.com/img/card-top.jpg"
                        alt="Album Pic"
                      />
                    </div>
                    <div className="w-full p-8">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-1xl text-grey-darkest font-medium">
                            {book.name}
                          </h3>
                          {book.book_category?.name}
                        </div>
                        <Link href={`/pages/audio/audio-details/${book._id}`}>
                          {" "}
                          <div className="text-7xl cursor-pointer">
                            <RiPlayCircleFill className=" text-gray-800 " />
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Comprehensive Book Library
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Genre Filters
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Reading Progress Tracking
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Bookmarking
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Digital Reader
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Audiobook Integration
            </li>

            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              Author Profiles
            </li>

            <li className="flex items-center text-sm text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                className="mr-4 bg-green-500 fill-white rounded-full p-[3px]"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                  data-original="#000000"
                />
              </svg>
              New Arrivals and Bestsellers
            </li>
          </ul>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-gray-800">
              Book Description
            </h3>
            <p className="text-sm text-gray-600 mt-4">{book.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
