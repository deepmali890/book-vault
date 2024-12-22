'use client'
import Image from 'next/image'
import React, { useState } from 'react'
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

const Header = () => {
  const [cartStatus, setCartStatus] = useState(false)
  const [loginStatus, setLoginStatus] = useState(false)
  const [menuHover, setMenuHover] = useState(null)
  const [categoryStatus, setCategoryStatus] = useState(false)



  return (
    <>
      <header className='max-w-full p-0  shadow-lg py-1 sticky top-0 left-0 z-[999] bg-gradient-to-r  bg-white  border-gray-300'>
        <nav className='flex max-w-full justify-between px-10 '>
          <aside className=' w-[60%] px-5  flex gap-10 items-center   '>
            <figure>
              <Link href={'/'}>  <Image src={logo} alt='logo' className='w-[200px]' /> </Link>
            </figure>
            <div className="">
              <ul className='flex items-center gap-14  font-semibold'>
                <li onClick={() => setCategoryStatus(true)} className='cursor-pointer flex gap-2 items-center '> <FaBars /> Categories </li>
                <Link href={'/allProduct'}> <li className='cursor-pointer flex gap-2 items-center'>Shop <IoLibrarySharp /></li></Link>
                <li className='cursor-pointer flex gap-2 items-center'>Author <HiPencilSquare /></li>
                <Link href={'/pages/about'}> <li className='cursor-pointer flex gap-2 items-center '>About <TbListDetails /> </li> </Link>
                <Link href={'/pages/blog'}> <li className='cursor-pointer flex items-center gap-2'>Blog <HiNewspaper /></li></Link>
                <Link href={'/pages/contact'}><li className='cursor-pointer flex gap-2 items-center'>Contact <MdOutlineConnectWithoutContact /></li></Link>
              </ul>
            </div>
          </aside>

          <aside className=' blur-md invert drop-shadow-xl md:filter-none w-[20%] text-black    flex items-center px-5  duration-[0.3s] '>
            <ul className='flex gap-6 text-[24px] items-center translate-x-3'>
              <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xlz '><BsSearch /></li>
              <Link href={'/pages/wishlist'}>  <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl '><FaRegHeart /></li></Link>
              <Link href={'/pages/book/book-dateils'}>   <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl'><FaBookBookmark /></li></Link>
              <li className='cursor-pointer hover:skew-y-6 hover:scale-110 duration-[0.5s] shadow-2xl'>
                <IoMdCart onClick={() => setCartStatus(true)} />

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
