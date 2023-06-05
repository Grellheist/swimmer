"use client"
import Input from '@/components/Input'
import { prisma } from '@/lib/prisma'

export default async function Home() {
    const posts = await prisma.post.findMany()

    return (
        <>
            <Input />
            {posts.map((post) => (
                <div key={post.id}>{post.content}</div>
            ))}
        </>
    )
}

