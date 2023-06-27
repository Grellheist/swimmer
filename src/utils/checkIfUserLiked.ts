import { prisma } from "@/lib/prisma";

export default async function checkIfUserLiked(userId: string, postId: string) {
    try {
        const like = await prisma.like.findFirst({
            where: {
                userId,
                postId,
            },
        });
        if (!like) {
            return null
        }
        const safeObj = {...like}
        console.log(safeObj)
        return safeObj
    } catch (err) {
        console.error(err);
    }
}

