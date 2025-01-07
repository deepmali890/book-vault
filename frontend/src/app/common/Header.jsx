'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../public/White_Book_Store_Minimalist_Logo-removebg-preview.png'
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { MdKeyboardArrowDown, MdOutlineConnectWithoutContact } from 'react-icons/md';
import Link from 'next/link';
import Cart from '../pages/cart/page';
import SignUp from '../models/SignUp';
import CategoryMenu from './CategoryMenu';
import { IoLibrarySharp } from 'react-icons/io5';
import { SiAudiobookshelf } from 'react-icons/si';
import { HiNewspaper, HiPencilSquare } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import { fatchBook } from '../redux/slices/allBooksSlice';
import { fatchAuthor } from '../redux/slices/authorSlice';
import { fatchparentCategory } from '../redux/slices/parentCategorySlice';
import { fatchCart } from '../redux/slices/cartSlice';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Header = () => {
  const [cartStatus, setCartStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [menuHover, setMenuHover] = useState(null)
  const [categoryStatus, setCategoryStatus] = useState(false)
  const [totalBook, setTotalBook] = useState(null)

  const dispatch = useDispatch()

  const cartData = useSelector((state) => state.cart.value)
  useEffect(() => {
    if (Array.isArray(cartData.data)) {
      let total = 0;
      cartData.data.forEach((item) => {
        total += item.quantity;
      });
      setTotalBook(total);
    }
  }, [cartData]);


  useEffect(() => {
    dispatch(fatchBook());
    dispatch(fatchAuthor());
    dispatch(fatchparentCategory())

    const cookiedata = Cookies.get("book_vault");
    if (!cookiedata) return;
    const userData = JSON.parse(cookiedata);

    dispatch(fatchCart(userData.userId))
    // Fetch all books
  }, [dispatch]);


  const handlecart = () => {
    const cookiedata = Cookies.get("book_vault");

    if (!cookiedata) {
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Please log in to view your cart.",
      });
    }
    setCartStatus(!cartStatus)
  }


  return (
    <>
      <header className='max-w-full p-0  shadow-lg py-1 sticky top-0 left-0 z-[999] bg-gradient-to-r  bg-white/30 backdrop-blur-md  border-gray-300'>
        <nav className='flex max-w-full justify-between px-10 '>
          <aside className=' w-[60%] px-5  flex gap-10 items-center   '>

            <button data-drawer-target="cta-button-sidebar" data-drawer-toggle="cta-button-sidebar" aria-controls="cta-button-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
              </svg>
            </button>

            <figure >
              <Link href={'/'}>  <Image src={logo} alt='logo' className='xs:w-[30px] md:w-[200px]' /> </Link>
            </figure>

            <div className=" hidden lg:block">
              <ul className='flex items-center gap-14  font-semibold'>
                <li onClick={() => setCategoryStatus(true)} className='cursor-pointer flex gap-2 items-center '> <FaBars /> Categories </li>
                <Link href={'/allProduct'}> <li className='cursor-pointer flex gap-2 items-center'>  <IoLibrarySharp /> Shop</li></Link>
                <Link href={'/pages/author'}><li className='cursor-pointer  gap-2 items-center lg:flex'><HiPencilSquare /> Author </li></Link>
                <Link href={'/pages/about'}> <li className='cursor-pointer  gap-2 items-center lg:flex '><TbListDetails /> About  </li> </Link>
                <Link href={'/pages/blog'}> <li className='cursor-pointer  items-center gap-2 lg:flex'><HiNewspaper /> Blog </li></Link>
                <Link href={'/pages/contact'}><li className='cursor-pointer  gap-2 items-center lg:flex'><MdOutlineConnectWithoutContact /> Contact </li></Link>
              </ul>
            </div>


            {/* <div className="">
              <ul className='flex-1 items-center gap-14  font-semibold'>
                <li onClick={() => setCategoryStatus(true)} className='cursor-pointer flex gap-2 items-center '> <FaBars /> Categories </li>
                <Link href={'/allProduct'}> <li className='cursor-pointer flex gap-2 items-center'>  <IoLibrarySharp /> Shop</li></Link>
                <Link href={'/pages/author'}><li className='cursor-pointer  gap-2 items-center lg:flex'><HiPencilSquare /> Author </li></Link>
                <Link href={'/pages/about'}> <li className='cursor-pointer  gap-2 items-center lg:flex '><TbListDetails /> About  </li> </Link>
                <Link href={'/pages/blog'}> <li className='cursor-pointer  items-center gap-2 lg:flex'><HiNewspaper /> Blog </li></Link>
                <Link href={'/pages/contact'}><li className='cursor-pointer  gap-2 items-center lg:flex'><MdOutlineConnectWithoutContact /> Contact </li></Link>
              </ul>
            </div> */}

          </aside>

          <aside className='    text-black    flex items-center px-5  duration-[0.3s] '>
            <ul className='flex gap-6 text-[24px] items-center translate-x-3'>
              <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xlz '><BsSearch /></li>
              <Link href={'/pages/wishlist'}>  <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl '><FaRegHeart /></li></Link>
              <Link href={'/pages/book/book-dateils'}>   <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl'><FaBookBookmark /></li></Link>
              <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] relative shadow-2xl' onClick={handlecart}>
                <div className=" absolute bottom-[70%] left-[100%] bg-gray-950 w-[20px] h-[20px] rounded-full ">
                  <div className=" absolute top-0 text-[14px] left-[2px] text-white ">{totalBook}</div>
                </div>

                <IoMdCart />

              </li>
              <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl'><FaRegUserCircle onClick={() => setLoginStatus(true)} /></li>
            </ul>
          </aside>
        </nav>

      </header>

      <header>
        <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
       

            <figure >
              <Link href={'/'}>  <Image src={logo} alt='logo' className='w-[70px]' /> </Link>
            </figure>
            <div class="flex items-center lg:order-2">
              <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a>
              <a href="#" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">Get started</a>
              <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <SignUp loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <CategoryMenu categoryStatus={categoryStatus} setCategoryStatus={setCategoryStatus} />
    </>


  )
}

export default Header
