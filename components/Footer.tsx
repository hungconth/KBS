

import Image from "next/image"
import logo from '@/public/assets/img/Logo_PTIT_University.png'
export default function Footer() {



    return (
        <>
            <div>

                
<div className="shadow bg-cyan-600 my-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
                <Image src={logo} className=" h-8 w-10 mr-1" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PTIT</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Nguyễn Mạnh Hùng</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">Vũ Hoàng Anh</a>
                </li>
                <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">Nguyễn Thị Ước</a>
                </li>
                
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#" className="hover:underline">PTIT</a>.Hệ thống dựa trên tri thức.</span>
    </div>
</div>



            </div>
        </>
    )
}