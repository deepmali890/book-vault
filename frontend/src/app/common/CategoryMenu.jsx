'use client'
import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { Cover } from '../components/ui/cover'
import { MdOutlineCategory } from 'react-icons/md'
import { IoArrowRedoCircleOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { fatchparentCategory } from '../redux/slices/parentCategorySlice'
import Link from 'next/link'
import MegaMenu from './MegaMenu'

const CategoryMenu = ({ categoryStatus, setCategoryStatus }) => {
  let [menuHover, setMenuHover] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("eufgeuegfwightycfujhty")
    dispatch(fatchparentCategory())
  }, [dispatch])


  const categories = useSelector((state) => state.parentCategory.value)
  // console.log(categories)
  return (
    <>
      <section className={`${categoryStatus ? "opacity-100 visible fixed z-[999] w-full" : "opacity-0 invisible fixed "} duration-500 top-0`}>
        <div className="w-full h-screen   bg-[rgba(0,0,0,0.7)] overflow-y-auto">
          <div className={`  ${categoryStatus ? "showCat " : "underCat"}  border-2 w-[300px] h-full overflow-y-auto    bg-white   py-4`}>
            <div className="border-b-[1px] flex justify-between items-center border-gray-500  px-4">
              <h3 className='text-left text-2xl font-medium'>
                <Cover className=" flex items-center gap-4"> Categories <MdOutlineCategory /></Cover>
              </h3>
              <RxCross2 className=' text-[24px] cursor-pointer' onClick={() => setCategoryStatus(!categoryStatus)} />

            </div>

            <div className="">
              <ul>
                {
                  categories.map((items, index) => (
                    <Link href={`/collection/${items.name}`} key={index}>  <li onMouseOver={() => setMenuHover(index)} onMouseOut={() => setMenuHover(null)}  onClick={()=>setCategoryStatus(!categoryStatus)}  className='flex gap-3 py-2 text-[14px]    border-t shadow-2xl my-1 rounded-xl cursor-pointer  px-2  '> <IoArrowRedoCircleOutline />
                     {items.name}
                     {
                      menuHover === index && (
                        <MegaMenu subCategories={items.subCategories} menuHover={menuHover} setMenuHover={setMenuHover} />
                      )
                    }
                    </li></Link>

                  ))
                  
                }

              </ul>
            </div>
          </div>

        </div>
      </section>

     
    </>
  )
}

export default CategoryMenu

