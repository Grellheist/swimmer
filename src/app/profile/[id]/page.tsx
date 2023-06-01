import { useUser } from "@clerk/nextjs"
import Image from "next/image"

export default async function Profile() {
    const { user } = useUser()

    return (
        <div>
            {user?.fullName} profile
        </div>
    )
}
