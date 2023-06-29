"use client"
import SidebarMenuItem from "./SidebarMenuItem"
import { AiFillHome, AiFillBell, AiOutlineClose, AiFillCloseCircle } from "react-icons/ai"
import { FaHashtag, FaSignInAlt, FaUserAlt } from "react-icons/fa"
import { GrMail } from "react-icons/gr"
import { BsEmojiSmile, BsFillBookmarkFill } from "react-icons/bs"
import { RiFileListFill } from "react-icons/ri"
import { RxCross2 } from "react-icons/rx"
import { HiDotsCircleHorizontal, HiDotsHorizontal, HiOutlinePhotograph } from "react-icons/hi"
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
import * as Dialog from "@radix-ui/react-dialog"
import { toast } from "react-hot-toast"
import { useRef, useState } from "react"
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react"
import { useRouter } from "next/navigation"

export default function Sidebar() {
    const { user } = useUser();
    const [open, setOpen] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [imgSrc, setImgSrc] = useState<string | null>("");
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        const emoji = emojiObject.emoji;
        setTextValue((prevTextValue) => prevTextValue + emoji);
    };

    const handleNotImplemented = () => {
        toast.error("Page not implemented!")
    }

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

    const handleMeow = async () => {
        const toastId = toast.loading("Posting...")
        try {
            const response = await fetch("/api/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ authorId: user?.id, content: textValue, imgUrl: imgSrc }),
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
        setOpen(false)
    };

    return (
        <div className="select-none hidden sm:flex flex-col p-2 sm:ml-3 xl:items-start fixed h-full" >
            <Link href="/home" className="hoverEffect xl:mt-0.5">
                <IoLogoOctocat className="w-7 h-8" />
            </Link>

            <div className="mt-4 mb-2.5 xl:items-start">
                <SignedIn>
                    <Link href="/home">
                        <SidebarMenuItem text="Home" Icon={AiFillHome} />
                    </Link>
                </SignedIn>
                <Link href="/explore">
                    <SidebarMenuItem text="Explore" Icon={FaHashtag} />
                </Link>
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
                    <div onClick={handleNotImplemented}>
                        <SidebarMenuItem text="Notifications" Icon={AiFillBell} />
                    </div>
                    <div onClick={handleNotImplemented}>
                        <SidebarMenuItem text="Messages" Icon={GrMail} />
                    </div>
                    <div onClick={handleNotImplemented} className="hidden 2xl:block">
                        <SidebarMenuItem text="Lists" Icon={RiFileListFill} />
                    </div>
                    <div onClick={handleNotImplemented} className="hidden 2xl:block">
                        <SidebarMenuItem text="Bookmarks" Icon={BsFillBookmarkFill} />
                    </div>
                    <ClerkLoaded>
                        {user && user.username &&
                            <Link href={`/profile/${user.id}`} className='hoverEffect flex items-center justify-center xl:justify-start space-x-3' >
                                <FaUserAlt className='mr-3 text-[28px]' />
                                <span className={'hidden xl:inline text-[22px]'}>Profile</span>
                            </Link >
                        }
                    </ClerkLoaded>
                    <Link href="/more">
                        <SidebarMenuItem text="More" Icon={HiDotsCircleHorizontal} />
                    </Link>
                </SignedIn>
                <SignedOut>
                    <SignInButton mode="modal">
                        <FaSignInAlt className="hidden sm:block xl:hidden w-7 h-7 text-blue-500 cursor-pointer hover:brightness-95 fixed bottom-10" />
                    </SignInButton>
                </SignedOut>
            </div>

            <SignedIn>
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger>
                        <button className="bg-blue-500 rounded-full w-64 h-14 mt-6 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">
                            Meow
                        </button>
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
                                                placeholder="What is happening?!"
                                                rows={2}
                                                value={textValue}
                                                onChange={(e) => setTextValue(e.target.value)}
                                            />
                                        </div>
                                        {imgSrc && (
                                            <div className="mt-2 relative max-h-20 lg:max-h-40 xl:max-h-60 overflow-y-scroll">
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
                                                onClick={handleMeow}
                                                className="disabled:opacity-75 bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md enabled:hover:brightness-95">
                                                Meow
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>

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
