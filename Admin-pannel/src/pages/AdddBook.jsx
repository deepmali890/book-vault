import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AdddBook = () => {


  // for navigation to anthor page 


  const nav = useNavigate()

  const [parentCategory, setParentCategory] = useState([])
  const [bookCategory, setBookCategory] = useState([])
  const [author, setAuthor] = useState([])



  // add parentcategory


  const fatchParentCategory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/active-category`)
      .then(response => {
        // console.log("deepsa", response.data);
        setParentCategory(response.data.data);
      })
      .catch(error => {
        console.error(error);
      });


  }


  // add Book category 

  const fatchBookCategory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book-category/active-book-category`)
      .then(response => {
        // console.log("deepsa", response.data);
        setBookCategory(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });
  }


  // add author //

  const fatchAuthor = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/author/active-author`)
      .then(response => {
        console.log("deepsa", response.data);
        setAuthor(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });


  }
  useEffect(() => { fatchParentCategory(); fatchBookCategory(), fatchAuthor() }, [])


  //  handlea dd book // 
  
  const handleAddBook = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book/create-book`, e.target)
      .then((response )=> {
        console.log(response.data)
        let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {

          /* Read more about handling dismissals below */
          nav('/dashboard/book/view-book') 

        });
      })
      .catch(error => {
        console.error(error);
        console.log(error)
      });
  }


  return (
    <div className="w-[90%] mx-auto my-[40px] bg-white border rounded-[10px] overflow-y-auto">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        <div className=" flex justify-between">
          Add Book
          <Link to={'/dashboard/book/view-book'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaEye /></div> </Link>
        </div>
      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleAddBook} >
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book Name :
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Book Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]  outline-[#23acc4]"

            />
          </div>
          {/* 
          <div className=" my-5">
        <p>Parent Category</p>
        <select name="" id="" className=" w-full border-[1px] py-[6px] rounded-lg outline-none my-3 ps-2" >
        <option value="">Dilip</option>
        <option value="">Sunil</option>
        <option value="">Nirmal</option>
        </select>
        </div> */}
          <div className="">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Parent Category :
            </label>
            <Select name="parent_categories">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>


                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {
                    parentCategory.map((pCategory, index) => (
                      <SelectItem value={pCategory._id} >{pCategory.name}</SelectItem>
                    ))
                  }


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" my-4">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book Category :
            </label>
            <Select name="book_category">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>

                  
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {
                    bookCategory.map((BCategory, index) => (
                      <SelectItem value={BCategory._id} >{BCategory.name}</SelectItem>
                    ))
                  }


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" my-4">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book Author :
            </label>
            <Select name="authors">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {
                    author.map((author, index) => (
                      <SelectItem value={author._id} >{author.name}</SelectItem>
                    ))
                  }


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>


          <div className="grid w-full  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book  Front Image :
            </label>
            <Input id="picture" type="file" name="frontimg" />
          </div>

          <div className="grid w-full my-2  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book  Back Image :
            </label>
            <Input id="picture" type="file" name="backimg" />
          </div>

          <div className="grid w-full my-4  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book  Pdf :
            </label>
            <Input id="picture" type="file" name="pdf" />
          </div>

          <div className="grid w-full my-4  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Book  Audio :
            </label>
            <Input id="audio" type="file" name="audio" />
          </div>


          <div className="grid w-full my-4  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Multi Book  Audio :
            </label>
            <Input id="audio" type="file" name="multiAudio" multiple  />
          </div>

          <div className=" flex gap-6">

            <div className="mb-5 w-full">
              <p>Price</p>
              <input name='price' type="text" className=" w-full border-[1px] py-[6px] rounded-lg outline-none my-3 ps-2 " placeholder="Book Price" />
            </div>
            <div className="mb-5 w-full">
              <p>MRP</p>
              <input name='mrp' type="text" className=" w-full border-[1px] py-[6px] rounded-lg outline-none my-3 ps-2 " placeholder="Book MRP" />
            </div>
          </div>


          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Book Short Description :
            </label>
            <textarea
              type="file"
              name="short_description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px] outline-[#23acc4]"
            />
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Book  Description :
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px] outline-[#23acc4]"
            />
          </div>
          <div className="w-full my-[10px]">
            <label
              htmlFor="categoryStatus"
              className=" text-[#303640] mr-[20px]"
            >
              Status
            </label>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={true}
              className="input my-[10px] mx-[10px]  cursor-pointer"

            />
            <span>Display</span>
            <input
              type="radio"
              name="status"
              id="categoryStatus"
              value={false}
              className="input my-[10px] mx-[10px]  cursor-pointer"
            />
            <span>Hide</span>
          </div>
          <div className="flex gap-3 items-center">
            <span
              className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  outline-none bg-[#EB5757]">
              Reset
            </span>
            <button type='submit'
              className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]">
              Save
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AdddBook
