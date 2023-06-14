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

export default function Input() {
    const { user } = useUser();
    const [textValue, setTextValue] = useState("");
    const [imgSrc, setImgSrc] = useState<string | null>("");
    const imagePickerRef = useRef<HTMLInputElement>(null)

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        const emoji = emojiObject.emoji;
        setTextValue((prevTextValue) => prevTextValue + emoji);
    };

    const handleMeow = async () => {
        try {
            const response = await fetch("/api/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ authorId: user?.id, content: textValue, imgUrl: imgSrc }),
            });
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
        } catch (error) {
            console.error("Failed to create entry:", error);
        }
        window.location.reload()
        setTextValue("")
        setImgSrc("")
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleMeow()
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
                throw new Error("Invalid file type. Please upload an image.");
            }
        }
    };


    const deleteImage = () => {
        setImgSrc("")
    }

    if (!user) {
        return (
            <div className="flex items-center justify-center mb-4">
                <Image src={Spinner} height={45} width={45} alt="Loading..." />
            </div>
        )
    }

    return (
        <SignedIn>
            <div className="flex border-b border-gray-600 p-3 space-x-3">
                <Link href={`/profile/${user.username}`}>
                    <Image
                        src={user.imageUrl}
                        alt="user image"
                        className="rounded-full xl:mr-2 w-11 h-11"
                        width="150"
                        height="150"
                    />
                </Link>
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
                                <input type="file" hidden ref={imagePickerRef} onChange={handleImageClick} />
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
                        <button onClick={handleMeow} disabled={textValue.trim().length === 0 && imgSrc === ""} className="disabled:opacity-75 bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md enabled:hover:brightness-95">
                            Meow
                        </button>
                    </div>
                </div>
            </div>
        </SignedIn>
    );
}
