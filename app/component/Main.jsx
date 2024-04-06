
'use client'
import axios from 'axios'
import { useState, useEffect } from 'react';
import React from 'react'
import Link from 'next/link'

export default function Main() {
    const [Blog, setBlog] = useState([])
    const uniqueType = [...new Set(Blog.map(item => item.type))]
    const [selectedType, setSelectedType] = useState('');
    const [loading, isloading] = useState(true)

    useEffect(() => {

        const fetch_data = async () => {

            const response = await axios.get('/api/novels')
            const Datas = response.data.blogs
            setBlog(Datas)
            isloading(false)

        }
        try {

            fetch_data()

        } catch (err) {
            console.log(err)
        }

    }, [])

    return (
        <div>

            <nav className="bg-gray-800 py-4">
                <div className="container mx-auto flex-col justify-center items-center px-4">
                    <p className="text-white text-md font-bold text-center mb-1 md:text-sm">ข้อมูลนิทาน ตำนาน เรื่องเล่าพื้นบ้านในประเทศไทย</p>

                    <p className="text-white text-xs font-semibold text-center">(Api) จาก สำนักงานพัฒนารัฐบาลดิจิทัล (องค์การมหาชน) </p>


                </div>
            </nav>

            <div>
                <h2 className="flex flex-row flex-nowrap items-center mt-2">
                    <span className="flex-grow block border-t border-black" />
                    <span className="flex-none block mx-4 px-4 py-2.5 text-md rounded leading-none font-medium bg-black text-white">
                        หมวดหมู่ทั้งหมด
                    </span>
                    <span className="flex-grow block border-t border-black" />
                </h2>
            </div>


            {loading ? <div className="flex justify-center items-center h-screen">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>

                : <>
                    <div className="flex justify-center flex-wrap gap-2 p-2 max-w-full mx-auto my-4 text-sm">
                        {uniqueType.map((type, index) => (
                            <button key={index}
                                className="px-2 py-1 rounded bg-gray-200/50 text-gray-700 hover:bg-gray-300"
                                onClick={() => setSelectedType(type)}>
                                {type}
                            </button>
                        ))}

                    </div>

                    <div className="flex flex-wrap gap-4 p-6 justify-center text-lg font-serif">
                        {Blog.filter(blog => selectedType === '' || blog.type === selectedType).map((blog, id) => (
                            <Link key={id}
                                href={blog["source.uri"]} target='_blank'
                                className=" bg-gray-100 hover:bg-gray-200 flex-grow text-black border-l-8 border-green-500 rounded-md px-5 py-2 w-full  md:w-5/12 lg:w-3/12 hover:shadow-lg"
                            >
                                <p className='text-md'>นิทานเรื่อง : {blog.title}</p>
                                <div className="text-gray-500 font-thin text-sm pt-1">
                                    <span>หมวด :{blog.type}</span><br />
                                    <span className=' text-sm'>ผู้แต่ง : {blog.creator}</span>
                            
                                </div>
                            </Link>
                        ))}

                    </div>
                </>



            }



            <footer className="bg-gray-800 py-4">
                <p className="text-center text-white">Create by Ton Use Nextjs / Tailwind Copyright 2023</p>
            </footer>
        </div>
    )
}
