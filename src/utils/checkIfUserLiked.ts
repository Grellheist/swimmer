import { prisma } from "@/lib/prisma";

export default async function checkIfUserLiked(userId: string, postId: string) {
    try {
        const like = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });
        return {
            likeId: like?.userId
        }
    } catch (err) {
        console.error(err);
        throw new Error("Failed to check user's like status.");
    }
}

