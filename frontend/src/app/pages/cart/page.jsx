'use client'

import { fatchCart } from "@/app/redux/slices/cartSlice"
import Cookies from "js-cookie"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Cart({ cartStatus, setCartStatus }) {

  const [carts,setCarts] = useState([])
  const [filePath,setFilePath] = useState('')

  const dispatch = useDispatch()

  const cartData = useSelector((state)=>state.cart.value)

    useEffect(() => {
  
      const cookiedata = Cookies.get("book_vault");
      if (!cookiedata) return;
      const userData = JSON.parse(cookiedata);
  
      dispatch(fatchCart(userData.userId))
      // Fetch all books
    }, [dispatch]);

    useEffect(()=>{
      console.log('CartData====>',cartData)
      if(cartData.data) setCarts(cartData.data)
      if(cartData.filepath) setFilePath(cartData.filepath)

    },[cartData])
    console.log(carts,filePath)
  
  return (
    <>

      <div className={`${cartStatus ? "opacity-100 visible" : "opacity-0 invisible"} `}>
        <div className="relative z-[999999]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

          <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                <div className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">BookCart</h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button onClick={() => setCartStatus(!cartStatus)} type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Close panel</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                         {
                         carts && carts.map((cart, index) => (
                            <li className="flex py-6" key={index}>
                            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={filePath + cart.book.frontimg} alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch." className="size-full object-cover" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">{cart.name}</a>
                                  </h3>
                                  <p className="ml-4"></p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty 1</p>

                                <div className="flex">
                                  <button type="button" className="font-medium text-[#1F2937] hover:text-[#222b37]">Remove</button>
                                </div>
                              </div>
                            </div>
                          </li>

                          ))
                         }


                       

                          </ul>
                        </div>
                      </div>
                    </div>




                    

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>$262.00</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link href={'/checkouts'}><p className={` flex items-center justify-center rounded-md border border-transparent bg-[#1F2937] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#232d3a]`}>Checkout</p> </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <Link href={'/allProduct'}><button onClick={()=>setCartStatus(false)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}