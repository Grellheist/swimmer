import { prisma } from "@/lib/prisma";

export default async function getComments(postId: string) {
    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeComments = comments.map((comment) => ({
            ...comment,
            createdAt: comment.createdAt.toISOString()
        }))

        return safeComments

    } catch (err) {
        console.log(err)
    }
}

