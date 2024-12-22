import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'
import { MdOutlineDeleteSweep } from 'react-icons/md'
import { Tooltip } from 'react-tooltip'

const Inquiries = () => {

    const [inquireData, setInquireData] = useState([])
    const [filepath, setFilePath] = useState('')

    const fatchInquire = () => {
        axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/website/inquire/read-inquire`)
            .then((response) => {
                console.log(response.data)
                setInquireData(response.data.data)
                setFilePath(response.data.filepath)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => { fatchInquire() }, [])
    return (
        <>
            <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
                <Tooltip id="my-tooltip" />
                <h4 className="bg-[#F8F8F9] w-full  py-3 text-[25px] rounded-t-lg ps-4">User Inquire</h4>
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
                                        Custmoer Name
                                    </th>

                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Last Name
                                    </th>
                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Email
                                    </th>

                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Attachment
                                    </th>

                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Phone
                                    </th>


                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Message
                                    </th>

                                    <th
                                        class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                                    >
                                        Enquire Time
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
                            <tbody className='my-2 text-center'>
                                {
                                    inquireData.map((items, index) => (
                                        <tr className=" border-b-[1px] text-nowrap " key={index}>


                                            <td class="px-5 text-center   bg-white  text-md ">
                                                <p>{index + 1}</p>
                                            </td>

                                            <td class="px-5 text-center   bg-white text-md ">

                                                {items.firstname}

                                            </td>

                                            <td class="px-5 text-center   bg-white text-md ">

                                                {items.lastaame}

                                            </td>

                                            <td class="px-5 text-center   bg-white text-md ">

                                                <p>{items.email}</p>

                                            </td>

                                            <td class="px-5 text-center    bg-white text-md ">
                                                <a href={filepath + items.pdf}><FaRegFilePdf className='text-[30px] mx-auto' /></a>
                                            </td>
                                            <td class="px-5 text-center   bg-white text-md ">

                                                <p>{items.phone}</p>

                                            </td>

                                            <td class="px-5  text-center  bg-white text-md ">

                                                <p>{items.message}</p>

                                            </td>

                                            <td class="px-5 text-center   bg-white text-md ">

                                                <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">Success</span>

                                            </td>







                                            <td class="px-5 flex items-center justify-center   bg-white font-semibold ">
                                                <span class="bg-[#FBDDDD] text-[rgb(235,87,87)] mx-auto p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>


                                            </td>
                                            <td className='text-center'>
                                                <button
                                                    // onClick={notify}
                                                    data-tooltip-id="my-tooltip"
                                                    value={items._id}
                                                    data-tooltip-content={(items.status) ? "Click to Disabled" : "Click to Enabled"}
                                                    className={`${(items.status) ? "bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400" : "bg-red-100 text-red-800 text-xs font-medium  px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400"}`}>
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

export default Inquiries
