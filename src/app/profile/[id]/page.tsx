"use client"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { MdBrokenImage } from "react-icons/md"

export default async function Profile() {
    const { user } = useUser()

    return (
        <div>
            <div>{user?.fullName}</div>
            <div>@{user?.username}</div>
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

        </div>
    )
}
