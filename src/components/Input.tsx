"use client"
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignedIn } from "@clerk/nextjs";
import { useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import * as Popover from "@radix-ui/react-popover";
import Spinner from "../../public/spinner.svg"
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Input() {
    const { user } = useUser();
    const [textValue, setTextValue] = useState("");
    const [imgSrc, setImgSrc] = useState<string | null>("");
    const imagePickerRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        const emoji = emojiObject.emoji;
        setTextValue((prevTextValue) => prevTextValue + emoji);
    };

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
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && textValue.trim().length <= 400) {
            e.preventDefault()
            handleMeow()
        } else if (e.key === "Enter" && !e.shiftKey && textValue.trim().length >= 400) {
            e.preventDefault()
            toast.error("The character limit is 400 characters!")
        }
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

    return (
        <SignedIn>
            <div className="flex border-b border-gray-600 p-3 space-x-3">
                {user ?
                    (
                        <Link href={`/profile/${user.username}`}>
                            <Image
                                src={user.imageUrl}
                                alt="user image"
                                className="rounded-full xl:mr-2 w-11 h-11"
                                width="150"
                                height="150"
                            />
                        </Link>
                    ) : (
                        <Image
                            src={Spinner}
                            alt="Loading..."
                            width={40}
                            height={40}
                        />
                    )}
                <div className="w-full divide-y divide-gray-600">
                    <div className="">
                        <textarea
                            className="w-full border-none focus:ring-0 text-gray-200 bg-black text-lg tracking-wide min-h-[50px] resize-none"
                            placeholder="What is happening?!"
                            rows={2}
                            value={textValue}
                            onChange={(e) => setTextValue(e.target.value)}
                            onKeyUp={handleKeyPress}
                        />
                    </div>
                    {imgSrc && (
                        <div className="mt-2 relative">
                            <div className="bg-white backdrop-blur w-8 h-8 rounded-full absolute top-2 left-6 z-10 opacity-80 hover:brightness-125">
                                <AiFillCloseCircle onClick={deleteImage} className="hover:cursor-pointer w-full h-full text-black hover:brightness-125 opacity-80" />
                            </div>
                            <Image
                                src={imgSrc}
                                alt="uploaded image"
                                className="mx-auto rounded"
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
                        <button onClick={handleMeow}
                            disabled={(textValue.trim().length === 0 && imgSrc === "") || textValue.trim().length > 400}
                            className="disabled:opacity-75 bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md enabled:hover:brightness-95">
                            Meow
                        </button>
                    </div>
                </div>
            </div>
        </SignedIn >
    );
}
