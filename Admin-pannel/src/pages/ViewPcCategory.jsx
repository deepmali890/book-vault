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


const paragraphStyles = {
  WebkitLineClamp: 1,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'

}

const ViewPcCategory = () => {

  const [category, setCategory] = useState([])
  const [deletedCategory, setdeletedCategory] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false);

  const fatchParentCategory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/read-parent-category`)
      .then(response => {
        console.log(response.data)
        setCategory(response.data.data)
      })
      .catch(error => {
        console.error(error)
      });


  }

  const fatchDeletedCategory = () => {

    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/deleted-category`)
      .then(response => {
        // console.log("Dilip",response.data)
        setdeletedCategory(response.data.data)
      })
      .catch(error => {
        console.error(error)
      });


  }
  useEffect(() => { fatchParentCategory(); fatchDeletedCategory() }, [])

  const notify = (e) => {
    const status = e.target.textContent !== "Enabled";
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/update-status/${e.target.value}`, { status })
      .then(response => {
        console.log(response.data)
        // fatchParentCategory()
        toast.success("Your Status Updated!", {
          autoClose: 700,

        });
        const index = category.findIndex((cat) => cat._id === e.target.value);
        const newData = [...category];
        newData[index].status = status;
        setCategory(newData)


      })
      .catch(error => {
        console.error(error)
      });
  }

  const handleDaleteParentCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will  delete the item!!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/delete-Parent-Category/${id}`)
          .then((response) => {
            setCategory((pre) => (
              pre.filter((categoryy) => categoryy._id !== id)
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success"
            });
            fatchDeletedCategory()
          })
          .catch((error) => {
            console.log(error)
          })


      }
    });



  }

  const handleParmanentDaleteParentCategory = (id) => {


    axios.delete(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/delete-category/${id}`)
      .then((response) => {
        setCategory((pre) => (
          pre.filter((categoryy) => categoryy._id !== id)
        ))
    
        fatchDeletedCategory()
      })
      .catch((error) => {
        console.log(error)
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
      setChecked(category.map((item) => item._id))
    }
    else {
      setChecked([])
    }
  }


  useEffect(() => {
    setIfAllChecked(category.length === checked.length && category.length !== 0)
  }, [category, checked])

  const handleMultiDelete = () => {
    if (checked.length === 0) return

    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/multidelete-category`, { ids: checked })
      .then((res) => {
        console.log(res.data)
        setCategory((pre) => (
          pre.filter((item) => !checked.includes(item._id))
        ))
        setChecked([])
        setIfAllChecked(false)
      })
      .catch((error) => {
        console.log(error)
      })


  }

  const restoreCategory = (id) => {
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/restore-category/${id}`)
      .then(() => {
        fatchParentCategory();
        fatchDeletedCategory()

      })
      .catch((error) => {
        console.log(error)
      })

  }


  return (
    <>
      <div className="w-full mt-10 px-10    pb-8 h-[100vh]">
        <Tooltip id="my-tooltip" />
        <ToastContainer position="bottom-right" />
        <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
          <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Parent category</h4>
          <div className=" me-2">
            <Dialog >
              <DialogTrigger >
                <Button className="bg-transparent border-none hover:bg-inherit" variant="outline"> <MdOutlineDeleteForever className='text-[30px]  cursor-pointer' /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle className="bg-red-100 text-[#EB5757] w-[130px] rounded-[0px_10px_10px_0px] absolute top-2 left-0 text-center py-1 dark:bg-gray-700 dark:text-red-400 border border-red-400">Deleted Items</DialogTitle>
                  <DialogDescription>
                    {
                      (deletedCategory.length === 0) ? "No Data Found" :
                        <table class="min-w-full mt-4 leading-normal">
                          <thead className='bg-[#0297B2] text-white'>
                            <tr className="border-b-[1px]">

                              <th
                                class="px-5 py-3 flex  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Sno

                                <svg class="w-4 h-4 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 15 4 4 4-4m0-6-4-4-4 4" />
                                </svg>
                              </th>
                              <th
                                class="px-5 py-3   text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Category Name
                              </th>
                              <th
                                class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                              >
                                Description
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
                              deletedCategory.map((category, index) => (
                                <tr className=" border-b-[1px] " key={index}>


                                  <td class="px-5   bg-white  text-md ">
                                    <p>{index + 1}</p>
                                  </td>

                                  <td class="px-5 text-center   bg-white  text-md ">
                                    <p>{category.name}</p>

                                  </td>
                                  <td class="px-5    bg-white text-md ">
                                    <span
                                      class="relative inline-block px-3 py-1  text-green-900 leading-tight">

                                      <span>
                                        {category.description}
                                      </span>
                                    </span>
                                  </td>
                                  <td class="px-5 flex items-center   bg-white font-semibold ">
                                    <span onClick={() => { handleParmanentDaleteParentCategory(category._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                                    <span onClick={() => { restoreCategory(category._id) }} class="bg-[#eae7d3] text-[#988349]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <MdOutlineSettingsBackupRestore className='text-[18px]' /> </span>
                                  </td>

                                </tr>
                              ))
                            }

                          </tbody>
                        </table>
                    }

                  </DialogDescription>
                </DialogHeader>
                {/* <div className="bg-blue-100 text-blue-500 dark:bg-blue-700 dark:text-blue-300 border ps-2 border-blue-400">
                Here are your deleted items. You can review or restore them as needed.
                </div> */}
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className=" flex justify-between items-center">
          <input type="text" className='w-1/4 bg-transparent font-serif outline-none py-2 my-2 ps-4 border-[1px] ' placeholder='Search Category...' />
          <Link to={'/dashboard/category/add-parent-category'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaPen /></div> </Link>
        </div>

        <div className="w-full rounded-t-lg  border-[1px]">

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
                    Category Name
                  </th>
                  <th
                    class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                  >
                    Description
                  </th>

                  <th
                    class="px-5 py-3   text-left text-xs font-bold  uppercase tracking-wider"
                  >

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
                  category.map((item, index) => (
                    <tr className=" border-b-[1px] " key={index}>

                      <td class="px-5   bg-white  text-center ">
                        <input type="checkbox"
                          name="delete"
                          id="delete1"
                          value={item._id}
                          onClick={handleCheck}
                          checked={checked.includes(item._id)}
                          className='accent-[#23acc4]   bg-inherit shadow-2xl cursor-pointer ' />
                      </td>

                      <td class="px-5   bg-white  text-md ">
                        <p>{index + 1}</p>
                      </td>

                      <td class="px-5   bg-white  text-md ">
                        <p>{item.name}</p>

                      </td>
                      <td class="px-5    bg-white text-md ">
                        <span
                          className={`relative cursor-pointer inline-block px-3 py-1  ${isOpen === index ? "h-[50px] w-[330px] overflow-y-auto overflow-x-hidden" : " h-[28px] w-[100px] "} text-green-900 leading-tight`}
                          style={isOpen === index ? null : paragraphStyles}>
                          {item.description}
                        </span>

                        {/* <button>Read More ...</button> */}
                      </td>
                      <td class="px-5 cursor-pointer   bg-white  text-md ">
                        <p onClick={() => setIsOpen(isOpen === index ? null : index)}>
                          {isOpen === index ? 'Read Less...' : 'Read More...'}
                        </p>

                      </td>
                      <td class="px-5   bg-white font-semibold ">
                        <div className="flex items-center ">
                        <span onClick={() => { handleDaleteParentCategory(item._id) }} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                        <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <Link to={`/dashboard/category/update-parent-category/${item._id}`}> <MdEdit className='text-[18px]' /> </Link></span>
                        </div>
                      </td>
                      <td className='text-center'>
                        <button
                          onClick={notify}
                          data-tooltip-id="my-tooltip"
                          value={item._id}
                          data-tooltip-content={(item.status) ? "Click to Disabled" : "Click to Enabled"}
                          className={` ${(item.status) ? "  bg-green-100 text-green-800 dark:bg-gray-700 dark:text-green-400 border border-green-400" :
                            "  bg-red-100 text-red-800 dark:bg-gray-700 dark:text-red-400 border border-green-red"} text-xs font-medium  px-2.5 py-0.5 rounded `}>
                          {(item.status) ? "Enabled" : "Disabled"}
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

export default ViewPcCategory
