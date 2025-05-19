'use client'
import { fatchAuthor } from '@/app/redux/slices/authorSlice';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const page = () => {

    const dispatch = useDispatch();
    const [authorData, setAuthorData] = useState([])
    const [filepath, setFilePath] = useState('')
    const router = useRouter()

    const author = useSelector((state) => state.author.value)
    console.log(author)


    useEffect(() => {
        dispatch(fatchAuthor())
    }, [dispatch])

    useEffect(() => {
        if (author.data) setAuthorData(author.data);

        setFilePath(author.filepath)
    }, [author])
    // console.log(authorData)


    return (
        <>
            <section id="our-team" className="bg-gray-100 py-32">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-primary">Meet the Visionaries</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {
                            authorData.map((item, index) => (
                                <Link href={`/authorDetails/${item._id}`} key={index} >   <div className="bg-white rounded-lg shadow-md p-6 my-6 text-center cursor-pointer" >
                                    <img src={item.thumbnail} alt="Team Member 1" className="w-[100px] h-[100px] mx-auto rounded-full mb-4" />
                                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                                    <p className="text-gray-700">{item.email}</p>
                                </div>
                                </Link>
                            ))
                        }




                    </div>
                </div>

            </section>
        </>
    )
}

export default page
