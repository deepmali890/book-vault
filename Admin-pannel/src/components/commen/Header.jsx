import React, { useState } from 'react'
import { IoMailOpenOutline, IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { CiLock, CiLogout } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
    let [profileDropDown, setProfileDropDown] = useState(false);
    return (
        <div className='w-full shadow-xl py-1 flex items-center justify-between px-10 sticky top-0 left-0 bg-white'>
            <div className="w-[30%] items-center gap-2 flex px-2 border-[1px] rounded-md  py-1 bg-[#FAFAFA]">
                <IoSearchOutline className='text-[22px] text-gray-400' />
                <input type="text" className='w-full bg-transparent font-serif outline-none ' placeholder='Search....' />
            </div>
            <div className="w-[30%] flex justify-end items-center gap-6  ">
            <Link to={'/dashboard'}> <MdOutlineHome className='text-[22px]' /></Link>
             <Link to={'/dashboard/member'}>  <IoMailOpenOutline className='text-[22px]' /> </Link>
             <Link to={'/dashboard/order'}>   <IoNotificationsOutline className=' text-[22px]' /></Link>
                <div className=" flex items-center gap-2 cursor-pointer" onClick={() => setProfileDropDown(!profileDropDown)}>
                    <Avatar >
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>

                    <div
                        className={
                            profileDropDown === false
                                ? "hidden"
                                : "w-[180px] absolute top-[45px] z-[999999] rounded-[5px] bg-white border right-[0px] profileBox"
                        }
                    >
                        <ul className="list-none w-full ">
                            <Link to="/dashboard/user">
                                <li className="w-full grid grid-cols-[20px_auto] box-border gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                                    <span className="p-[7px_1px]">
                                        <FaUserCircle /> {" "}
                                    </span>
                                    <span>Profile</span>
                                </li>
                            </Link>
                            <li className="w-full box-border grid grid-cols-[30px_auto] gap-[10px] p-[5px] hover:bg-[#f8f8f9]">
                                <span className="p-[7px_1px]">
                                    <CiLock />{" "}
                                </span>
                                <span>
                                    <button>Lock Account</button>
                                </span>
                            </li>
                            <li className="w-full box-border grid grid-cols-[30px_auto] gap-[10px] p-[5px] hover:bg-[#f8f8f9]" >
                                <span className="p-[7px_1px]">
                                    <CiLogout className=" rotate-180" />{" "}
                                </span>
                                <span>
                                    <button >Log Out</button>
                                </span>
                            </li>
                        </ul>
                    </div>
                    <h2>Dilip Mali</h2>
                </div>

            </div>


        </div>
    )
}

export default Header
