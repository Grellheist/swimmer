import { prisma } from "@/lib/prisma";

export default async function getSinglePost(postId: string) {
    try {
        const postObj = await prisma.post.findUnique({
            where: { id: postId }
        })
        return postObj
    } catch (err) {
        console.log(err)
    }
}

