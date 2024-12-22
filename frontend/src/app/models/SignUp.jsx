'use client'
import React from 'react'
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";

const SignUp = ({ loginStatus, setLoginStatus }) => {
  return (
 <>
 <section className={`${loginStatus ? "opacity-100 visible fixed z-[9999999] w-full " : "opacity-0 invisible fixed "} duration-500 top-0`}>
 <div className="w-full h-screen   bg-[rgba(0,0,0,0.7)] overflow-y-auto">
        <div className={`  ${loginStatus ? "showSign " : "underSign"}  border-2 w-[800px] h-full    bg-white   py-4`}>
          <div className="border-b-[1px] flex justify-between border-gray-500 py-4 px-4">
            <h4>Sign Up</h4>
            <RxCross2 className=' text-[24px] cursor-pointer' onClick={()=>setLoginStatus(! loginStatus)} />

          </div>
        
          <div className="p-4">
            <img src="https://w0.peakpx.com/wallpaper/107/46/HD-wallpaper-best-pose-for-profile-for-men-profile-pose-men-best-glasses-thumbnail.jpg" className='w-[150px] h-[150px] rounded-full' alt="" />
          </div>
         
          <form action="" className=''>
          <div className="grid grid-cols-2 gap-3 w-full px-4">
            <div className=" grid  w-full items-center gap-1.5">
              <label htmlFor="email">First Name :</label>
              <input type="text" id="email" placeholder="FirstName" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>

            <div className="grid   w-full items-center gap-1.5">
              <label htmlFor="name">Last Name :</label>
              <input type="text" id="email" placeholder="LastName" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>

            <div className=" grid   w-full items-center gap-1.5">
              <label htmlFor="name">Email Name :</label>
              <input type="email" id="email" placeholder="Email" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>


            <div className=" grid   w-full items-center gap-1.5">
              <label htmlFor="name">Password :</label>
              <input type="password" id="email" placeholder="Password" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
            </div>
            <div className="w-full my-[10px]">
              <label
                htmlFor="categoryStatus"
                className=" text-[#303640] mr-[20px]"
              >
                Gender
              </label>
              <input
                type="radio"
                name="status"
                id="categoryStatus"
                value={true}
                className="input my-[10px] mx-[10px]  cursor-pointer"

              />
              <span>Male</span>
              <input
                type="radio"
                name="status"
                id="categoryStatus"
                value={false}
                className="input my-[10px] mx-[10px]  cursor-pointer"
              />
              <span>Female</span>
            </div>

            <div className=" grid   w-full items-center gap-1.5">
              <label htmlFor="name">Date Of Birth :</label>
              <input type="date" id="date" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
            </div>

          </div>

          <div>
          <div className="text-[13px] mt-6 text-center font-semibold">Social login</div>
          <div className="flex justify-center gap-6 my-4">
            <button className="border-2 hover:bg-[#CCCCCC] lg:w-auto w-full duration-500 border-black py-2.5 px-10 text-[14px] font-medium flex items-center justify-center gap-3"><FaFacebookF className="text-[16px]" /> Sign in with Facebook</button>
            <button className="border-2 hover:bg-[#CCCCCC] lg:w-auto w-full duration-500 border-black py-2.5 px-10 text-[14px] font-medium flex items-center justify-center gap-3"><FaGoogle className="text-[16px]" /> Sign in with Google</button>
          </div>
        </div>

            

            <button type='submit'
              className=" py-2 px-10 w-full  text-white  focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#1F2937]">
              Sign Up
            </button>
          
          

          
            </form>
         
        </div>

      </div>
</section>
 </>
  )
}

export default SignUp
