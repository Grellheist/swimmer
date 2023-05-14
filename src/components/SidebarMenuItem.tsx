import React from 'react'
import { IconType } from 'react-icons'

type SidebarMenuItemProps = {
        text: string;
        Icon: IconType;
    }

export default function SidebarMenuItem({ text, Icon }: SidebarMenuItemProps) {
    return (
        <div>
            <Icon/>
            <span>{text}</span>
        </div>
    )
}
