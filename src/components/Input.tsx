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

export default function Input() {
    const { user } = useUser();
    const [textValue, setTextValue] = useState("");
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
                body: JSON.stringify({ authorId: user?.id, content: textValue }),
            });
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
        } catch (error) {
            console.error("Failed to create entry:", error);
        }
        window.location.reload()
        setTextValue("")
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleMeow()
        }
    }

    const handleImageClick = () => { }

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
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex">
                            <div onClick={() => imagePickerRef?.current?.click()}>
                                <HiOutlinePhotograph className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
                                <input type="file" hidden ref={imagePickerRef} onClick={handleImageClick} />
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
                        <button onClick={handleMeow} disabled={textValue.trim().length === 0} className="disabled:opacity-75 bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md enabled:hover:brightness-95">
                            Meow
                        </button>
                    </div>
                </div>
            </div>
        </SignedIn>
    );
}
