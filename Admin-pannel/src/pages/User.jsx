// import { input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import React from 'react'
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'single', label: 'Single' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const User = () => {
   const [selectedOption, setSelectedOption] = useState(null);
  return (
    <>
      <div className="w-full pb-10 px-10  pt-10 bg-gray-100">
        <div className="w-full border-2  bg-white rounded-t-xl  py-4">
          <div className="border-b-[1px] border-gray-500 py-4 px-2">
            <h4>Personal Information</h4>
          </div>
        
          <div className="p-4">
            <img src="https://w0.peakpx.com/wallpaper/107/46/HD-wallpaper-best-pose-for-profile-for-men-profile-pose-men-best-glasses-thumbnail.jpg" className='w-[150px] h-[150px] rounded-full' alt="" />
          </div>
         
          <form action="" className=''>
          <div className="grid grid-cols-2 gap-3 w-full px-4">
            <div className=" grid  w-full items-center gap-1.5">
              <Label htmlFor="email">First Name :</Label>
              <input type="text" id="email" placeholder="FirstName" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>

            <div className="grid   w-full items-center gap-1.5">
              <Label htmlFor="name">Last Name :</Label>
              <input type="text" id="email" placeholder="LastName" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>

            <div className=" grid   w-full items-center gap-1.5">
              <Label htmlFor="name">User Name :</Label>
              <input type="text" id="email" placeholder="UserName" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
            </div>


            <div className=" grid   w-full items-center gap-1.5">
              <Label htmlFor="name">City :</Label>
              <input type="text" id="email" placeholder="City" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
            </div>
            <div className="w-full my-[10px]">
              <label
                htmlFor="categoryStatus"
                className=" text-[#303640] mr-[20px]"
              >
                Gender
              </label>
              <input
                type="radio"
                name="status"
                id="categoryStatus"
                value={true}
                className="input my-[10px] mx-[10px]  cursor-pointer"

              />
              <span>Male</span>
              <input
                type="radio"
                name="status"
                id="categoryStatus"
                value={false}
                className="input my-[10px] mx-[10px]  cursor-pointer"
              />
              <span>Female</span>
            </div>

            <div className=" grid   w-full items-center gap-1.5">
              <Label htmlFor="name">Date Of Birth :</Label>
              <input type="date" id="date" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
            </div>

            <div>
              <label htmlFor="size" className="block text-[#303640] mb-3">
              Marital Status :
              </label>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

            </div>

            <div>
              <label htmlFor="size" className="block text-[#303640] mb-3">
              Age :
              </label>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

            </div>

            <div>
              <label htmlFor="size" className="block text-[#303640] mb-3">
              Country :
              </label>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

            </div>

            <div>
              <label htmlFor="size" className="block text-[#303640] mb-3">
              State :
              </label>

              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
              />

            </div>

            
          </div>
          <div className="    w-full items-center gap-1.5 px-4">
              <Label htmlFor="name">Address :</Label>
              <textarea type="text" id="date" className='w-full outline-none  border-[1px] border-gray-300 p-1' />
            </div>

            <div className="flex gap-3 items-center px-4 py-4">

            <button type='submit'
              className="px-6 py-2 leading-none text-white  focus:outline-none focus:shadow-outline bg-gradient-to-b  bg-[#23acc4]">
              Save
            </button>
            <button type='button' class="bg-red-100 text-red-800 px-6 py-2 text-xs font-medium   rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Cancel</button>
          

          </div>
            </form>
         
        </div>

      </div>
    </>
  )
}

export default User
