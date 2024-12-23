'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { FcUnlock } from 'react-icons/fc'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { MdOutlineAttachEmail } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'

const page = () => {

    const route = useRouter()

    const [emailData,setEmailData] = useState('')

    const emailHandler =(e)=>{
        e.preventDefault()
        console.log(emailData.email)
        e.target.reset()
        route.push('/pages/forgetpassword/otp')


    }
    return (
        <>
            <div >

                <div className=" h-screen  bg-white overflow-y-auto">

                    <div className="text-center ">
                        {/* <Image src={loginlogo} className='w-[80px] mx-auto my-3' /> */}
                        <h2 className='my-1 text-[22px] font-semibold'>Forgot Your Password?</h2>
                        <p className=' text-[16px] flex gap-2 items-center justify-center'>"Don’t worry! Resetting your password is easy. Just provide your email address, and we’ll send you a link to create a new one." <FcUnlock /></p>
                        <p className='text-[16px] flex gap-2 my-1 items-center justify-center'>"Make sure to check your inbox (and spam folder) for the reset email. For further assistance, contact our support team."</p>
                    </div>


                    <div className=" border-[1px] px-4  shadow-lg rounded-lg mt-20 pb-20 w-[400px] mx-auto">
                        <div className=" text-center my-4">
                            <h2><MdOutlineAttachEmail className='mx-auto text-[26px]' /></h2>
                            <span className='text-[24px] font-bold'>Forget Password</span>
                        </div>

                        <form action="" onSubmit={emailHandler}>
                        <div className="  gap-1.5 mt-6">
                            <label htmlFor="name">Email Name :</label>
                            <input required name='email'  onChange={(e) => { setEmailData({ ...emailData, email: e.target.value }) }} type="email" id="email" placeholder="Email" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
                        </div>
                        <div className="  gap-1.5 mt-6">
                            <button type='submit' className='w-full bg-gray-800 text-center py-2  rounded-lg text-white'>Send Otp</button>
                        </div>
                        </form>
                        <div className="  gap-1.5 mt-6">
                            <Link href={'/'}>   <span className='w-full bg-gray-800/40 flex items-center justify-center gap-3 py-2  rounded-lg text-gray-800'> <IoIosArrowRoundBack className='text-[22px]' /> Back To Homepage</span></Link>
                        </div>
                   

                    </div>




                </div>

                <h5 className='text-[10px] font-semibold absolute bottom-0 left-[200px]  mt-5'>

                    By signing in, you agree to Book Vault’s Terms & Conditions and Privacy Policy, consent to receive Book Vault’s electronic communications, and unlock a personalized book journey with exclusive features, updates, and offers tailored just for you.</h5>
            </div>
        </>
    )
}

export default page
