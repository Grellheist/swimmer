import { prisma } from "@/lib/prisma"

export default async function getUserLikedPost(userId: string, postId: string) {
    try {
        const like = await prisma.like.findFirst({
            where: {
                userId,
                postId
            }
        })
    return Boolean(like)
    } catch (error) {
        console.error(error)
        throw new Error ("Failed to fetch user like status")
    }
} 
