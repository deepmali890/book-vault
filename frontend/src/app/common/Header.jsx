'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../../public/Untitled design.png'
import { FaBars, FaRegHeart, FaRegUserCircle } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { MdOutlineConnectWithoutContact } from 'react-icons/md';
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
  const [categoryStatus, setCategoryStatus] = useState(false)
  const [totalBook, setTotalBook] = useState(0)

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
    dispatch(fatchparentCategory());

    const cookieData = Cookies.get("book_vault");
    if (!cookieData) return;
    const userData = JSON.parse(cookieData);
    dispatch(fatchCart(userData.userId));
  }, [dispatch]);

  const handleCart = () => {
    const cookieData = Cookies.get("book_vault");

    if (!cookieData) {
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Please log in to view your cart.",
      });
    }
    setCartStatus(!cartStatus);
  }

  return (
    <>
      <header className='w-full shadow-md bg-white border-b border-gray-200 sticky top-0 z-[999] py-4'>
        <nav className='flex justify-between items-center max-w-[1400px] mx-auto px-6'>

          {/* Left Side: Logo + Menu */}
          <div className='flex items-center gap-10'>
            <Image src={logo} alt="logo" className='' />

            <ul className=' items-center gap-10 text-sm font-semibold text-gray-800 hidden md:flex'>
              <li onClick={() => setCategoryStatus(true)} className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                <FaBars /> Categories
              </li>
              <Link href='/allProduct'>
                <li className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                  <IoLibrarySharp /> Shop
                </li>
              </Link>
              <Link href='/pages/author'>
                <li className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                  <HiPencilSquare /> Author
                </li>
              </Link>
              <Link href='/pages/about'>
                <li className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                  <TbListDetails /> About
                </li>
              </Link>
              <Link href='/pages/blog'>
                <li className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                  <HiNewspaper /> Blog
                </li>
              </Link>
              <Link href='/pages/contact'>
                <li className='cursor-pointer flex items-center gap-2 hover:text-blue-600'>
                  <MdOutlineConnectWithoutContact /> Contact
                </li>
              </Link>
            </ul>
          </div>

          {/* Right Side: Icons */}
          <ul className='flex items-center gap-6 text-xl text-gray-700'>
            <li className='cursor-pointer hover:text-blue-600'><BsSearch /></li>
            <Link href='/pages/wishlist'><li className='cursor-pointer hover:text-blue-600'><FaRegHeart /></li></Link>
            <Link href='/pages/book/book-dateils'><li className='cursor-pointer hover:text-blue-600'><FaBookBookmark /></li></Link>
            <li className='relative cursor-pointer hover:text-blue-600' onClick={handleCart}>
              <IoMdCart />
              {totalBook > 0 && (
                <span className='absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold px-1.5 py-[2px] rounded-full'>
                  {totalBook}
                </span>
              )}
            </li>
            <li className='cursor-pointer hover:text-blue-600'>
              <FaRegUserCircle onClick={() => setLoginStatus(true)} />
            </li>
          </ul>
        </nav>
      </header>

      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <SignUp loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <CategoryMenu categoryStatus={categoryStatus} setCategoryStatus={setCategoryStatus} />
    </>
  )
}

export default Header
