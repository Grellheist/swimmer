"use client"
import React from 'react'
import { CommentProps } from './types'
import Image from 'next/image'
import formatDate from '@/utils/formatDate'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import { toast } from 'react-hot-toast'
import { BsFillBarChartFill, BsFillChatDotsFill, BsFillTrashFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { FaRetweet } from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { useRouter } from "next/navigation"

export default function Comment({ comment }: CommentProps) {
    const hasPostImage = comment.imgUrl !== "";
    const dateOfPost = formatDate(comment.createdAt)
    const { user } = useUser()
    const router = useRouter()

    const handleNotImplemented = () => {
        toast.error("Function not implemented.")
    }

    const handleDelete = async () => {
        const toastId = toast.loading("Deleting...")
        if (user && user.id === comment.userId) {
            await axios.delete(`/api/deleteComment/${comment.postId}/${comment.id}`)
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

    const handleUserImageClick = () => {
        router.push(`/profile/${comment.authorId}`)
    }
    
    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-600 hover:bg-slate-950 hover:transition">
            {comment.userImg && (
                <Image
                    src={comment.userImg}
                    alt="User image"
                    className="rounded-full h-12 w-12 mr-4 hover:brightness-95"
                    width="45"
                    height="45"
                    onClick={handleUserImageClick}
                />
            )}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between">
                    <div className="flex space-x-1 whitespace-nowrap overflow-hidden" onClick={handleUserImageClick}>
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline truncate line-clamp-none max-w-[150px] md:max-w-[250px]">
                            {comment.name}
                        </h4>
                        <span className="text-sm sm:text-[15px] text-gray-500 truncate line-clamp-none max-w-[60px] md:max-w-[150px]">
                            @{comment.username} ·{" "}
                        </span>
                        <span className="text-sm sm:text-[15px] hover:underline text-gray-500">
                            {dateOfPost}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <HiOutlineDotsHorizontal onClick={handleNotImplemented} className="h-8 hoverEffect w-8 p-2 mt-0 text-gray-500 hover:text-sky-500 hover:bg-sky-950" />
                    </div>
                </div>

                <p
                    className={"text-[15px] mt-0 sm:text-[16px] mb-2 overflow-hidden"}
                    style={{ wordBreak: "break-word" }}
                >
                    {comment.content}
                </p>

                {hasPostImage && comment.imgUrl && (
                    <div className="relative w-full">
                        <div
                            className="pb-[100%] overflow-hidden rounded-2xl"
                            style={{ position: "relative" }}
                        >
                            <Image
                                src={comment.imgUrl}
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
                        {user?.id === comment.authorId &&
                            <BsFillTrashFill className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" onClick={handleDelete} />
                        }
            </div>
        </div >
    )
}
