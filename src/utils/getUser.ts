import { clerkClient } from "@clerk/nextjs"

export default async function getUser(userId: string) {
    const user = await clerkClient.users.getUser(userId)
    return user
}
