import { prisma } from "@/lib/prisma";

export default async function getSinglePost(postId: string) {
    try {
        const postObj = await prisma.post.findUnique({
            where: { id: postId },
        })

        if (!postObj) {
            return null
        }

        const safePost = {
            ...postObj,
            createdAt: postObj?.createdAt.toISOString()
        }

        return safePost
    } catch (err) {
        console.log(err)
    }
}

