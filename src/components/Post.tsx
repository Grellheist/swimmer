"use client"
import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { BsFillBarChartFill, BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PostProps } from "./types"
import Image from "next/image";

export default function Post({ post }: PostProps) {
    const hasPostImage = post.img !== "";
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText((prevShowFullText) => !prevShowFullText);
    };

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-600 hover:bg-slate-950 hover:transition">
            <Image
                src={post.userImg}
                alt="User image"
                className="rounded-full h-12 w-12 mr-4 hover:brightness-95"
                width="45"
                height="45"
            />
            <div className="flex flex-col flex-grow">
                {/* Post header */}
                <div className="flex justify-between">
                    <div className="flex space-x-1 whitespace-nowrap">
                        {/* Name */}
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                            {post.name}
                        </h4>
                        {/* Username */}
                        <span className="text-sm sm:text-[15px] text-gray-500">
                            @{post.username} ·{" "}
                        </span>
                        {/* Timestamp */}
                        <span className="text-sm sm:text-[15px] hover:underline text-gray-500">
                            {post.timestamp}
                        </span>
                    </div>
                    {/* Icon */}
                    <div className="flex items-center">
                        <HiOutlineDotsHorizontal className="h-8 hoverEffect w-8 p-2 mt-0 text-gray-500 hover:text-sky-500 hover:bg-sky-950" />
                    </div>
                </div>

                {/* Post text */}
                <p
                    className={`text-[15px] mt-0 sm:text-[16px] mb-2 overflow-hidden ${showFullText ? "" : "line-clamp-2"
                        }`}
                >
                    {post.text}
                </p>

                {/* Show more button */}
                {!showFullText && post.text.length > 100 && (
                    <button
                        className="flex justify-end text-sm text-sky-500 hover:underline mb-1"
                        onClick={toggleText}
                    >
                        Show more
                    </button>
                )}

                {/* Post image */}
                {hasPostImage && (
                    <div className="relative w-full">
                        <div
                            className="pb-[100%] overflow-hidden rounded-2xl"
                            style={{ position: "relative" }}
                        >
                            <Image
                                src={post.img}
                                alt="post image"
                                className="absolute inset-0 object-cover w-full h-full"
                                width="800"
                                height="800"
                                priority={true}
                                quality={75}
                            />
                        </div>
                    </div>
                )}

                {/* Post icons */}
                <div className="flex justify-between pt-2">
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
