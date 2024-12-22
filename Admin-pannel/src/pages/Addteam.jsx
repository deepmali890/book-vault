import { Label } from '@/components/ui/label'
import React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import axios from 'axios'

const Addteam = () => {

  const handleCreateTeam = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_APP_API_HOST}/api/admin-panel/team/create-team`, e.target)
      .then((response) => {
        console.log(response.data)
        e.target.reset()
      })
      .catch((error) => {
        console.error(error)
      });
  }
  return (
    <>
      <div className="w-full pb-10 px-10  pt-10 bg-gray-100">
        <div className="w-full border-2  bg-white rounded-t-xl  py-4">
          <div className="border-b-[1px] border-gray-500 py-4 px-2">
            <h4> Add Team Member</h4>
          </div>



          <form action="" className='' onSubmit={handleCreateTeam}>
            <div className="grid grid-cols-2 gap-3 w-full px-6 my-10">
              <div className=" grid  w-full items-center gap-1.5">
                <Label htmlFor="email"> Name :</Label>
                <input name='name' type="text" id="email" placeholder="Name" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>

              <div className="grid   w-full items-center gap-1.5">
                <Label htmlFor="role">Role :</Label>
                <input name='role' type="text" id="text" placeholder="Role" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label htmlFor="email">email :</Label>
                <input name='email' type="email" id="email" placeholder="email" className='w-full outline-none py-2 border-[1px] border-gray-300 ps-2' />
              </div>


              <div className=" grid   w-full items-center gap-1.5">
                <Label >Phone :</Label>
                <input name='phone' type="tel" id="Phone" placeholder="Phone" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>


              <div className="grid w-full my-4  items-center gap-1.5">
                <label htmlFor="categoryName" className="block text-[#303640]">
                  Profile   :
                </label>
                <Input id="picture" type="file" name="profile" classname="w-full outline-none py-2 border-[1px] border-gray-300 p-1" />
              </div>

              <div className=" grid   w-full items-center gap-1.5 ">
                <label htmlFor="categoryDesc" className="block text-[#303640]">
                  Bio  :
                </label>

                <textarea
                  type="file"
                  name="bio"
                  id="categoryDesc"
                  className="input  w-full rounded-[5px] my-[10px] border-[1px] border-gray-300 outline-none"


                />
              </div>
              <div className=" grid   w-full items-center gap-1.5">
                <Label >Skill :</Label>
                <input name='skills' type="text" id="Phone" placeholder="Skill" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Experience :</Label>
                <input name='experience' type="text" id="Phone" placeholder="Experience" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
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

              <div className=" grid   w-full items-center gap-1.5">
                <Label htmlFor="name">Join Date:</Label>
                <input name='joiningDate' type="date" id="date" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label htmlFor="name">Leaving Date:</Label>
                <input name='leavingDate' type="date" id="date" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div className=" grid   w-full items-center gap-1.5">
                <Label >Loaction :</Label>
                <input name='location' type="text" id="Instagram" placeholder="Loaction" className='w-full outline-none py-2 border-[1px] border-gray-300 p-1' />
              </div>

              <div>
                <label htmlFor="size" className="block text-[#303640] mb-3">
                  Department  :
                </label>

                <Select name="department">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Your Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>

                      <SelectItem value="development" >Development</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                      <SelectItem value="Data & Analytics">Data & Analytics:</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="IT & Infrastructure">IT & Infrastructure:</SelectItem>
                      <SelectItem value="Others">Others</SelectItem>



                    </SelectGroup>
                  </SelectContent>
                </Select>

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

export default Addteam
