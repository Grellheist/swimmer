import React from 'react'
import { IconType } from 'react-icons'

type SidebarMenuItemProps = {
    text: string;
    Icon: IconType;
    active: boolean;
}

export default function SidebarMenuItem({ text, Icon, active }: SidebarMenuItemProps) {
    return (
        <div className='hoverEffect flex items-center justify-center xl:justify-start text-lg space-x-3 '>
            <Icon className='h-7 w-5' />
            <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
        </div>
    )
}
