import React from 'react'
import {SidebarMenuItemProps} from "./types"

export default function SidebarMenuItem({ text, Icon, active }: SidebarMenuItemProps) {
    return (
        <div className='hoverEffect flex items-center justify-center xl:justify-start space-x-3'>
            <Icon className='mr-3 text-[28px]' />
            <span className={`${active && "font-semibold"} hidden xl:inline text-[22px]`}>{text}</span>
        </div>
    )
}
