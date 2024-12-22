import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../public/White_Book_Store_Minimalist_Logo__3_-removebg-preview.png'
import { PiEyesDuotone, PiUserCircleGearFill } from "react-icons/pi";
import { IoIosArrowForward } from "react-icons/io";
import { TfiDashboard, TfiLayoutSlider, TfiWrite } from "react-icons/tfi";
import { FaUncharted } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { MdAdminPanelSettings, MdBorderColor, MdContactSupport, MdDoubleArrow, MdOutlineDoubleArrow } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { ImBooks } from "react-icons/im";
import { RiContactsBook2Line } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import { FaArrowsDownToPeople, FaUsersGear } from "react-icons/fa6";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { MdOutlineAddLink } from "react-icons/md";
import { TiArrowForward } from "react-icons/ti";


import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const Sidebar = () => {
    return (
        <div className='px-5'>
            <aside className='pt-4 flex items-center gap-2 text-[24px] border-b-[1px] border-b-[#0297B2] border-dashed '>
                <figure>
                    <img src={logo} alt="" className='w-[60px]' />
                </figure>
                <h2 className='font-semibold text-gray-700'> <span className='font-bold text-[#0297B2]'>Book</span> Vault</h2>
            </aside>

            <div className=" flex items-center gap-2 font-semibold">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <PiUserCircleGearFill className='text-[24px]' /> Welcome Admin</AccordionTrigger>
                        <AccordionContent >
                            <span className='text-[12px] font-semibold text-[#0297B2]'>Welcome to the Dashboard! Manage and customize with ease. Let's get started!</span>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div className="">
            <Link to={'/dashboard'}>    <div className="flex gap-4 font-semibold items-center justify-between py-2 hover:text-gray-800 cursor-pointer">
                <TfiDashboard className='text-[24px]' />

                    <span>Dashboard</span>
                    <MdDoubleArrow />
                  
                </div>
                </Link>
                
                <Link to={'/dashboard/user'}>    <div className="flex gap-4 font-semibold items-center justify-between py-2 hover:text-[#0297B2] cursor-pointer">
                <CiSettings className='text-[24px]' />
                    <span>User</span>
                    <MdDoubleArrow />
                  
                </div>
                </Link>
            </div>

            <div className="text-center py-4 font-bold text-gray-800">
                Bookstore Features
            </div>
            <div className="">

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <BiCategory className='text-[24px]' />Parent category</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/category/add-parent-category'}>  <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add category!
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/category/view-parent-category'}> <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                <TiArrowForward />
                                View category!
                                <PiEyesDuotone className='text-[22px]' />
                            </div>
                            </Link>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <ImBooks className='text-[24px]' /> Book category</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/category/add-book-category'}> <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Book Category
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/category/view-book-category'}>
                                <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                    <TiArrowForward />
                                    View Book Category
                                    <PiEyesDuotone className='text-[22px]' />
                                </div>
                            </Link>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <RiContactsBook2Line className='text-[24px]' /> Author</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/add-author'}>   <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Author
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/view-author'}>
                                <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                    <TiArrowForward />
                                    View Author
                                    <PiEyesDuotone className='text-[22px]' />
                                </div>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <FaBookOpen className='text-[24px]' />Books</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/book/add-book'}> <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Books
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/book/view-book'}> <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                <TiArrowForward />
                                View Books
                                <PiEyesDuotone className='text-[22px]' />
                            </div>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>


                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <TfiLayoutSlider className='text-[24px]' />Slider</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/slider/add-slider'}>  <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Slider
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/slider/view-slider'}>
                                <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                    <TiArrowForward />
                                    View Slider
                                    <PiEyesDuotone className='text-[22px]' />
                                </div>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <TbMessageChatbotFilled className='text-[24px]' />Story</AccordionTrigger>
                        <AccordionContent >
                          <Link to={'/dashboard/story/add-story'}>  <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Story
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/story/view-story'}>
                            <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                <TiArrowForward />
                                View Story
                                <PiEyesDuotone className='text-[22px]' />
                            </div>
                            </Link>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <TfiWrite className='text-[24px]' />Blog section</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/blog/add-blog'}>  <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Blog!
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/blog/view-blog'}> <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                <TiArrowForward />
                                View Blog!
                                <PiEyesDuotone className='text-[22px]' />
                            </div>
                            </Link>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> <FaArrowsDownToPeople className='text-[24px]' />Our Team</AccordionTrigger>
                        <AccordionContent >
                            <Link to={'/dashboard/team/add-team'}>  <div className=' font-semibold py-1  cursor-pointer flex gap-2 items-center justify-between'>
                                <TiArrowForward />

                                Add Team Member!
                                <MdOutlineAddLink className='text-[22px]' />
                            </div>
                            </Link>

                            <Link to={'/dashboard/team/view-team'}> <div className=' font-semibold py-1 flex gap-2 cursor-pointer items-center justify-between'>
                                <TiArrowForward />
                                View Team Member!
                                <PiEyesDuotone className='text-[22px]' />
                            </div>
                            </Link>

                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger> 
                          
                           <MdBorderColor className='text-[24px]' />
                           <Link to={'/dashboard/order'}>
                           Order
                          </Link>
                          </AccordionTrigger>

                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <FaUsersGear className='text-[24px]' />
                            <Link to={'/dashboard/member'}> 
                             Member
                             </Link>
                             </AccordionTrigger>
                    </AccordionItem>
                </Accordion>

                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>
                            <MdContactSupport className='text-[24px]' />
                            <Link to={'/dashboard/inquire'}> 
                             Inquire
                             </Link>
                             </AccordionTrigger>
                    </AccordionItem>
                </Accordion>

             





            </div>

        </div>
    )
}

export default Sidebar
