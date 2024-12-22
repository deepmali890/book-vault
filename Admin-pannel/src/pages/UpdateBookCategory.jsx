import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBookCategory = () => {

  const { _id } = useParams()
  const [category, setCategory] = useState({})
  const nav = useNavigate()
  const [cats, setcats] = useState([])
  const [selectedParentCategory, setSelectedParentCategory] = useState("");



  const fatchParentCategory = () => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/parent-category/active-category`)
      .then(response => {
        console.log("deepsa", response.data);
        setcats(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });


  }
  useEffect(() => { fatchParentCategory() }, [])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book-category/read-category/${_id}`)
      .then((response) => {
        console.log("deepsa", response.data)
        setCategory(response.data.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [_id])

  const handleupdateCategory = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/book-category/update-book-category/${_id}`,
      {
        name: category.name,
        description: category.description,
        slug: category.slug,
        parent_categories: selectedParentCategory || category.parent_categories, 
        // thumbnail: category.thumbnail
      }
    )
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
        console.error(error);
      });

  }
  return (
    <div className="w-[90%] mx-auto my-[40px] bg-white border rounded-[10px] overflow-y-auto">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">
        Update Book Category
      </span>
      <div className="w-[90%] mx-auto my-[20px]" >
        <form method="post" onSubmit={handleupdateCategory}  >
          <div className="w-full my-[10px]" >
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update Book Category :
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Book Category Name"
              className="input border p-1 w-full rounded-[5px] my-[10px]  outline-[#23acc4]"
              value={category.name}
              onChange={(e) => { setCategory({ ...category, name: e.target.value }) }}

            />
          </div>



          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update Book Category slug :
            </label>
            <input
              type="text"
              name="slug"
              id="email"
              placeholder="Book Category slug"
              className="input border p-1 w-full rounded-[5px] my-[10px] outline-[#23acc4]"
              value={category.slug}
              onChange={(e) => { setCategory({ ...category, slug: e.target.value }) }}
            />
          </div>



          <div className="grid w-full  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update Book category Image :
            </label>
            <Input name="thumbnail" id="picture" type="file" />
          </div>

          <div className=" my-4">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update Parent Category :
            </label>
            <Select
              name="parent_categories"
              onValueChange={(value) => setSelectedParentCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Parent Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* <SelectLabel>Fruits</SelectLabel> */}
                  {
                    cats.map((category, index) => (
                      <SelectItem value={category._id} >{category.name}</SelectItem>
                    ))
                  }


                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Update  Book category Description :
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              className="input border w-full rounded-[5px] my-[10px] outline-[#23acc4]"
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
          <Link to={'/dashboard/category/view-book-category'}> <span type='button'
              className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  outline-none bg-[#EB5757]">
              Return
            </span>
            </Link>
            <button type='submit'
              className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]">
              Update
            </button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookCategory
