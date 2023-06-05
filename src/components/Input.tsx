"use client"
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignedIn } from "@clerk/nextjs";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { Theme } from "emoji-picker-react";
import * as Popover from "@radix-ui/react-popover";

export default function Input() {
    const { user } = useUser();
    const [textValue, setTextValue] = useState("");

    const handleEmojiSelect = (emojiObject: EmojiClickData) => {
        const emoji = emojiObject.emoji;
        setTextValue((prevTextValue) => prevTextValue + emoji);
    };

    const handleMeow = async () => {
        try {
            const response = await fetch("../app/api/createEntry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ textValue }),
            });
            if (!response.ok) {
                throw new Error("Something went wrong")
            }
        } catch (error) {
            console.error("Failed to create entry:", error);
        }
    };

    if (!user) return <div>404</div>

    return (
        <SignedIn>
            <div className="flex border-b border-gray-600 p-3 space-x-3">
                <Link href={`/profile/${user.id}`}>
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
                        />
                    </div>
                    <div className="flex items-center justify-between pt-2.5">
                        <div className="flex">
                            <HiOutlinePhotograph className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
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

