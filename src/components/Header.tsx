"use client"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"

export default function Header({ children }: { children: ReactNode }) {
    const pathName = usePathname().substring(1)
    const formattedName = `${pathName.charAt(0).toUpperCase()}${pathName.slice(1)}`
    return (
        <div className='sm:mr-auto xl:ml-[330px] border-l border-gray-600 border-r xl:min-w-[630px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-600 bg-opacity-70 backdrop-blur'>
                <h2 className='text-lg sm:text-xl kont-bold cursor-pointer flex items-center justify-center'>{formattedName}</h2>
            </div>
            {children}
        </div>
    )
}
