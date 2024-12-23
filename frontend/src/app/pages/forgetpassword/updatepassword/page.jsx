'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { RxUpdate } from 'react-icons/rx'

const page = () => {

    const route= useRouter()

    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')


    const passwordHandler=(e)=>{
        e.preventDefault()
        console.log(password.password,confirmPassword.newpassword)
        route.push('/')

    }
  return (
    <div className=" border-[1px] px-4  shadow-lg rounded-lg mt-20 pb-20 w-[400px] mx-auto">
    <div className=" text-center my-4">
        <h2><RxUpdate className='mx-auto text-[26px]' /></h2>
        <span className='text-[24px] font-bold'>New Password</span>
        <p className='text-[14px] font-bold'>Enter At Least 6-digit Long Password Password</p>
    </div>

    <form action="" onSubmit={passwordHandler}>
    <div className="  gap-1.5 mt-6">
        <label htmlFor="name">New  Password :</label>
        <input required name='password'  onChange={(e) => { setPassword({ ...password, password: e.target.value }) }} type="password" id="email" placeholder="New Password" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
    </div>

    <div className="  gap-1.5 mt-6">
        <label htmlFor="name">Confirm Password :</label>
        <input required name='newpassword'  onChange={(e) => { setConfirmPassword({ ...confirmPassword, newpassword: e.target.value }) }} type="password" id="email" placeholder="Confirm Password" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
    </div>

    <div className="  gap-1.5 mt-6">
        <button  type='submit' className='w-full bg-gray-800 text-center py-2  rounded-lg text-white'>Update Password</button>
    </div>
    </form>
    <div className="  gap-1.5 mt-6">
        <Link href={'/'}>   <span className='w-full bg-gray-800/40 flex items-center justify-center gap-3 py-2  rounded-lg text-gray-800'> <IoIosArrowRoundBack className='text-[22px]' /> Back To Homepage</span></Link>
    </div>


</div>
  )
}

export default page
