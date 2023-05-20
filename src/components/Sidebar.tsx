import SidebarMenuItem from "./SidebarMenuItem"
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaHashtag, FaUserAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BsFillBookmarkFill, BsTwitter } from "react-icons/bs"
import { RiFileListFill } from "react-icons/ri"
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi"

export default function Sidebar() {
    return (
        <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
            <div className="hoverEffect xl:mt-0.5">
                <BsTwitter className="w-7 h-8" />
            </div>

            <div className="mt-4 mb-2.5 xl:items-start">
                <SidebarMenuItem text="Home" Icon={AiFillHome} active />
                <SidebarMenuItem text="Explore" Icon={FaHashtag} active />
                <SidebarMenuItem text="Notifications" Icon={AiFillBell} active />
                <SidebarMenuItem text="Messages" Icon={GrMail} active />
                <SidebarMenuItem text="Lists" Icon={RiFileListFill} active />
                <SidebarMenuItem text="Bookmarks" Icon={BsFillBookmarkFill} active />
                <SidebarMenuItem text="Profile" Icon={FaUserAlt} active />
                <SidebarMenuItem text="More" Icon={HiDotsCircleHorizontal} active />
            </div>

            <button className="bg-blue-400 rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>

            <div className="hoverEffect flex items-center justify-center xl:justify-start mt-auto">
                <img
                    src="https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2"
                    alt="user image"
                    className="h-10 w-10 rounded-full xl:mr-2"
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
