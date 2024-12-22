import React from 'react'
import { MdEdit, MdOutlineDeleteSweep } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Order = () => {
  return (
    <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
        <h4 className="bg-[#F8F8F9] w-full  py-3 text-[25px] rounded-t-lg ps-4">Orders</h4>
        <input type="text" className='w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] ' placeholder='Search Users...' />

      <div className="w-full rounded-t-lg overflow-x-auto book  border-[1px]">
        <div className="px-4  bg-white pt-3 pb-6 rounded-b-lg  ">
          <table class="min-w-full leading-normal">
            <thead className='bg-[#0297B2] text-white text-nowrap'>
              <tr className="border-b-[1px]">

                <th
                  class="px-5 py-3 flex  text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Sno

                  <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                  </svg>
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Custmoer Name
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Order Date
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Items
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Total
                </th>


                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Payment
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Delivery
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  class="px-5 py-3  "
                >
                  Mode
                </th>
              </tr>
            </thead>
            <tbody className='my-2'>

              <tr className=" border-b-[1px] text-nowrap ">


                <td class="px-5 text-center   bg-white  text-md ">
                  <p>1</p>
                </td>

                <td class="px-5  text-center  bg-white  text-md ">
                  <p>123344dwe</p>

                </td>
                <td class="px-5 text-center   bg-white text-md ">

                  Dilip

                </td>

                <td class="px-5 text-center   bg-white text-md ">

                  <p>deepmali90@gmail.com</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-12-2024</p>

                </td>
                <td class="px-5 text-center   bg-white text-md ">

                  <p>Book</p>

                </td>

                <td class="px-5  text-center  bg-white text-md ">

                  <p>5</p>

                </td>

                <td class="px-5 text-center   bg-white text-md ">

                  <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Success</span>

                </td>

                <td class="px-5  text-center  bg-white text-md ">

                  <span class="bg-blue-100 text-blue-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-blue-400">Pending</span>

                </td>





                <td class="px-5 flex items-center justify-center   bg-white font-semibold ">
                  <span class="bg-[#FBDDDD] text-[rgb(235,87,87)] mx-auto p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

             
                </td>
                <td className='text-center'>
                  <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Enabled</span>
                </td>
              </tr>






            </tbody>




          </table>
        </div>
      </div>

    </div>
  )
}

export default Order
