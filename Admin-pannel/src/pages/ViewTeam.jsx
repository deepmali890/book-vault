import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPen } from 'react-icons/fa';
import { MdEdit, MdOutlineDeleteSweep } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Tooltip } from 'react-tooltip';

const ViewTeam = () => {

    const [teamData, setTeamdata] = useState([])
    const [filepath, setFilePath] = useState('')

    const fatchTeam = () => {
        axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/team/read-team`)
            .then(response => {
                console.log(response.data)
                setTeamdata(response.data.data)
                setFilePath(response.data.filepath)

            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => { fatchTeam() }, [])


    return (
        <>
            <div className=" mt-10 px-4 w-full   pb-8 h-screen">
                <Tooltip id="my-tooltip" />
                <ToastContainer position="bottom-right" />
                <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
                    <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Books</h4>



                </div>
                <div className="w-full overflow-x-auto book rounded-t-lg  border-[1px]">
                    <div className=" flex gap-4 items-center">
                        <input type="text" className='w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] ' placeholder='Search Category...' />
                        <Link to={'/dashboard/book/add-book'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaPen /></div> </Link>
                    </div>
                    <div className="px-4   bg-white pt-3 pb-6 rounded-b-lg  ">
                        <table class="w-full  ">
                            <thead className='bg-[#0297B2]  overflow-x-auto book w-full text-nowrap text-white'>
                                <tr className="border-b-[1px]">
                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        <div className=" flex items-center gap-2 ">
                                            <button
                                                // onClick={handleMultiDelete}
                                                className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]">
                                                DeleteMany
                                            </button>
                                            <input type="checkbox"
                                                name="deleteAll"
                                                id="deleteAllCat"
                                                // onClick={handleAllCheck}
                                                // checked={ifAllChecked}
                                                className='accent-[white]   bg-inherit shadow-2xl cursor-pointer ' />
                                        </div>

                                    </th>

                                    <th
                                        class="px-5 py-3r"
                                    >
                                        <div className=" flex text-xs font-bold  uppercase tracking-wide  text-center items-center ">
                                            Sno

                                            <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                            </svg>
                                        </div>
                                    </th>
                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Name
                                    </th>
                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Role
                                    </th>

                                    <th
                                        class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Email
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Phone
                                    </th>


                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Profile
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Bio
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Skills
                                    </th>


                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Experience
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Linkedin
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        JoiningDate
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        LeavingDate
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Location
                                    </th>

                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Department
                                    </th>



                                    <th
                                        class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
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
                                {
                                    teamData.map((items, index) => (
                                        <tr className=" border-b-[1px] " key={index}>
                                            <td class="px-5   bg-white  text-center ">
                                                <input type="checkbox"
                                                    name="delete"
                                                    id="delete1"
                                                    value={items._id}
                                                    // onClick={handleCheck}
                                                    // checked={checked.includes(items._id)}
                                                    className='accent-[#23acc4]   bg-inherit shadow-2xl cursor-pointer ' />
                                            </td>


                                            <td class="px-5   bg-white text-center  text-md ">
                                                <p>{index + 1}</p>
                                            </td>

                                            <td class="px-5   bg-white text-center  text-md ">
                                                {items.name}
                                            </td>

                                            <td class="px-5   bg-white text-center  text-md ">
                                                <p>{items.role}</p>

                                            </td>


                                            <td class="px-5   bg-white text-center  text-md ">
                                                <p>{items.email}</p>

                                            </td>

                                            <td class="px-5   bg-white text-center  text-md ">
                                                <p>{items.phone}</p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">
                                                <img src={filepath + items.profile} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                                            </td>




                                            <td class="px-5   bg-white text-center  text-md ">
                                                <marquee behavior="scroll" direction="up" scrollamount="3" class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.bio}
                                                </marquee>

                                            </td>

                                            <td class="px-5   bg-white text-center  text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.skills}
                                                </p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.experience}
                                                </p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.joiningDate}
                                                </p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.leavingDate}
                                                </p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.location}
                                                </p>

                                            </td>

                                            <td class="px-5    bg-white text-md ">

                                                <p class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                                    {items.department}
                                                </p>

                                            </td>

                                            <td class="px-5   bg-white font-semibold ">
                                                <div className="flex items-center justify-center ">
                                                    <span onClick={() => handleDeleteBook(items._id)} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                                                    <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300"> <Link to={`/dashboard/book/update-book/${items._id}`}> <MdEdit className='text-[18px]' /></Link> </span>
                                                </div>
                                            </td>

                                            <td className='text-center'>
                                                <button
                                                    // onClick={handleupdateBookType}
                                                    data-tooltip-id="my-tooltip"
                                                    value={items._id}
                                                    data-tooltip-content={(items.type) ? "Click to UnPaid" : "Click to Paid"}
                                                    className={` ${(items.type) ? "  bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400" :
                                                        "  bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-green-red"} text-xs font-medium  px-2.5 py-0.5 rounded `}>
                                                    {(items.type) ? "Paid" : "UnPaid "}
                                                </button>

                                            </td>

                                            <td className='text-center'>
                                                <button
                                                    // onClick={notify}
                                                    data-tooltip-id="my-tooltip"
                                                    value={items._id}
                                                    data-tooltip-content={(items.status) ? "Click to Disabled" : "Click to Enabled"}
                                                    className={` ${(items.status) ? "  bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400" :
                                                        "  bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-green-red"} text-xs font-medium  px-2.5 py-0.5 rounded `}>
                                                    {(items.status) ? "Enabled" : "Disabled"}
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                }




                            </tbody>




                        </table>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ViewTeam
