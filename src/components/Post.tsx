"use client"
import { useState } from "react";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { BsFillBarChartFill, BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { PostProps } from "./types"
import Image from "next/image";
import formatDate from "@/utils/formatDate"
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import axios from "axios"
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import Spinner from "../../public/spinner.svg"

export default function Post({ post }: PostProps) {
    const hasPostImage = post.imgUrl !== "";
    const { user } = useUser()
    const router = useRouter()
    const [showFullText, setShowFullText] = useState(false);
    const toggleText = () => {
        setShowFullText((prevShowFullText) => !prevShowFullText);
    };
    const dateOfPost = formatDate(post.createdAt)
    const currentRoute = usePathname()
    const postRoute = (currentRoute: string) => {
        if (currentRoute === '/explore') {
            return '/explore'
        } else {
            return `/post/${post.id}`
        }
    }

    const handleClickOnFakePosts = () => {
        toast.error("Sorry, you can't interact with mock posts. Log in to see the real posts.")
    }

    const handleNotImplemented = () => {
        toast.error("Function not implemented.")
    }

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting...")
        if (user && user.id === post.authorId) {
            await axios.delete(`/api/deletePost/${post.id}`)
                .then(() => {
                    router.refresh()
                })
                .finally(() => {
                    toast.dismiss(toastId)
                })
        } else {
            toast.error("You don't have permission to do that!")
        }
    }

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-600 hover:bg-slate-950 hover:transition">
            {post.userImg && (
                <Image
                    src={post.userImg}
                    alt="User image"
                    className="rounded-full h-12 w-12 mr-4 hover:brightness-95"
                    width="45"
                    height="45"
                />
            )}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between">
                    <div className="flex space-x-1 whitespace-nowrap overflow-hidden">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline truncate line-clamp-none max-w-[150px] md:max-w-[250px]">
                            {post.name}
                        </h4>
                        <span className="text-sm sm:text-[15px] text-gray-500 truncate line-clamp-none max-w-[60px] md:max-w-[150px]">
                            @{post.username} ·{" "}
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline text-gray-500">
                            {dateOfPost}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <HiOutlineDotsHorizontal onClick={handleNotImplemented} className="h-8 hoverEffect w-8 p-2 mt-0 text-gray-500 hover:text-sky-500 hover:bg-sky-950" />
                    </div>
                </div>

                <Link href={postRoute(currentRoute)} >
                    <p
                        className={`text-[15px] mt-0 sm:text-[16px] mb-2 overflow-hidden ${showFullText ? "" : "line-clamp-2"
                            }`}
                        style={{ wordBreak: "break-word" }}
                    >
                        {post.content}
                    </p>
                </Link >

                {!showFullText && post.content && post.content?.length > 100 && (
                    <button
                        className="flex justify-end text-sm text-sky-500 hover:underline mb-1"
                        onClick={toggleText}
                    >
                        Show more
                    </button>
                )}

                <Link href={postRoute(currentRoute)} >
                    {hasPostImage && post.imgUrl && (
                        <div className="relative w-full">
                            <div
                                className="pb-[100%] overflow-hidden rounded-2xl"
                                style={{ position: "relative" }}
                            >
                                <Image
                                    src={post.imgUrl}
                                    alt="post image"
                                    className="absolute inset-0 object-cover w-full h-full"
                                    width="500"
                                    height="500"
                                    priority={true}
                                    quality={75}
                                />
                            </div>
                        </div>
                    )}
                </Link>

                {usePathname() === '/explore' ? (
                    <div className="flex justify-between pt-2" onClick={handleClickOnFakePosts}>
                        <BsFillChatDotsFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500" />
                        <FaRetweet className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-950" />
                        <AiFillHeart className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" />
                        <BsFillBarChartFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500" />
                    </div>
                ) : (
                    <div className="flex justify-between pt-2">
                        <Dialog.Root>
                            <Dialog.Trigger>
                                <BsFillChatDotsFill className="h-9 w-9 hoverEffect p-2 hover:text-sky-500" />
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="bg-blue-300 opacity-20 z-50 fixed inset-0" />
                                <Dialog.Content>
                                    <div className="max-w-lg w-[90%] fixed top-24 left-[50%] z-50 translate-x-[-50%] bg-black h-[300px] rounded-xl shadow-md">
                                        <Dialog.Close>
                                            <div className="hoverEffect w-12 h-12 m-2 flex items-center justify-center">
                                                <AiOutlineClose className="h-[23px] w-[20px] p-0" />
                                            </div>
                                        </Dialog.Close>
                                        <div className="flex ml-4 relative">
                                            <span className="w-0.5 h-full z-[-1] absolute left-[22px] top-14 bg-gray-700" />
                                            {post.userImg && (
                                                <Image
                                                    src={post.userImg}
                                                    alt="User image"
                                                    className="rounded-full h-12 w-12 mr-4"
                                                    width="45"
                                                    height="45"
                                                />
                                            )}
                                            <div className="flex space-x-1 whitespace-nowrap overflow-hidden">
                                                <h4 className="font-bold text-[15px] sm:text-[16px] truncate line-clamp-none max-w-[150px] md:max-w-[250px]">
                                                    {post.name}
                                                </h4>
                                                <span className="text-sm sm:text-[15px] text-gray-500 truncate line-clamp-none max-w-[60px] md:max-w-[150px]">
                                                    @{post.username} ·{" "}
                                                </span>
                                                <span className="text-sm sm:text-[15px] hover:underline text-gray-500">
                                                    {dateOfPost}
                                                </span>
                                            </div>
                                            <p
                                                className={`text-[15px] mt-0 sm:text-[16px] mb-2 overflow-hidden ${showFullText ? "" : "line-clamp-2"
                                                    }`}
                                                style={{ wordBreak: "break-word" }}
                                            >
                                                {post.content}
                                            </p>
                                        </div>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                        <FaRetweet onClick={handleNotImplemented} className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-950" />
                        <AiFillHeart className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" />
                        <BsFillBarChartFill onClick={handleNotImplemented} className="h-9 w-9 hoverEffect p-2 hover:text-sky-500" />
                        {user?.id === post.authorId &&
                            <BsFillTrashFill className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" onClick={handleDelete} />
                        }
                    </div>
                )}
            </div>
        </div>
    );
}
