import Image from "next/image"
import SidebarMenuItem from "./SidebarMenuItem"
import { AiFillHome, AiFillBell } from "react-icons/ai"
import { FaHashtag, FaUserAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BsFillBookmarkFill } from "react-icons/bs"
import { RiFileListFill } from "react-icons/ri"
import { HiDotsCircleHorizontal, HiDotsHorizontal } from "react-icons/hi"

export default function Sidebar() {
    return (
        <div>
            <div className="">
                <Image
                    src="https://logos-download.com/wp-content/uploads/2016/02/Twitter_Logo_new.png"
                    alt="Twitter's logo"
                    width={50}
                    height={50}
                />
            </div>

            <div>
                <SidebarMenuItem text="Home" Icon={AiFillHome} />
                <SidebarMenuItem text="Explore" Icon={FaHashtag} />
                <SidebarMenuItem text="Notifications" Icon={AiFillBell} />
                <SidebarMenuItem text="Messages" Icon={GrMail} />
                <SidebarMenuItem text="Lists" Icon={RiFileListFill} />
                <SidebarMenuItem text="Bookmarks" Icon={BsFillBookmarkFill} />
                <SidebarMenuItem text="Profile" Icon={FaUserAlt} />
                <SidebarMenuItem text="More" Icon={HiDotsCircleHorizontal} />
            </div>

            <button>Tweet</button>

            <div>
                <img src="https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2" alt="user image" />
                <div>
                    <h4>Grellheist</h4>
                    <p>@grellheist</p>
                </div>
                <HiDotsHorizontal />
            </div>
        </div>
    )
}
