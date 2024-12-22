'use client'
import React from 'react'
import { MdOutlineCategory } from 'react-icons/md'
import { Cover } from '../components/ui/cover'
import Link from 'next/link'

const MegaMenu = ({ menuHover, setMenuHover, subCategories }) => {
  // console.log("subCategories",subCategories)
  return (
   <>
    <section onMouseOver={() => setMenuHover(1)} onMouseOut={() => setMenuHover(0)} className={`${menuHover != 100 ? " absolute   left-[298px] top-0 z-[999999]" : " absolute top-0  "} duration-500 w-full bg-[#F9F9F9]  `}>
          <div className={`    border-2 w-[200px] h-screen fixed   bg-white   py-4`}>
            <div className="border-b-[1px] flex justify-between items-center border-gray-500  px-4">
              <h3 className='text-left text-2xl font-medium'>
                <Cover className=" text-[14px] flex items-center gap-4"> Book Category <MdOutlineCategory /></Cover>
              </h3>

            </div>

            <div className="">
              <ul>
              {
              subCategories.map((category, index) => (

                <Link key={index}   href={`/subCategory/${category.slug}`}>    <li className="flex gap-3 py-2 text-[14px]    border-t shadow-2xl my-1 rounded-xl cursor-pointer  px-2   hover:underline capitalize">
                 {category.name}
                </li></Link>
              ))
            }

              </ul>
            </div>
          </div>

      </section>
   </>
  )
}

export default MegaMenu
