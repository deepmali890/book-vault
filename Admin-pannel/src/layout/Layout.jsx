import Footer from '@/components/commen/Footer'
import Header from '@/components/commen/Header'
import Sidebar from '@/components/commen/Sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <div className='w-full  h-[100vh] grid grid-cols-[18%_82%]  '>
            <div className="left border-r-[#cccc] shadow-xl rounded-r-md z-50 bg-white   top-0 left-0 ">
                <div className="w-full h-screen left overflow-y-auto ">
                <Sidebar />
                </div>
            </div>
            <div className="Right h-[100vh]">
                <div className=" h-screen w-full overflow-y-auto">
                <Header />
                <Outlet />
                <Footer />
                </div>
            </div>
        </div>

        
    )
}

export default layout
