import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'
import { MdEdit, MdOutlineDeleteSweep } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Member = () => {
  return (
    <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
        <h4 className="bg-[#F8F8F9]  py-3 text-[25px] rounded-t-lg px-4 font-semibold">Premium Members</h4>
        <input type="text" className='w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] ' placeholder='Search Members...' />
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
                  User  Profile
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  User  Name
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  User Email
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  MemberShip Type
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Start Date
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  End Date
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Total Amount Paid
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Payment Method
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
            <tbody className='my-2 text-nowrap'>

              <tr className=" border-b-[1px] ">


                <td class="px-5   bg-white text-center  text-md ">
                  <p>1</p>
                </td>

                <td class="px-5 flex justify-center   bg-white  text-md ">
                  <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>

                </td>


                <td class="px-5 text-center   bg-white  text-md ">
                  <p>Name</p>

                </td>
                <td class="px-5 text-center  bg-white  text-md ">
                  <p>Email</p>

                </td>

                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-blue-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-blue-400">Basic</span>
                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-12-2024</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-01-2025</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">

                  <span class="bg-gray-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-gray-400">₹399</span>

                </td>
                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-purple-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-purple-400">Phone Pay</span>
                </td>

                <td class="px-5 flex items-center   bg-white font-semibold ">
                  <span class="bg-[#FBDDDD] text-[#EB5757] p-1 mx-auto  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                 
                </td>
                <td className='text-center'>
                  <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Enabled</span>
                </td>
              </tr>

              <tr className=" border-b-[1px] ">


                <td class="px-5   bg-white text-center  text-md ">
                  <p>2</p>
                </td>

                <td class="px-5 flex justify-center   bg-white  text-md ">
                  <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>

                </td>


                <td class="px-5 text-center   bg-white  text-md ">
                  <p>Name</p>

                </td>
                <td class="px-5 text-center  bg-white  text-md ">
                  <p>Email</p>

                </td>

                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-[#f2d7d5] text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-[#a93226]">Premium</span>
                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-12-2024</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-01-2025</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">

                  <span class="bg-gray-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-gray-400">₹699</span>

                </td>
                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-yellow-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-yellow-400">Google Pay</span>
                </td>

                <td class="px-5 flex items-center   bg-white font-semibold ">
                  <span class="bg-[#FBDDDD] text-[#EB5757] p-1 mx-auto  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                 
                </td>
                <td className='text-center'>
                  <span class="bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Disabled</span>
                </td>
              </tr>

              <tr className=" border-b-[1px] ">


                <td class="px-5   bg-white text-center  text-md ">
                  <p>3</p>
                </td>

                <td class="px-5 flex justify-center   bg-white  text-md ">
                  <Avatar >
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback></AvatarFallback>
                  </Avatar>

                </td>


                <td class="px-5 text-center   bg-white  text-md ">
                  <p>Name</p>

                </td>
                <td class="px-5 text-center  bg-white  text-md ">
                  <p>Email</p>

                </td>

                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-[#c1fbc2] text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-green-400 border border-green-800">Lifetime</span>
                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-12-2024</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">
                  <p>21-01-2025</p>

                </td>

                <td class="px-5 text-center   bg-white  text-md ">

                  <span class="bg-gray-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-gray-400">₹2099</span>

                </td>
                <td class="px-5 text-center    bg-white text-md ">
                  <span class="bg-blue-100 text-gray- text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-blue-700 dark:text-green-400 border border-blue-400">Paytm</span>
                </td>

                <td class="px-5 flex items-center   bg-white font-semibold ">
                  <span class="bg-[#FBDDDD] text-[#EB5757] p-1 mx-auto  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                 
                </td>
                <td className='text-center'>
                  <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-green-700 dark:text-red-400 border border-green-400">Enabled</span>
                </td>
              </tr>








            </tbody>




          </table>
        </div>
      </div>

    </div>
  )
}

export default Member
