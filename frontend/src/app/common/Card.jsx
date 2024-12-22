// import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { CiStar } from "react-icons/ci";
import { useRouter } from 'next/navigation';

const Card = ({ product, filePath }) => {
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);
  const route = useRouter()

  const handleProductDetails =()=>{
    route.push(`/book/book_dateils/${product._id}`)
  }

  return (



    <>

<div onClick={handleProductDetails} className="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div className="w-[180px] h-[300px] overflow-hidden mx-auto ">
            <img src={filePath + product.frontimg} alt="product1"
              className="h-full w-full rounded-lg " />
          </div>

          <div className="absolute cursor-default mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white w-11/12 p-3 rounded-lg transition-all duration-300">
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-800">{product.name}</h3>
              <h4 className="text-lg text-blue-600 font-bold mt-2">₹ {product.price}</h4>
            </div>

            <div className="flex justify-center space-x-1 mt-4">
            <FaStar className='text-[#facc15]' />
            <FaStar className='text-[#facc15]' />
            <FaStar className='text-[#facc15]' />
            <CiStar />
            <CiStar />

           
            
             
            </div>
            <div className="flex justify-center mt-4">
            <button className='py-1 px-2 text-white rounded  bg-gray-800'> Add To Cart </button>
            </div>
          </div>
        </div>

    </>
    // <div>
    //   <div className='cursor-pointer group'>
    //     <div className='w-full h-full'>
    //       <div className='group relative'>
    //         <span className='bg-black text-white absolute right-2 top-2 z-[9999] text-[8px] sm:text-[10px] font-medium uppercase px-0.5 sm:px-1 py-0.5'>20%</span>
    //         <img className='h-full w-full object-cover' src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/17.jpg" alt="Womens Denim" />
    //         {isClient && (
    //           <img className='h-full w-full duration-300 z-[999] absolute top-0 group-hover:block hidden object-cover' src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/46.jpg" alt="Womens Denim" />
    //         )}

    //         <button className='bg-white py-2 w-[95%] left-2 z-[9999] absolute bottom-2 font-semibold hidden cursor-pointer group-hover:inline showbtn'>Quick add
    //           <div className='w-[100%] left-0 absolute bottom-2 bg-white showsize'>
    //             <div className='flex-wrap text-[17px] gap-2 justify-center flex'>
    //               red
    //             </div>
    //           </div>
    //         </button>
    //       </div>

    //       <h5 className='sm:text-[14px] text-[12px] flex gap-3 mt-2 font-semibold'>Books
    //         <span className='rounded-full hover:bg-[#EBECEE] h-7 w-7 p-2 flex items-center justify-center'>
    //           <FaRegHeart />
    //         </span>
    //       </h5>
    //       <div className='sm:text-[14px] text-[13px] font-medium flex gap-2 mt-1 sm:mt-3'>
    //         <span className="line-through">₹ 100</span>
    //         <span className="text-red-500">₹ 200</span>
    //       </div>
    //       <span className='group-hover:hidden sm:text-[16px] text-[12px] block'> color</span>
    //       <div className='group-hover:block hidden mt-1'>
    //         <div className='sm:w-5 sm:h-5 h-3 w-3 rounded-full border border-black flex items-center justify-center'>
    //           hello
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Card;