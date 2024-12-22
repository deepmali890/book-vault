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
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye } from 'react-icons/fa'

const AddBookCategory = () => {

  const [caregory, setCategory] = useState([])
  const nav= useNavigate()

  const fatchParentCategory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/active-category`)
      .then(response => {
        console.log("deepsa", response.data);
        setCategory(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });


  }
  useEffect(() => { fatchParentCategory() }, [])

  const handleAddBookCategory = (e) => {
    e.preventDefault()

    axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book-category/create-book-category`, e.target)
      .then((response) => {
        console.log(response.data)
        let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 800,
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
         nav('/dashboard/category/view-book-category')
        });
      })
      .catch((error) => {
        console.error(error)
      })

  }
  return (
    <>
      <div className="w-[90%] mx-auto my-[40px] bg-white border rounded-[10px] overflow-y-auto">
        <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        <div className=" flex justify-between">
          Add Book Category
          <Link to={'/dashboard/category/view-book-category'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaEye /></div> </Link>
          </div>
        </span>
        <div className="w-[90%] mx-auto my-[20px]" >
          <form method="post" onSubmit={handleAddBookCategory}  >
            <div className="w-full my-[10px]" >
              <label htmlFor="categoryName" className="block text-[#303640]">
                Book Category :
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                placeholder="Book Category Name"
                className="input border p-1 w-full rounded-[5px] my-[10px]  outline-[#23acc4]"

              />
            </div>



            <div className="w-full my-[10px]">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Book Category slug :
              </label>
              <input
                type="text"
                name="slug"
                id="email"
                placeholder="Book Category slug"
                className="input border p-1 w-full rounded-[5px] my-[10px] outline-[#23acc4]"
              />
            </div>



            <div className="grid w-full  items-center gap-1.5">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Book category Image :
              </label>
              <Input name="thumbnail" id="picture" type="file" />
            </div>

            <div className=" my-4">
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
                      caregory.map((category, index) => (
                        <SelectItem value={category._id} >{category.name}</SelectItem>
                      ))
                    }


                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full my-[10px]">
              <label htmlFor="categoryDesc" className="block text-[#303640]">
                Book category Description :
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
              <span type='button'
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
    </>
  )
}

export default AddBookCategory
