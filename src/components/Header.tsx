"use client"
import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import { IoLogoOctocat } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi"
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export default function Header({ children }: { children: ReactNode }) {
    const pathName = usePathname().substring(1)
    const formattedName = `${pathName.charAt(0).toUpperCase()}${pathName.slice(1)}`
    const [navbar, setNavbar] = useState(false);

    const handleClick = () => {
        setNavbar(!navbar)
    }

    return (
        <div className='sm:mr-auto xl:ml-[330px] border-l border-gray-600 border-r xl:min-w-[630px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-600 bg-opacity-70 backdrop-blur'>
                <Link href="/home">
                    <IoLogoOctocat className="ml-2 sm:hidden w-8 h-8 text-gray-200" />
                </Link>
                <h2 className='hidden sm:inline text-lg sm:text-xl kont-bold cursor-pointer items-center justify-center'>{formattedName}</h2>
                <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9 sm:hidden'>
                    <button
                        className="p-2 text-gray-200 rounded-md outline-none focus:border-gray-400 focus:border"
                        onClick={handleClick}
                    >
                        {navbar ? (
                            <AiOutlineClose className="h-5 w-5" />
                        ) : (
                            <GiHamburgerMenu className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>
            {children}
        </div>
    )
}
