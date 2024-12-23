'use client'
import Timer from '@/app/components/ui/Timer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Countdown from 'react-countdown'
import { FaFingerprint } from 'react-icons/fa'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { IoReturnUpBackOutline } from 'react-icons/io5'
import { MdOutlineAttachEmail } from 'react-icons/md'

const page = () => {

    const route = useRouter()

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
    const ref5 = useRef(null)
    const ref6 = useRef(null)

    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')
    const [otp5, setOtp5] = useState('')
    const [otp6, setOtp6] = useState('')

    const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6]

    const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6]

    useEffect(() => {
        if (ref1.current) {
            ref1.current.focus()
        }
    }, [])

    const inputChange = (event, location) => {
        if (location < 5 && event.target.value) {
            inputRef[location + 1].current.focus()
        }

        otpArray[location](event.target.value)
    }

    const otpHandler = (e) => {
        e.preventDefault()
        e.target.reset()
        console.log(otp1, otp2, otp3, otp4, otp5, otp6)
        route.push('/pages/forgetpassword/updatepassword'   )
    }
    return (
        <div className=" border-[1px] px-4  mb-10 shadow-lg rounded-lg mt-20 pb-20 w-[400px] mx-auto">
            <div className=" text-center my-4">
                <h2><FaFingerprint className='mx-auto text-[26px]' /></h2>
                <span className='text-[24px] font-bold'>Verify Otp </span>
                <p className='text-[14px] font-semibold'>Enter 6 Digit OTP here we are just sent at your email </p>
            </div>

            <form action="" onSubmit={otpHandler} >
                <div className="  gap-1.5 mt-6">
                    <label htmlFor="name">OTP :</label>
                    <div className=" flex justify-between items-center ">
                        {inputRef.map((item, index) => (
                            <input
                                required
                                onChange={(event) => inputChange(event, index)}
                                ref={item}
                                onInput={(e) => {
                                    if (e.target.value.length > 1) {
                                        e.target.value = e.target.value.slice(0, 1)
                                    }
                                }}
                                autoFocus
                                type="number"
                                key={index}
                                className="w-[40px] border-[2px] border-gray-800 p-1 text-center" />
                        ))}
                    </div>

                </div>
                <div className="  gap-1.5 mt-6">
                  <button type='submit' className='w-full bg-gray-800 text-center py-2  rounded-lg text-white'>Verify Otp</button>
                </div>

            </form>
            <Timer />

            <div className="  gap-1.5 mt-6">
                <Link href={'/pages/forgetpassword/emailverify'}>   <span className='w-full  flex items-center justify-start gap-3 py-2  rounded-lg text-gray-800'> <IoReturnUpBackOutline className='text-[22px]' /> Back To Email Page</span></Link>
            </div>


        </div>
    )
}

export default page

