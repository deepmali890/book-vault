// import { input } from '@/components/ui/input'
import { Input } from '@/components/ui/input';
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

          <form action="" className=''>

          <div className="p-4 flex gap-3 items-center">
            <img src="https://w0.peakpx.com/wallpaper/107/46/HD-wallpaper-best-pose-for-profile-for-men-profile-pose-men-best-glasses-thumbnail.jpg" className='w-[150px] h-[150px] rounded-full' alt="" />

            <div className="grid w-full my-4  items-center gap-1.5">
              <label htmlFor="categoryName" className="block text-[#303640]">
                Profile   :
              </label>
              <Input id="picture" type="file" name="profile" classname="w-full outline-none py-2 border-[1px] border-gray-300 p-1" />
            </div>
          </div>

    
            <div className="grid grid-cols-2 gap-3 w-full px-6 my-10">
              <div className=" grid  w-full items-center gap-1.5">
                <Label htmlFor="email"> Name :</Label>
                <input name='name' type="text" id="email" placeholder="Name" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>




              <div className=" grid   w-full items-center gap-1.5">
                <Label >Phone :</Label>
                <input name='phone' type="tel" id="Phone" placeholder="Phone" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label htmlFor="email">email :</Label>
                <input name='email' type="email" id="email" placeholder="email" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>


              <div className="grid   w-full items-center gap-1.5">
                <Label htmlFor="role">Password :</Label>
                <input name='password' type="password" id="text" placeholder="password" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>

              <div className="grid w-full my-4  items-center gap-1.5">
                <label htmlFor="categoryName" className="block text-[#303640]">
                  Logo   :
                </label>
                <Input id="picture" type="file" name="logo" classname="w-full outline-none py-2 border-[1px] border-gray-300 p-1" />
              </div>

              <div className="grid w-full my-4  items-center gap-1.5">
                <label htmlFor="categoryName" className="block text-[#303640]">
                  Fav Icon   :
                </label>
                <Input id="picture" type="file" name="facicon" classname="w-full outline-none py-2 border-[1px] border-gray-300 p-1" />
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


         

           









              <div className=" grid   w-full items-center gap-1.5">
                <Label >Linkedin :</Label>
                <input name='linkedin' type="text" id="Phone" placeholder="Linkedin Url" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Github :</Label>
                <input name='github' type="text" id="Phone" placeholder="Github Url" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Twitter :</Label>
                <input name='twitter' type="text" id="Phone" placeholder="Twitter Url" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Facebook :</Label>
                <input name='facebook' type="text" id="Phone" placeholder="Facebook Url" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Instagram :</Label>
                <input name='instagram' type="text" id="Instagram" placeholder="Instagram Url" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

           






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
