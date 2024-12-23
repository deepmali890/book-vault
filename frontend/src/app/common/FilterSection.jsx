import React, { useEffect, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { TbPointFilled } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { featureBookCategory } from '../redux/slices/featureBookCategorySlice'

const FilterSection = () => {

    const [bookCats, setBookCats] = useState([])

    const dispatch = useDispatch()
    const booksCategory = useSelector((state) => state.featureBook.value)
    // console.log("niku", featureBook)


    useEffect(() => {
        dispatch(featureBookCategory())
    }, [dispatch])

    useEffect(() => {
        if (booksCategory.data) setBookCats(booksCategory.data);

    }, [booksCategory])

    // console.log("bookCates>>>>==>",bookCats)
    return (
        <>
            <section className=" relative">
                <div className="w-full  mx-auto px-4 ">

                    <svg className=" w-full" xmlns="http://www.w3.org/2000/svg" width="1216" height="2" viewBox="0 0 1216 2"
                        fill="none">
                        <path d="M0 1H1216" stroke="#E5E7EB" />
                    </svg>
                    <div className="">
                        <div className="col-span-12 md:col-span-3 w-full max-md:max-w-md max-md:mx-auto">

                            <div className="mt-7 box rounded-xl border border-gray-300 bg-white p-6 w-full md:max-w-sm">
                                <div className="flex items-center justify-between w-full pb-3 border-b border-gray-200 mb-7">
                                    <p className="font-medium text-base leading-7 text-black ">Filter Plans</p>
                                    <p
                                        className="font-medium text-xs text-gray-500 cursor-pointer transition-all duration-500 hover:text-indigo-600">
                                        RESET</p>
                                </div>


                                <div className="w-full mb-7">
                                    <div className='accordion-group grid grid-cols-1 gap-5 sm:gap-9'
                                        data-accordion="default-accordion">
                                        <div className='accordion '
                                            id='category-heading-one'>
                                            <button
                                                className='accordion-toggle group accordion-active:text-indigo-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 active:text-indigo-600'
                                                aria-controls='category-collapse-one'>
                                                <h5 className="font-medium text-sm text-gray-900">
                                                    Availability
                                                </h5>
                                                <TbPointFilled />

                                            </button>

                                        </div>
                                    </div>
                                </div>

                                <label htmlFor="Offer" className="font-medium text-sm leading-6 text-gray-600 mb-1">Offer</label>
                                <div className="flex flex-col gap-2  w-full mb-7">
                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">1% - 10% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">10% - 20% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">20% - 30% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">30% - 40% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">40% - 50% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">50% - 60% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">60% - 70% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">70% - 80% Off</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">80% - 90% Off</label>
                                    </div>

                                    
                                    <div className="flex items-center">
                                        <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                        <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">90% - 100% Off</label>
                                    </div>

                                </div>
                                <p className="font-medium text-sm leading-6 text-black mb-3">Book Category</p>
                                <div className="box flex flex-col gap-2 overflow-y-auto">
                                    {
                                        bookCats.map((item, index) => (
                                            <div className="flex items-center" key={index}>
                                                <input id="checkbox-default-1" type="checkbox" value="" className="w-5 h-5 appearance-none border border-gray-300 cursor-pointer  rounded-md mr-2 hover:border-gray-500 hover:bg-indigo-100 checked:bg-no-repeat checked:bg-center checked:border-gray-500 checked:bg-indigo-100 checked:bg-[url('https://pagedone.io/asset/uploads/1689406942.svg')]" />
                                                <label htmlFor="checkbox-default-1" className="text-xs font-normal text-gray-600 leading-4 cursor-pointer">{item.name}</label>
                                            </div>

                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-9"></div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default FilterSection
