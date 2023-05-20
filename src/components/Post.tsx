import { AiFillHeart } from "react-icons/ai";
import { BsFillBarChartFill, BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

type PostType = {
    id: number;
    name: string,
    username: string,
    userImg: string,
    img: string,
    text: string,
    timestamp: string
}

type PostProps = {
    post: PostType
}

export default function Post({ post }: PostProps) {
    const hasPostImage = post.img !== "";
    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-600 hover:bg-slate-950 hover:transition">
            <img src={post.userImg} alt="User image" className="rounded-full h-11 w-11 mr-4 hover:brightness-95" />
            <div className="flex flex-col flex-grow">
                <div className="flex items-center justify-between">
                    <div className="flex space-x-1 items-center whitespace-nowrap">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
                        <span className="text-sm sm:text-[15px] text-gray-500">@{post.username} · </span>
                        <span className="text-sm sm:text-[15px] hover:underline text-gray-500">{post.timestamp}</span>
                    </div>
                    <HiOutlineDotsHorizontal className="h-10 hoverEffect w-10 p-2 hover:text-sky-500 hover:bg-sky-950" />
                </div>

                <p className="text-[15px] sm:text-[16px] mb-2">{post.text}</p>
                {hasPostImage && (
                    <div className="relative w-full">
                        <div
                            className="pb-[100%] overflow-hidden rounded-2xl"
                            style={{ position: "relative" }}
                        >
                            <img
                                src={post.img}
                                alt="post image"
                                className="absolute inset-0 object-cover w-full h-full"
                            />
                        </div>
                    </div>
                )}
                <div className="flex justify-between p-2">
                    <BsFillChatDotsFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500" />
                    <FaRetweet className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-950" />
                    <AiFillHeart className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" />
                    <BsFillBarChartFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 " />
                    <BsFillTrashFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 " />
                </div>
            </div>
        </div>
    );
}

