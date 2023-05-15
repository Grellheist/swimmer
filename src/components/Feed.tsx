import React from 'react'
import { HiSparkles } from 'react-icons/hi'

export default function Feed() {
    return (
        <div className='xl:ml-[370px] border-l border-white border-r xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg-black border-b border-white'>
                <h2 className='text-lg sm:text-xl font-bold cursor-pointer flex items-center justify-center'>Home</h2>
                <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                    <HiSparkles className='h-7'/>
                </div>
            </div>
        </div>
    )
}
