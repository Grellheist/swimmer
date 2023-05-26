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
import {
    SignedIn,
    SignedOut,
    SignInButton,
    ClerkLoading,
    ClerkLoaded,
    useUser,
} from "@clerk/nextjs"
import Spinner from "../../public/spinner.svg"

export default function Sidebar() {
    const { user } = useUser();
    return (
        <div className="select-none hidden sm:flex flex-col p-2 sm:ml-3 xl:items-start fixed h-full" >
            <Link href="/home" className="hoverEffect xl:mt-0.5">
                <IoLogoOctocat className="w-7 h-8" />
            </Link>

            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={AiFillHome} />
                <SidebarMenuItem text="Explore" Icon={FaHashtag} />
                <ClerkLoading>
                    <SignedOut>
                        <div className="ml-24 mt-8 mx-auto">
                            <Image src={Spinner} height={45} width={45} alt="Loading..." />
                        </div>
                    </SignedOut>
                </ClerkLoading>
                <ClerkLoaded>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="bg-blue-500 rounded-full w-64 h-14 mt-6 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Sign In</button>
                        </SignInButton>
                    </SignedOut>
                </ClerkLoaded>
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

                <div className="hoverEffect flex items-center justify-center xl:justify-start mt-auto">
                    <ClerkLoading>
                        <SignedIn>
                            <div className="ml-10 mt-8 mx-auto">
                                <Image src={Spinner} height={35} width={35} alt="Loading..." />
                            </div>
                        </SignedIn>
                    </ClerkLoading>
                    <ClerkLoaded>
                        <SignedIn>
                            {user?.imageUrl ?
                                (
                                    <Image
                                        src={user?.imageUrl}
                                        alt="user image"
                                        className="rounded-full xl:mr-2 w-11 h-11"
                                        width="150"
                                        height="150"
                                    />
                                ) : (
                                    <Image
                                        src="https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg"
                                        alt="user image"
                                        className="rounded-full xl:mr-2 w-11 h-11"
                                        width="150"
                                        height="150"
                                    />
                                )
                            }
                            <div className="leading-5 hidden xl:inline">
                                <h4 className="font-bold">{user?.firstName}</h4>
                                <p className="text-md text-gray-500">@{user?.username}</p>
                            </div>
                            <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
                        </SignedIn>
                    </ClerkLoaded>
                </div>
            </SignedIn>
        </div>
    )
}
