"use client"
import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useUser, SignedIn } from "@clerk/nextjs";
import { MdBrokenImage } from "react-icons/md";
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

    return (
        <SignedIn>
            <div className="flex border-b border-gray-600 p-3 space-x-3">
                <Link href="/profile">
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
                                <Popover.Content style={{ position: "absolute", zIndex: 1 }}>
                                    <EmojiPicker
                                        onEmojiClick={handleEmojiSelect}
                                        theme={Theme.DARK}
                                    />
                                </Popover.Content>
                            </Popover.Root>
                        </div>
                        <button className="bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">
                            Meow
                        </button>
                    </div>
                </div>
            </div>
        </SignedIn>
    );
}

