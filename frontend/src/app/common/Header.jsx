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
      <header className='max-w-full p-0  shadow-lg py-1 sticky top-0 left-0 z-[9999] bg-gradient-to-r  bg-white/30 backdrop-blur-md  border-gray-300'>
        <nav className='flex max-w-full justify-between px-10 '>
          <aside className=' w-[60%] px-5  flex gap-10 items-center   '>
            <figure>
              <Link href={'/'}>  <Image src={logo} alt='logo' className='w-[200px]' /> </Link>
            </figure>
            <div className="">
              <ul className='flex items-center gap-14  font-semibold'>
                <li onClick={() => setCategoryStatus(true)} className='cursor-pointer flex gap-2 items-center '> <FaBars /> Categories </li>
                <Link href={'/allProduct'}> <li className='cursor-pointer flex gap-2 items-center'>Shop <IoLibrarySharp /></li></Link>
                <Link href={'/pages/author'}><li className='cursor-pointer  gap-2 items-center sm:hidden lg:flex'>Author <HiPencilSquare /></li></Link>
                <Link href={'/pages/about'}> <li className='cursor-pointer  gap-2 items-center sm:hidden lg:flex '>About <TbListDetails /> </li> </Link>
                <Link href={'/pages/blog'}> <li className='cursor-pointer  items-center gap-2 sm:hidden lg:flex'>Blog <HiNewspaper /></li></Link>
                <Link href={'/pages/contact'}><li className='cursor-pointer  gap-2 items-center sm:hidden lg:flex'>Contact <MdOutlineConnectWithoutContact /></li></Link>
              </ul>
            </div>
          </aside>

          <aside className=' blur-md invert drop-shadow-xl md:filter-none w-[20%] text-black    flex items-center px-5  duration-[0.3s] '>
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

      <Cart cartStatus={cartStatus} setCartStatus={setCartStatus} />
      <SignUp loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
      <CategoryMenu categoryStatus={categoryStatus} setCategoryStatus={setCategoryStatus} />
    </>


  )
}

export default Header
