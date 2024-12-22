import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdatePcCategory = () => {

  const { _id } = useParams();
  const nav = useNavigate()

  const [category, setCategory] = useState({})

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/read-category/${_id}`)
      .then(response => {
        console.log(response.data);
        setCategory(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });

  }, [_id])

  const handleUpdateCategory = () => {


    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/update-category/${_id}`, {
      name: category.name,
      description: category.description
    })
      .then(response => {
        console.log(response.data);
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
          nav('/dashboard/category/view-parent-category')
        });

      })
      .catch(error => {
        console.error(error);
      });
  }


  return (
    <>
      <div className="w-[90%] mt-[40px] h-screen mx-auto my-[10px] bg-white border rounded-[10px]">
        <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
          Update Parent Category
        </span>
        <div className="w-[90%] mx-auto my-[20px]">
          <form method="post" >
            <div className="w-full my-[10px]">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Update  Parent Category Name :
              </label>
              <input
                type="text"
                name="name"
                id="categoryName"
                placeholder="Update Name"
                className="input border p-1 w-full rounded-[5px] my-[10px]"
                value={category.name}
                onChange={(e) => { setCategory({ ...category, name: e.target.value }) }}
              />
            </div>

            <div className="w-full my-[10px]">
              <label htmlFor="categoryDesc" className="block text-[#303640]">
                Update  Category Description :
              </label>
              <textarea
                type="file"
                name="description"
                id="categoryDesc"
                className="input border w-full rounded-[5px] my-[10px]"
                value={category.description}
                onChange={(e) => { setCategory({ ...category, description: e.target.value }) }}
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
             <Link to={'/dashboard/category/view-parent-category'}> <div className="bg-[#EB5757] rounded-lg text-white px-3 py-1">
                Reset
              </div>
              </Link>
              
              <button
                type='button'
                onClick={handleUpdateCategory}
                className="bg-[#0297B2] rounded-lg text-white px-3 py-1 ">
                save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UpdatePcCategory
