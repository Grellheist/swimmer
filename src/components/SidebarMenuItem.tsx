"use client"
import { SidebarMenuItemProps } from "./types"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SidebarMenuItem({ text }: SidebarMenuItemProps, { Icon }: SidebarMenuItemProps) {
    const router = useRouter()
    const isActive = router.asPath.startsWith('/profile') || router.asPath.match(text.toLowerCase())

    return (
        <Link href={`/${text.toLowerCase()}`} className='hoverEffect flex items-center justify-center xl:justify-start space-x-3' >
            <Icon className='mr-3 text-[28px]' />
            <span className={`${isActive ? "font-semibold" : ""} hidden xl:inline text-[22px]`}>{text}</span>
        </Link>
    )
}

