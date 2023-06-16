import { prisma } from "@/lib/prisma";

export default async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safePosts = posts.map((post) => ({
            ...post,
            createdAt: post.createdAt.toISOString()
        }))

        return safePosts
    } catch (err) {
        console.log(err)
    }
}
