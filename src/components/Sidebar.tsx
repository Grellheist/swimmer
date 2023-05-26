"use client"
import SidebarMenuItem from "./SidebarMenuItem"
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaHashtag, FaUserAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BsFillBookmarkFill } from "react-icons/bs"
import { RiFileListFill } from "react-icons/ri"
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi"
import { IoLogoOctocat } from "react-icons/io"
import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react"

export default function Sidebar() {
    return (
        <div className="select-none hidden sm:flex flex-col p-2 sm:ml-3 xl:items-start fixed h-full" >
            <Link href="/home" className="hoverEffect xl:mt-0.5">
                <IoLogoOctocat className="w-7 h-8" />
            </Link>

            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={AiFillHome} />
                <SidebarMenuItem text="Explore" Icon={FaHashtag} />
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="bg-blue-500 rounded-full w-64 h-14 mt-6 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Login</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <SidebarMenuItem text="Notifications" Icon={AiFillBell} />
                    <SidebarMenuItem text="Messages" Icon={GrMail} />
                    <div className="hidden 2xl:block">
                        <SidebarMenuItem text="Lists" Icon={RiFileListFill} />
                    </div>
                    <div className="hidden 2xl:block">
                        <SidebarMenuItem text="Bookmarks" Icon={BsFillBookmarkFill} />
                    </div>
                    <SidebarMenuItem text="Profile" Icon={FaUserAlt} />
                    <SidebarMenuItem text="More" Icon={HiDotsCircleHorizontal} />
                </SignedIn>
            </div>

            <SignedIn>
                <button className="bg-blue-500 rounded-full w-64 h-14 mt-6 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Meow</button>
            </SignedIn>

            <div className="hoverEffect flex items-center justify-center xl:justify-start mt-auto">
                <Image
                    src="https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2"
                    alt="user image"
                    className="rounded-full xl:mr-2"
                    width="43"
                    height="43"
                />
                <div className="leading-5 hidden xl:inline">
                    <h4 className="font-bold">Grellheist</h4>
                    <p className="">@grellheist</p>
                </div>
                <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
            </div>
        </div>
    )
}
