import React from 'react'
import { IconType } from 'react-icons'

type SidebarMenuItemProps = {
    text: string;
    Icon: IconType;
    active?: boolean;
}

export default function SidebarMenuItem({ text, Icon, active }: SidebarMenuItemProps) {
    return (
        <div className='hoverEffect flex items-center justify-center xl:justify-start text-2xl space-x-3 '>
            <Icon className='mr-3' />
            <span className={`${active && "font-semibold"} hidden xl:inline`}>{text}</span>
        </div>
    )
}
