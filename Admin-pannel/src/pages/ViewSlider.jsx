import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDeleteForever, MdOutlineDeleteSweep, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'
import { Tooltip } from 'react-tooltip'
import { toast, ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2';
import { FaPen } from 'react-icons/fa';

const ViewSlider = () => {

  const [slider, setSlider] = useState([])
  const [deletedSlider, setdeletedSlider] = useState([])
  const [filePath, setFilePath] = useState('')
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false);


  const fatchSlider = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/read-slider`)
      .then(response => {
        console.log(response.data)
        setSlider(response.data.data)
        setFilePath(response.data.filepath)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const fatchDeletedSlider = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/read-deleted-slider`)
      .then((response) => {
        console.log(response.data)
        setdeletedSlider(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  useEffect(() => { fatchSlider(); fatchDeletedSlider() }, [])

  const notify = (e) => {
    // console.log(e.target.value, e.target.textContent)
    const status = e.target.textContent !== "Enabled";

    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/update-slider-status/${e.target.value}`, { status })
      .then(response => {
        console.log(response.data)
        // fatchSlider()
        toast.success("Your Status Updated!", {
          autoClose: 700,

        });

        const index = slider.findIndex((cats) => cats._id === e.target.value)
        const newData = [...slider]
        newData[index].status = status
        setSlider(newData)

      })
      .catch(error => {
        console.error(error)
      })

  }

  const handleDeleteSlider = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/delete-slider/${id}`)
          .then(response => {
            console.log(response.data)
            setSlider((pre) => (
              pre.filter((categoryy) => categoryy._id !== id)
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fatchDeletedSlider()

          })
          .catch(error => {
            console.error(error)
          })

      }
    });


  }

  const restoreSlider = (id) => {
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/restore-slider/${id}`)
      .then((response) => {
        console.log(response.data)
        fatchSlider();
        fatchDeletedSlider();

      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleParmanentDaleteSlider = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/delete-slider/${id}`)
      .then((response) => {
        console.log(response.data)
        setSlider((pre) => (
          pre.filter((categoryy) => categoryy._id !== id)
        ))

        fatchDeletedSlider()
        fatchSlider()
      })
      .catch(error => {
        console.error(error)
      })

  }

  const handleCheck = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      setChecked([...checked, e.target.value])
    }
    else {
      setChecked((pre) => (
        pre.filter((item) => item !== e.target.value)
      ))
    }


  }

  const handleAllCheck = (e) => {
    setIfAllChecked(e.target.checked)

    if (e.target.checked) {
      setChecked(slider.map((item) => item._id))
    }
    else {
      setChecked([])
    }
  }


  useEffect(() => {
    setIfAllChecked(slider.length === checked.length && slider.length !== 0)
  }, [slider, checked])

  const handleMultiDelete = () => {
    if (checked.length === 0) return
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/slider/multi-delete-slider`, { ids: checked })
      .then((response) => {
        console.log(response.data)
        setSlider((pre) => (
          pre.filter((item) => !checked.includes(item._id))
        ))
        setChecked([])
        setIfAllChecked(false)
        fatchDeletedSlider()
      })
      .catch(error => {
        console.error(error)
      })

  }

  return (
    <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
      <Tooltip id="my-tooltip" />
      <ToastContainer position="bottom-right" />
      <div className="w-full rounded-t-lg  border-[1px]">
        <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
          <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Slider</h4>
          <div className=" me-2">
            <Dialog >
              <DialogTrigger >
                <Button className="bg-transparent border-none hover:bg-inherit" variant="outline"> <MdOutlineDeleteForever className='text-[30px]  cursor-pointer' /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                  <DialogTitle className="bg-red-100 text-[#EB5757] w-[130px] rounded-[0px_10px_10px_0px] absolute top-2 left-0 text-center py-1 dark:bg-gray-700 dark:text-red-400 border border-red-400">Deleted Items</DialogTitle>
                  <DialogDescription>
                    {
                      (deletedSlider.length===0) ? "Data Not Found":
                      <table class="min-w-full leading-normal mt-6">
                      <thead className='bg-[#0297B2] text-white'>
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
                            Slider Name
                          </th>
                          <th
                            class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                          >
                            Heading
                          </th>

                          <th
                            class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                          >
                            Sub Heading
                          </th>

                          <th
                            class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                          >
                            Slider Image
                          </th>

                          <th
                            class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                          >
                            Slider Desc...
                          </th>

                          <th
                            class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                          >
                            Action
                          </th>

                        </tr>
                      </thead>
                      <tbody className='my-2'>
                        {
                          deletedSlider.map((item, index) => (
                            <tr className=" border-b-[1px] " key={index}>


                              <td class="px-5   bg-white  text-md ">
                                <p>{index + 1}</p>
                              </td>

                              <td class="px-5   bg-white  text-md ">
                                <p>{item.name}</p>

                              </td>


                              <td class="px-5   bg-white  text-md ">
                                <p>{item.heading}</p>

                              </td>
                              <td class="px-5   bg-white  text-md ">
                                <p>{item.sub_heading}</p>

                              </td>

                              <td class="px-5    bg-white text-md ">
                                <img src={filePath + item.thumbnail} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                              </td>

                              <td class="px-5    bg-white text-md ">
                                <p>{item.description}</p>
                              </td>


                              <td class="px-5 flex items-center   bg-white font-semibold ">
                                <span onClick={() => { handleParmanentDaleteSlider(item._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                                <span onClick={() => { restoreSlider(item._id) }} class="bg-[#eae7d3] text-[#988349]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <MdOutlineSettingsBackupRestore className='text-[18px]' /> </span>

                              </td>

                            </tr>
                          ))
                        }


                      </tbody>
                      
                    </table>
                    }
              

                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">


                </div>

              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <input type="text" className='w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] ' placeholder='Search Category...' />
          <Link to={'/dashboard/slider/add-slider'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaPen /></div> </Link>
        </div>
        <div className="px-4  bg-white pt-3 pb-6 rounded-b-lg  ">
          <table class="min-w-full leading-normal">
            <thead className='bg-[#0297B2] text-white'>
              <tr className="border-b-[1px]">

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  <div className=" flex items-center gap-2 ">
                    <button
                      onClick={handleMultiDelete}
                      className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]">
                      DeleteMany
                    </button>
                    <input type="checkbox"
                      name="deleteAll"
                      id="deleteAllCat"
                      onClick={handleAllCheck}
                      checked={ifAllChecked}
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
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Slider Name
                </th>
                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Heading
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Sub Heading
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Slider Image
                </th>

                <th
                  class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                >
                  Slider Desc...
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
              {
                slider.map((items, index) => (
                  <tr className=" border-b-[1px] " key={index}>

                    <td class="px-5   bg-white  text-center ">
                      <input type="checkbox"
                        name="delete"
                        id="delete1"
                        value={items._id}
                        onClick={handleCheck}
                        checked={checked.includes(items._id)}
                        className='accent-[#23acc4]   bg-inherit shadow-2xl cursor-pointer ' />
                    </td>


                    <td class="px-5   bg-white  text-md ">
                      <p>{index + 1}</p>
                    </td>

                    <td class="px-5   bg-white  text-md ">
                      <p>{items.name}</p>

                    </td>


                    <td class="px-5   bg-white  text-md ">
                      <p>{items.heading}</p>

                    </td>
                    <td class="px-5   bg-white  text-md ">
                      <p>{items.sub_heading}</p>

                    </td>

                    <td class="px-5    bg-white text-md ">
                      <img src={filePath + items.thumbnail} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                    </td>

                    <td class="px-5    bg-white text-md ">
                      <p>{items.description}</p>
                    </td>


                    <td class="px-5    bg-white font-semibold ">
                      <div className="flex items-center">
                      <span onClick={() => { handleDeleteSlider(items._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>
                      

                      <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <Link to={`/dashboard/slider/update-slider/${items._id}`}> <MdEdit className='text-[18px]' /> </Link></span>
                      </div>
                    </td>
                    <td className='text-center'>
                      <button
                        onClick={notify}
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
  )
}

export default ViewSlider
