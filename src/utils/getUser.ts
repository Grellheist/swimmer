import { clerkClient } from "@clerk/nextjs"

export default async function getUser(userId: string) {
    const user = await clerkClient.users.getUser(userId)
    const getName = () => {
        if (user.lastName !== null) {
            return user.firstName + " " + user.lastName
        } else {
            return user.firstName
        }
    }
    return {
        username: user.username,
        name: getName(),
        userImg: user.imageUrl
    }
}
