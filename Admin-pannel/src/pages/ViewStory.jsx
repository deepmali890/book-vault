import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDeleteForever, MdOutlineDeleteSweep, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { Button } from "@/components/ui/button"
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
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

const ViewStory = () => {
  const [story, setStory] = useState([])
  const [deletedStory, setDeletedStory] = useState([])
  const [filepath, setFilepath] = useState("")
  const [videopath, setVideopath] = useState("")
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const fatchStory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/read-story`)
      .then((response) => {
        console.log(response.data)
        setStory(response.data.data)
        setFilepath(response.data.filepath)
        setVideopath(response.data.videoPath)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fatchDeletedStory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/deleted-story`)
      .then((response) => {
        console.log(response.data)
        setDeletedStory(response.data.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => { fatchStory(); fatchDeletedStory() }, [])

  const notify = (e) => {
    console.log(e.target.value, e.target.textContent)
    const status = e.target.textContent !== "Enabled";

    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/update-story-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)
        // fatchStory()
        toast.success("Your Status Updated!", {
          autoClose: 700,

        });

        const index = story.findIndex((items) => items._id === e.target.value)
        const newData = [...story]
        newData[index].status = status
        setStory(newData)

      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleDeleteStory = (id) => {

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

        axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/delete-story/${id}`)
          .then((response) => {
            console.log(response.data)
            setStory((pre) => (
              pre.filter((categoryy) => categoryy._id !== id)
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fatchDeletedStory()
          })
          .catch((error) => {
            console.error(error);
          });

      }
    });



  }

  const handleRestoreCategory = (id) => {
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/restore-story/${id}`)
      .then((response) => {
        console.log(response.data)
        fatchStory();
        fatchDeletedStory();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleParmanentDaleteStory = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/delete-story/${id}`)
      .then((response) => {
        console.log(response.data)
        setStory((pre) => (
          pre.filter((categoryy) => categoryy._id !== id)
        ))
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        fatchDeletedStory()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCheck = (e) => {
    console.log(e.target.checked)
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
      setChecked(story.map((item) => item._id))
    }
    else {
      setChecked([])
    }
  }

  useEffect(() => {
    setIfAllChecked(story.length === checked.length && story.length !== 0)
  }, [story, checked])

  const handleMultiDelete = () => {
    if (checked.length === 0) return

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
        axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/multi-delete-story`, { ids: checked })
          .then((response) => {
            console.log(response.data)
            setStory((pre) => (
              pre.filter((categoryy) => !checked.includes(categoryy._id))
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });

            fatchDeletedStory()
          })
          .catch((error) => {
            console.error(error);
          });

      }
    });


  }


  return (
    <>
      <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
        <Tooltip id="my-tooltip" />
        <ToastContainer position="bottom-right" />
        <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
          <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Story</h4>
          <div className=" me-2">
            <Dialog >
              <DialogTrigger >
                <Button className="bg-transparent border-none hover:bg-inherit" variant="outline"> <MdOutlineDeleteForever className='text-[30px]  cursor-pointer' /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[900px]">
                <DialogHeader>
                  <DialogTitle className="bg-red-100 text-[#EB5757] w-[130px] rounded-[0px_10px_10px_0px] absolute top-2 left-0 text-center py-1 dark:bg-gray-700 dark:text-red-400 border border-red-400 ">Deleted Items</DialogTitle>
                  <DialogDescription>
                    {
                      (deletedStory.length === 0) ? "No Data Found" :
                        <table class="min-w-full leading-normal mt-6">
                          <thead className='bg-[#0297B2] text-white'>
                            <tr className="border-b-[1px]">

                              <th
                                class="px-5 py-3 flex text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Sno

                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                              </th>
                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Story Name
                              </th>
                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Image
                              </th>

                              <th
                                class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                              >
                                Banner  Image
                              </th>
                              <th
                                class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                              >
                                Video
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Description
                              </th>




                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Action
                              </th>



                            </tr>
                          </thead>
                          <tbody className='my-2'>
                            {
                              deletedStory.map((item, index) => (
                                <tr className=" border-b-[1px] ">


                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{index + 1}</p>
                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    {item.name}
                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <img src={filepath + item.thumbnail} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <img src={filepath + item.banner} alt="" className='w-[200px] h-[70px] rounded-md mx-auto' />
                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <video src={videopath + item.video} controls autoPlay loop muted className='w-[200px]'></video>
                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{item.description}</p>

                                  </td>

                                  <td class="px-5 flex item-center justify-center   bg-white font-semibold ">
                                    <span onClick={() => { handleParmanentDaleteStory(item._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                                    <span onClick={() => { handleRestoreCategory(item._id) }} class="bg-[#eae7d3] text-[#988349]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <MdOutlineSettingsBackupRestore className='text-[18px]' /> </span>
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
             <Link to={'/dashboard/story/add-story'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaPen /></div> </Link>
           </div>
        <div className="w-full rounded-t-lg  border-[1px]">

          <div className="px-4  bg-white pt-3 pb-6 rounded-b-lg text-nowrap  ">
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
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Story Name
                  </th>
                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Image
                  </th>

                  <th
                    class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                  >
                    Banner  Image
                  </th>
                  <th
                    class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                  >
                    Video
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Description
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
                  story.map((items, index) => (
                    <tr className=" border-b-[1px] ">
                      <td class="px-5   bg-white  text-center ">
                        <input type="checkbox"
                          name="delete"
                          id="delete1"
                          value={items._id}
                          onClick={handleCheck}
                          checked={checked.includes(items._id)}
                          className='accent-[#23acc4]   bg-inherit shadow-2xl cursor-pointer ' />
                      </td>


                      <td class="px-5   bg-white text-center  text-md ">
                        <p>{index + 1}</p>
                      </td>

                      <td class="px-5   bg-white text-center  text-md ">
                        {items.name}
                      </td>

                      <td class="px-5    bg-white text-md ">
                        <img src={filepath + items.thumbnail} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                      </td>

                      <td class="px-5    bg-white text-md ">
                        <img src={filepath + items.banner} alt="" className='w-[200px] h-[70px] rounded-md mx-auto' />
                      </td>

                      <td class="px-5    bg-white text-center ">
                        <video src={videopath + items.video} controls autoPlay loop muted className='w-[300px] '></video>
                      </td>

                      <td class="px-5   bg-white text-center  text-md ">
                      <marquee behavior="scroll" direction="up" scrollamount="3" class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                        {items.description}
                      </marquee>

                      </td>


                      <td class="px-5    bg-white font-semibold ">
                        <div className="flex items-center ">
                        <span onClick={() => { handleDeleteStory(items._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                        <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300"> <Link to={`/dashboard/story/update-story/${items._id}`}> <MdEdit className='text-[18px]' /> </Link>  </span>
                        </div>
                      </td>



                      <td className='text-center'>
                        <button
                          onClick={notify}
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

export default ViewStory
