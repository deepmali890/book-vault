import { Input } from '@/components/ui/input'
import axios from 'axios'
import React from 'react'
import { FaEye } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const AddAuthor = () => {

  const nav =useNavigate();


  const handleAddAuthor = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/author/create-author`, e.target)
      .then(response => {
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
          nav('/dashboard/view-author')
        });
      })
      .catch(error => {
        console.error(error)
      })
  }
  return (
    <>
      <div className="w-[90%] mx-auto my-[10px] bg-white border rounded-[10px]">
        <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        <div className=" flex justify-between">
          Add Author
          <Link to={'/dashboard/view-author'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaEye /></div> </Link>
          </div>
        </span>
        <div className="w-[90%] mx-auto my-[20px]">
          <form method="post" onSubmit={handleAddAuthor} >
            <div className="w-full my-[10px]">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Author Name :
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                placeholder="Author Name"
                className="input border p-1 w-full rounded-[5px] my-[10px]  outline-[#23acc4]"

              />
            </div>

            <div className="grid w-full  items-center gap-1.5">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Author Profile :
              </label>
              <Input id="picture" type="file" name="thumbnail" />
            </div>

            <div className="w-full my-[10px]">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Author Email :
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Author email"
                className="input border p-1 w-full rounded-[5px] my-[10px] outline-[#23acc4]"
              />
            </div>

            <div className="w-full my-[10px]">
              <label htmlFor="categoryDesc" className="block text-[#303640]">
                Author Description :
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
              <button type='button'
                className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  outline-none bg-[#EB5757]">
                Reset
              </button>
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

export default AddAuthor
