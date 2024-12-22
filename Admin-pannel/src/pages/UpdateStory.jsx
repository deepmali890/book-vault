import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateStory = () => {
  const { _id } = useParams()
  const nav = useNavigate()

  const [story, setStory] = useState({})

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/read-story/${_id}`)
      .then((response) => {
        setStory(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [_id])

  const handleUpdateStory = (e) => {
    e.preventDefault();
    axios.put(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/story/update-story/${_id}`, {
      name: story.name,
      description: story.description,
    })
      .then((response) => {
        console.log(response.data)
        let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
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
          nav("/dashboard/story/view-story")
        });
      })
      .catch((error) => {
        console.log(error)
      })

  }
  return (
    <div className="w-[90%] mx-auto my-[10px] bg-white border rounded-[10px]">
      <span className="bg-[#f8f8f9] rounded-[10px_10px_0_0] border-b p-[8px_16px] text-[20px] font-bold block text-[#303640]">

        update Story

      </span>
      <div className="w-[90%] mx-auto my-[20px]">
        <form method="post" onSubmit={handleUpdateStory} >
          <div className="w-full my-[10px]">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update  Story Name :
            </label>
            <input
              type="text"
              name="name"
              id="categoryName"
              placeholder="Story Name"
              value={story.name}
              onChange={(e) => { setStory({ ...story, name: e.target.value }) }}
              className="input border p-1 w-full rounded-[5px] my-[10px]  outline-[#23acc4]"

            />
          </div>




          <div className="grid w-full  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Update Story Image :
            </label>
            <Input id="picture" type="file" name="thumbnail" />
          </div>

          <div className="grid w-full  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Story Banner :
            </label>
            <Input id="picture" type="file" name="banner" />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <label htmlFor="categoryName" className="block text-[#303640]">
              Story Video :
            </label>
            <Input id="picture" type="file" name="video" />
          </div>


          <div className="w-full my-[10px]">
            <label htmlFor="categoryDesc" className="block text-[#303640]">
              Story Description :
            </label>
            <textarea
              type="file"
              name="description"
              id="categoryDesc"
              value={story.description}
              onChange={(e) => { setStory({ ...story, description: e.target.value }) }}
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
            <Link to={'/dashboard/story/view-story'}> <button type='button'
              className="px-6 py-2 leading-none text-gray-200  rounded-full focus:outline-none focus:shadow-outline bg-gradient-to-b  outline-none bg-[#EB5757]">
              Return
            </button>
            </Link>
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

export default UpdateStory
