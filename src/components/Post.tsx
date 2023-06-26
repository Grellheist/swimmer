"use client"
import { PostProps } from "./types"
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios"
import { toast } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import * as Popover from "@radix-ui/react-popover";
import formatDate from "@/utils/formatDate"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { AiFillCloseCircle, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { BsEmojiSmile, BsFillBarChartFill, BsFillChatDotsFill, BsFillTrashFill } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { HiOutlineDotsHorizontal, HiOutlinePhotograph } from "react-icons/hi";

export default function Post({ post }: PostProps, isPostPage: Boolean) {
    const hasPostImage = post.imgUrl !== "";
    const { user } = useUser()
    const router = useRouter()
    const [textValue, setTextValue] = useState("");
    const [imgSrc, setImgSrc] = useState<string | null>("");
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const [showFullText, setShowFullText] = useState(false);

    const toggleText = () => {
        setShowFullText((prevShowFullText) => !prevShowFullText);
    };

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        const emoji = emojiObject.emoji;
        setTextValue((prevTextValue) => prevTextValue + emoji);
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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && textValue.trim().length <= 400) {
            e.preventDefault()
        } else if (e.key === "Enter" && !e.shiftKey && textValue.trim().length >= 400) {
            e.preventDefault()
            toast.error("The character limit is 400 characters!")
        }
    }

    const handleLike = async () => {
        try {
            const response = await fetch("/api/createLike", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user?.id, postId: post.id }),
            });
            if (!response.ok) {
                toast.error("Something went wrong. Try reloading the page?")
            }
        } catch (error) {
            console.error("Failed to create entry:", error);
        }
    };

    const handleComment = async () => {
        const toastId = toast.loading("Replying...")
        try {
            const response = await fetch("/api/createComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: user?.id, postId: post.id, content: textValue, imgUrl: imgSrc }),
            });
            if (!response.ok) {
                toast.error("Something went wrong. Try reloading the page?")
            }
        } catch (error) {
            console.error("Failed to create entry:", error);
        }
        setTextValue("")
        setImgSrc("")
        toast.dismiss(toastId)
        router.refresh()
    };

    const handleImageClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileType = file.type;
            if (fileType.startsWith("image/")) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageData = reader.result as string;
                    setImgSrc(imageData);
                };
                reader.readAsDataURL(file);
            } else {
                toast.error("Invalid file type. Please upload an image.");
            }
        }
    };

    const deleteImage = () => {
        setImgSrc("")
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

                {!isPostPage && !showFullText && post.content && post.content?.length > 153 && (
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
                                    <div className="max-w-2xl w-[100%] fixed top-24 left-[50%] z-50 translate-x-[-50%] bg-black rounded-xl shadow-md">
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
                                                    className="rounded-full h-12 w-12 mr-4 pointer-events-none"
                                                    width="45"
                                                    height="45"
                                                />
                                            )}
                                            <div>
                                                <div className="flex space-x-1 whitespace-nowrap overflow-hidden">
                                                    <h4 className="font-bold text-[15px] sm:text-[16px] truncate line-clamp-none max-w-[150px] md:max-w-[250px]">
                                                        {post.name}
                                                    </h4>
                                                    <span className="text-sm sm:text-[15px] text-gray-500 truncate line-clamp-none max-w-[60px] md:max-w-[150px]">
                                                        @{post.username} ·{" "}
                                                    </span>
                                                    <span className="text-sm sm:text-[15px] text-gray-500">
                                                        {dateOfPost}
                                                    </span>
                                                </div>
                                                <p
                                                    className="text-[15px] sm:text-[16px] mr-4 mb-2 overflow-hidden"
                                                    style={{ wordBreak: "break-word" }}
                                                >
                                                    {post.content}
                                                </p>
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
                                                <p className="text-gray-500 text-[15px]">Replying to <span className="text-blue-500 hover:cursor-pointer">@{post.username}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex p-2 ml-2 mt-6 space-x-3">
                                            {user &&
                                                <Image
                                                    src={user.imageUrl}
                                                    alt="user image"
                                                    className="rounded-full xl:mr-2 w-11 h-11 pointer-events-none"
                                                    width="150"
                                                    height="150"
                                                />
                                            }

                                            <div className="w-full">
                                                <div className="">
                                                    <textarea
                                                        className="w-full border-none focus:ring-0 text-gray-200 bg-black text-lg tracking-wide min-h-[50px] resize-none"
                                                        placeholder="Meow your reply!"
                                                        rows={2}
                                                        value={textValue}
                                                        onChange={(e) => setTextValue(e.target.value)}
                                                        onKeyUp={handleKeyPress}
                                                    />
                                                </div>
                                                {imgSrc && (
                                                    <div className="mt-2 relative max-h-20 lg:max-h-40 xl:max-h-60 2xl:max-h-80 overflow-y-scroll">
                                                        <div className="bg-white backdrop-blur w-8 h-8 rounded-full absolute top-2 left-6 z-10 opacity-80 hover:brightness-125">
                                                            <AiFillCloseCircle onClick={deleteImage} className="hover:cursor-pointer w-full h-full text-black hover:brightness-125 opacity-80" />
                                                        </div>
                                                        <Image
                                                            src={imgSrc}
                                                            alt="uploaded image"
                                                            className="mx-auto rounded ml-1"
                                                            width={500}
                                                            height={500}
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-between pt-2.5">
                                                    <div className="flex">
                                                        <div onClick={() => imagePickerRef?.current?.click()}>
                                                            <HiOutlinePhotograph className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
                                                            <input type="file" accept="image/*" hidden ref={imagePickerRef} onChange={handleImageClick} />
                                                        </div>
                                                        <Popover.Root>
                                                            <Popover.Trigger asChild>
                                                                <button>
                                                                    <BsEmojiSmile className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
                                                                </button>
                                                            </Popover.Trigger>
                                                            <Popover.Content style={{ zIndex: 1 }}>
                                                                <EmojiPicker
                                                                    onEmojiClick={handleEmojiSelect}
                                                                    theme={Theme.DARK}
                                                                    lazyLoadEmojis={true}
                                                                />
                                                            </Popover.Content>
                                                        </Popover.Root>
                                                    </div>
                                                    {textValue.trim().length > 0 &&
                                                        (
                                                            <div className={`text-gray-200
                                                                        ${textValue.trim().length >= 390 && textValue.trim().length <= 400 && "text-yellow-500"}
                                                                        ${textValue.trim().length > 400 && "text-red-500"}
                                                                            `}>
                                                                {textValue.trim().length}/400
                                                            </div>
                                                        )
                                                    }
                                                    <button
                                                        disabled={(textValue.trim().length === 0 && imgSrc === "") || textValue.trim().length > 400}
                                                        onClick={handleComment}
                                                        className="disabled:opacity-75 bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md enabled:hover:brightness-95">
                                                        Reply
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                        <FaRetweet onClick={handleNotImplemented} className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-950" />
                        <AiFillHeart onClick={handleLike} className="h-9 w-9 hoverEffect p-2 hover:text-red-500 hover:bg-red-950" />
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
