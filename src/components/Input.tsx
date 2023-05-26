import { BsEmojiSmile } from "react-icons/bs";
import { HiOutlinePhotograph } from "react-icons/hi";
import Image from "next/image";
import { useUser, SignedOut, SignedIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Input() {
    const { user } = useUser();
    return (
        <div className='flex border-b border-gray-600 p-3 space-x-3'>
            {user?.imageUrl ?
                (
                    <Image
                        src={user?.imageUrl}
                        alt="user image"
                        className="rounded-full h-12 w-12 cursor-pointer hover:brightness-95"
                        width="150"
                        height="150"
                    />
                ) : (
                    <Image
                        src="https://ombud.alaska.gov/wp-content/uploads/2018/01/no-user.jpg"
                        alt="user image"
                        className="rounded-full h-12 w-12 cursor-pointer hover:brightness-95"
                        width="150"
                        height="150"
                    />
                )
            }
            <div className="w-full divide-y divide-gray-600">
                <div className="">
                    <SignedIn>
                        <textarea className="w-full border-none focus:ring-0 text-gray-200 bg-black text-lg tracking-wide min-h-[50px] resize-none" placeholder="What is happening?!" rows={2} />
                    </SignedIn>
                    <SignedOut>
                        <textarea className="w-full border-none focus:ring-0 text-gray-200 bg-black text-lg tracking-wide min-h-[50px] resize-none" disabled placeholder="Sign in or register to share your thoughts..." rows={2} />
                    </SignedOut>
                </div>
                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex">
                        <HiOutlinePhotograph className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
                        <BsEmojiSmile className="h-10 w-10 hoverEffect p-2 text-blue-500 hover:bg-gray-900" />
                    </div>
                    <SignedOut>
                        <Link href="https://social-racer-66.accounts.dev/sign-up">
                            <button className="bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md">Register</button>
                        </Link>
                    </SignedOut>
                    <SignedIn>
                        <button className="bg-blue-500 text-gray-200 px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95">Meow</button>
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}
