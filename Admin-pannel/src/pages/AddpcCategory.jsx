import axios from 'axios';
import React, { useState } from 'react'
import { FaEye, FaPen } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const AddpcCategory = () => {
  const [inputValue, setInputValue] = useState("")
  const [inputValue2, setInputValue2] = useState("")
  const nav = useNavigate()
  
  const handleCreateCategory = (e) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/create-Parent-Category`, e.target)
      .then((response) => {
        console.log(response.data);
        let timerInterval;
        Swal.fire({
          title: "Category added",
          html: "You're are redirecting to view page <b></b> milliseconds.",
          timer: 700,
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
          nav('/dashboard/category/view-parent-category')
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Category already exists, if can't find check bin!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });

          return;
        }

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong, please try after some time!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      })
  }

  const handlereset=()=>{
    setInputValue("")
    setInputValue2("")
  }

  return (

    <>
      <div className="w-[90%] mt-[40px] h-screen mx-auto my-[10px] bg-white border rounded-[10px]">
        <span className="bg-[#f8f8f9]  justify-between rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
          <div className=" flex justify-between">
          Add Parent Category
          <Link to={'/dashboard/category/view-parent-category'}> <div className="w-[40px] h-[40px] bg-[#0297B2] text-white cursor-pointer rounded-full me-4 flex justify-center items-center"><FaEye /></div> </Link>
          </div>
        
        </span>
        <div className="w-[90%] mx-auto my-[20px]">
          <form method="post" onSubmit={handleCreateCategory} >
            <div className="w-full my-[10px]">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Parent Category Name :
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                placeholder="Category Name"
                className="input border p-1 w-full rounded-[5px] my-[10px] outline-none"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                
              />
            </div>

            <div className="w-full my-[10px]">
              <label htmlFor="categoryDesc" className="block text-[#303640]">
                Category Description :
              </label>
              <textarea
                type="file"
                name="description"
                id="categoryDesc"
                className="input border w-full rounded-[5px] my-[10px] outline-none"
                value={inputValue2}
                onChange={(e) => setInputValue2(e.target.value)}
               
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
                className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"

              />
              <span>Display</span>
              <input
                type="radio"
                name="status"
                id="categoryStatus"
                value={false}
                className="input my-[10px] mx-[10px] accent-[#5351c9] cursor-pointer"
              />
              <span>Hide</span>
            </div>
            <div className="flex gap-3 items-center">
              <span onClick={handlereset}
                className="px-6 py-2 leading-none cursor-pointer text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  outline-none bg-[#EB5757]">
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

export default AddpcCategory
