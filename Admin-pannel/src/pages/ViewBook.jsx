import React, { useEffect, useState } from 'react'
import { MdEdit, MdOutlineDeleteForever, MdOutlineDeleteSweep, MdOutlineSettingsBackupRestore } from 'react-icons/md'
import { FaRegFilePdf } from "react-icons/fa6";
import Audioplayer from '@/components/ui/Audioplayer';
// import ReactAudioPlayer from 'react-audio-player';
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from 'axios';
import { Tooltip } from 'react-tooltip';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaPen } from 'react-icons/fa';

const paragraphStyles = {
  WebkitLineClamp: 1,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'

}

const ViewBook = () => {

  const [books, setBooks] = useState([])
  const [deletedBook, setdeleteBook] = useState([])
  const [filePath, setFilepath] = useState("")
  const [pdfPath, setPdfPath] = useState("")
  const [audioPath, setAudioPath] = useState("")
  const [checked, setChecked] = useState([])
  const [ifAllChecked, setIfAllChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false)

  const fatchBook = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/read-book`)
      .then((response) => {
        console.log('dilip',response.data);  // Check full response
        setBooks(response.data.data);
        setFilepath(response.data.filepath);
        setPdfPath(response.data.pdfPath);
        setAudioPath(response.data.audioPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const fatchDeletedBook = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/deleted-book`)
      .then((response) => {
        console.log(response.data)
        setdeleteBook(response.data.data)
        setFilepath(response.data.filepath)
        setPdfPath(response.data.pdfPath)
        setAudioPath(response.data.audioPath)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => { fatchBook(); fatchDeletedBook() }, [])

  const notify = (e) => {
    // console.log(e.target.value, e.target.textContent)
    const status = e.target.textContent !== "Enabled";

    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/update-book-status/${e.target.value}`, { status })
      .then((response) => {
        console.log(response.data)
        // fatchBook()
        toast.success("Your Status Updated!", {
          autoClose: 700,

        });

        const index = books.findIndex((item) => item._id === e.target.value)
        const newData = [...books]
        newData[index].status = status
        setBooks(newData)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleupdateBookType = (e) => {
    // console.log(e.target.value, e.target.textContent)
    const type = e.target.textContent !== "Paid";

    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/update-book-type/${e.target.value}`, { type })
      .then((response) => {
        console.log(response.data)
        // fatchBook()
        toast.success("Your Type Updated!", {
          autoClose: 700,

        });

        const indexNum = books.findIndex((items) => items._id === e.target.value)
        const newdata = [...books]
        newdata[indexNum].type = type
        setBooks(newdata)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleDeleteBook = (id) => {
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
        axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/delete-book/${id}`)
          .then((response) => {
            console.log(response.data)
            setBooks((pre) => (
              pre.filter((categoryy) => categoryy._id !== id)
            ))
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            fatchDeletedBook()
          })
          .catch((error) => {
            console.error(error);
          });

      }
    });

  }

  const handlePermanentDeleteBook = (id) => {
    axios.delete(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/delete-book/${id}`)
      .then((response) => {
        console.log(response.data)
        setBooks((pre) => (
          pre.filter((categoryy) => categoryy._id !== id)
        ))
        fatchDeletedBook()

      })
      .catch((error) => {
        console.error(error);
      });

  }

  const handleRestoreBook = (id) => {
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/restore-book/${id}`)
      .then((response) => {
        console.log(response.data)
        fatchBook();
        fatchDeletedBook();
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
      setChecked(books.map((item) => item._id))
    }
    else {
      setChecked([])
    }
  }

  const handleMultiDelete = () => {
    if (checked.length === 0) return
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/many-delete-book`, { ids: checked })
      .then((response) => {
        console.log(response.data)
        setBooks((pre) => (
          pre.filter((multidelete) => !checked.includes(multidelete._id))
        ))
        setChecked([])
        fatchDeletedBook()
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setIfAllChecked(books.length === checked.length && books.length !== 0)
  }, [books, checked])

  return (
    <>
      <div className=" mt-10 px-4 w-full   pb-8 h-screen">
        <Tooltip id="my-tooltip" />
        <ToastContainer position="bottom-right" />
        <div className="flex w-full bg-[#F8F8F9] justify-between items-center ">
          <h4 className="   py-3 text-[25px] rounded-t-lg px-4">View Books</h4>
          <div className=" me-2">
            <Dialog >
              <DialogTrigger >
                <Button className="bg-transparent border-none hover:bg-inherit" variant="outline"> <MdOutlineDeleteForever className='text-[30px]  cursor-pointer' /></Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[1200px] overflow-x-auto">
                <DialogHeader>
                  <DialogTitle className="bg-red-100 text-[#EB5757] w-[130px] rounded-[0px_10px_10px_0px] absolute top-2 left-0 text-center py-1 dark:bg-gray-700 dark:text-red-400 border border-red-400 ">Deleted Items</DialogTitle>
                  <DialogDescription>
                    {
                      (deletedBook.length === 0) ? "Data Not Found" :
                        <table class="w-full  ">
                          <thead className='bg-[#0297B2]  overflow-x-auto book w-full text-nowrap text-white'>
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
                                Name
                              </th>
                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Parent Cat..
                              </th>

                              <th
                                class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                              >
                                Book Cat..
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Book Author
                              </th>


                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Front Image
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Back Image
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Book Pdf
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Book Price
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Book Short Descrption
                              </th>

                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Book  Descrption
                              </th>
                              <th
                                class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                              >
                                Action
                              </th>
                            </tr>

                          </thead>
                          <tbody className='my-2 text-nowrap'>
                            {
                              deletedBook.map((deleteBook, index) => (
                                <tr className=" border-b-[1px] ">


                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{index + 1}</p>
                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    {deleteBook.name}
                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{deleteBook.parent_categories.name}</p>

                                  </td>


                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{deleteBook.book_category.name}</p>

                                  </td>
                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{deleteBook.authors.name}</p>

                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <img src={filePath + deleteBook.frontimg} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <img src={filePath + deleteBook.backimg} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <a href={pdfPath + deleteBook.pdf}><FaRegFilePdf className='text-[30px]' /></a>
                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>₹ {deleteBook.price}</p>

                                  </td>

                                  <td class="px-5   bg-white text-center  text-md ">
                                    <p>{deleteBook.short_description}</p>

                                  </td>

                                  <td class="px-5    bg-white text-md ">
                                    <span
                                      className={`relative cursor-pointer inline-block px-3 py-1  ${isOpen === index ? "h-[50px] w-[330px] overflow-y-auto overflow-x-hidden" : " h-[28px] w-[100px] "} text-green-900 leading-tight`}
                                      style={isOpen === index ? null : paragraphStyles}>
                                      {deleteBook.description}
                                    </span>

                                    {/* <button>Read More ...</button> */}
                                  </td>

                                  <td class="px-5 flex items-center justify-center   bg-white font-semibold ">
                                    <span onClick={() => handlePermanentDeleteBook(deleteBook._id)} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                                    <span onClick={() => handleRestoreBook(deleteBook._id)} class="bg-[#eae7d3] text-[#988349]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300">   <MdOutlineSettingsBackupRestore className='text-[18px]' /> </span>
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
                    Name
                  </th>
                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Parent Cat..
                  </th>

                  <th
                    class="px-5 py-3 text-center   text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Cat..
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Author
                  </th>


                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Front Image
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Back Image
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Pdf
                  </th>


                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Audio
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Price
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book Short Descrption
                  </th>

                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Book  Descrption
                  </th>



                  <th
                    class="px-5 py-3  text-center text-xs font-bold  uppercase tracking-wider"
                  >
                    Action
                  </th>

                  <th
                    class="px-5 py-3  "
                  >
                    Book Type
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
                  books.map((items, index) => (
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


                      <td class="px-5   bg-white text-center  text-md ">
                        <p>{index + 1}</p>
                      </td>

                      <td class="px-5   bg-white text-center  text-md ">
                        {items.name}
                      </td>

                      <td class="px-5   bg-white text-center  text-md ">
                        <p>{items.parent_categories.name}</p>

                      </td>


                      <td class="px-5   bg-white text-center  text-md ">
                        <p>{items.book_category.name}</p>

                      </td>
                      
                      <td class="px-5   bg-white text-center  text-md ">
                        <p>{items.authors.name}</p>

                      </td>

                      <td class="px-5    bg-white text-md ">
                        <img src={items.frontimg} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                      </td>

                      <td class="px-5    bg-white text-md ">
                        <img src={items.backimg} alt="" className='w-[50px] h-[70px] rounded-md mx-auto' />
                      </td>

                      <td class="px-5    bg-white text-md ">
                        <a href={items.pdf}><FaRegFilePdf className='text-[30px]' /></a>
                      </td>

                      <td class="px-5    bg-white text-md ">
                        {/* <ReactAudioPlayer
                        src="my_audio_file.ogg"
                        autoPlay
                        controls
                      /> */}


                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">Play</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{items.name}</DialogTitle>
                              <DialogDescription>
                                {items.parent_categories.name}

                                <div class="flex items-center space-x-4 shadow-2xl rounded-lg">
                                  <img src={filePath + items.frontimg} loading="lazy" decoding="async" alt="" class="flex-none rounded-lg bg-slate-100" width="88" height="88" />
                                  <div class="min-w-0 flex-auto space-y-1 font-semibold">
                                    <p class="text-cyan-500 transition-all duration-500 dark:text-cyan-400 text-sm leading-6">
                                      <abbr title="Episode">Book</abbr> {index + 1}
                                    </p>
                                    <h2 class="text-slate-500 transition-all duration-500 dark:text-slate-400 text-sm leading-6 truncate">
                                      {items.authors.name}
                                    </h2>
                                    <p class="text-slate-900 transition-all duration-500 dark:text-slate-50 text-lg">
                                      Full Stack Radio
                                    </p>
                                  </div>
                                </div>
                                <marquee behavior="scroll" direction="up" scrollamount="2" class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                                  {items.description}
                                </marquee>

                                <Audioplayer audioSrc={items.audio} />


                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">


                            </div>

                          </DialogContent>
                        </Dialog>

                      </td>

                      <td class="px-5   bg-white text-center  text-md ">
                        <p>₹ {items.price}</p>

                      </td>

                      <td class="px-5   bg-white text-center  text-md ">

                        <marquee behavior="scroll" direction="up" scrollamount="3" class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                          {items.short_description}
                        </marquee>

                      </td>

                      <td class="px-5    bg-white text-md ">
                        {/* <span
                          className={`relative cursor-pointer inline-block px-3 py-1  ${isOpen === index ? "h-[50px] w-[330px] overflow-y-auto overflow-x-hidden" : " h-[28px] w-[100px] "} text-green-900 leading-tight`}
                          style={isOpen === index ? null : paragraphStyles}>
                          {items.description}
                        </span> */}
                        <marquee behavior="scroll" direction="up" scrollamount="3" class="text-slate-900 overflow-hidden h-[40px] p-4 transition-all duration-500 dark:text-slate-50 text-lg">
                          {items.description}
                        </marquee>

                        {/* <button>Read More ...</button> */}
                      </td>

                      <td class="px-5   bg-white font-semibold ">
                        <div className="flex items-center justify-center ">
                          <span onClick={() => handleDeleteBook(items._id)} class="bg-[#FBDDDD] text-[#EB5757] p-1  font-medium me-2 px-1 cursor-pointer  rounded dark:bg-red-900 dark:text-red-300"><MdOutlineDeleteSweep className='text-[19px]' /></span>

                          <span class="bg-[#D3EADD] text-[#499853]  font-medium me-2 p-1 cursor-pointer   rounded dark:bg-yellow-900 dark:text-yellow-300"> <Link to={`/dashboard/book/update-book/${items._id}`}> <MdEdit className='text-[18px]' /></Link> </span>
                        </div>
                      </td>

                      <td className='text-center'>
                        <button
                          onClick={handleupdateBookType}
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

export default ViewBook
