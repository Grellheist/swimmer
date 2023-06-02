"use client"
import { useUser } from "@clerk/nextjs"
import { SidebarMenuItemProps } from "./types"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function SidebarMenuItem({ text, Icon }: SidebarMenuItemProps) {
    const { user } = useUser()
    return (
        // @ts-ignore
        <Link href={`${text.toLowerCase() === 'profile'}` ? `/profile/${user.id}` : `${text.toLowerCase()}`} className='hoverEffect flex items-center justify-center xl:justify-start space-x-3' >
            <Icon className='mr-3 text-[28px]' />
            <span className={`${usePathname() === `/${text.toLowerCase()}` ? "font-semibold" : ""} hidden xl:inline text-[22px]`}>{text}</span>
        </Link >
    )
}
