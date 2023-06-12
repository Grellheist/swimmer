"use client"
import SidebarMenuItem from "./SidebarMenuItem"
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaHashtag, FaSignInAlt, FaUserAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BsFillBookmarkFill } from "react-icons/bs"
import { RiFileListFill } from "react-icons/ri"
import { RxCross2 } from "react-icons/rx"
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi"
import { IoLogoOctocat } from "react-icons/io"
import { MdBrokenImage } from "react-icons/md"
import Link from "next/link"
import Image from "next/image"
import {
    SignedIn,
    SignedOut,
    SignInButton,
    ClerkLoading,
    ClerkLoaded,
    useUser,
    SignOutButton
} from "@clerk/nextjs"
import Spinner from "../../public/spinner.svg"
import * as Popover from "@radix-ui/react-popover"

export default function Sidebar() {
    const { user } = useUser();

    return (
        <div className="select-none hidden sm:flex flex-col p-2 sm:ml-3 xl:items-start fixed h-full" >
            <Link href="/home" className="hoverEffect xl:mt-0.5">
                <IoLogoOctocat className="w-7 h-8" />
            </Link>

            <div className="mt-4 mb-2.5 xl:items-start">
                <SignedIn>
                    <SidebarMenuItem text="Home" Icon={AiFillHome} />
                </SignedIn>
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
                    <ClerkLoaded>
                        {user && user.username ? (
                            <Link href={`/profile/${user.username}`} className='hoverEffect flex items-center justify-center xl:justify-start space-x-3' >
                                <FaUserAlt className='mr-3 text-[28px]' />
                                <span className={'hidden xl:inline text-[22px]'}>Profile</span>
                            </Link >
                        ) : (
                            <div>you should not be seeing this</div>
                        )}
                    </ClerkLoaded>
                    <SidebarMenuItem text="More" Icon={HiDotsCircleHorizontal} />
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <FaSignInAlt className="hidden sm:block xl:hidden w-7 h-7 text-blue-500 cursor-pointer hover:brightness-95 fixed bottom-10" />
                    </SignInButton>
                </SignedOut>
            </div>

            <SignedIn>
                <button className="bg-blue-500 rounded-full w-64 h-14 mt-6 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Meow</button>

                <ClerkLoading>
                        <div className="ml-24 mt-auto mb-4 mx-auto">
                            <Image src={Spinner} height={35} width={35} alt="Loading..." />
                        </div>
                </ClerkLoading>
                <ClerkLoaded>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <button className="hoverEffect flex items-center justify-center xl:justify-start mt-auto">
                                    {user && user.imageUrl ? (
                                        <Image
                                            src={user.imageUrl}
                                            alt="user image"
                                            className="rounded-full xl:mr-2 w-11 h-11"
                                            width="150"
                                            height="150"
                                        />
                                    ) : (
                                        <MdBrokenImage className="h-7 w-7" />
                                    )}
                                    <div className="leading-5 hidden w-[160px] xl:inline overflow-hidden">
                                        {user && user.fullName ? (
                                            <h4 className="font-bold truncate line-clamp-none text-left">{user?.fullName}</h4>
                                        ) : (
                                            <h4 className="font-bold truncate line-clamp-none text-left">{user?.username}</h4>
                                        )}
                                        <p className="text-[15px] text-gray-500 text-left">@{user?.username}</p>
                                    </div>
                                    <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
                                </button>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content
                                    className="select-none rounded p-5 w-[260px] bg-black shadow-[0_10px_38px_-10px_rgba(255,255,255,.2),0_10px_20px_-15px_rgba(255,255,255,.2)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                                    sideOffset={5}
                                >
                                    <div className="flex flex-col gap-2.5">
                                        <p className="border-b border-gray-600 p-1 text-gray-200 text-[17px] leading-[19px] mb-2.5 mx-auto">Feeling tired?</p>
                                        <fieldset className="flex gap-5 items-center">
                                            <SignOutButton>
                                                <button className="text-[18px] font-bold text-sky-500 mx-auto hover:underline">
                                                    Sign Out
                                                </button>
                                            </SignOutButton>
                                        </fieldset>
                                    </div>
                                    <Popover.Close
                                        className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-black outline-none cursor-default"
                                        aria-label="Close"
                                    >
                                        <RxCross2 />
                                    </Popover.Close>
                                    <Popover.Arrow className="fill-black" />
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                </ClerkLoaded>
            </SignedIn>
        </div>
    )
}
