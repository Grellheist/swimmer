import { prisma } from "@/lib/prisma";

export default async function checkIfUserLiked(userId: string, postId: string) {
    try {
        const result = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });
        console.log(result)
        if (result) {
            return true
        }
        return false
    } catch (err) {
        console.error(err);
    }
}

