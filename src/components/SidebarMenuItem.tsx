"use client"
import { SidebarMenuItemProps } from "./types"
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function SidebarMenuItem({ text }: SidebarMenuItemProps, { Icon }: SidebarMenuItemProps) {
    const currentPath = usePathname()
    const isProfileRoute = currentPath.includes('/profile')
    return (
        <Link href={`/${text.toLowerCase()}`} className={`hoverEffect flex items-center justify-center xl:justify-start space-x-3 ${isProfileRoute ? 'font-semibold' : ''}`}>
            <Icon className='mr-3 text-[28px]' />
            <span className="hidden xl:inline text-[22px]">{text}</span>
        </Link>
    )
}
