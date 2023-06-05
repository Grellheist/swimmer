"use client"
import Input from '@/components/Input'
import Post from '@/components/Post'
import { useUser } from '@clerk/nextjs'

async function getPosts() {
    const response = await fetch("/api/getPosts")
    if (!response.ok) {
        console.log(response)
    }
    return response.json()

}
export default async function Home() {
    const { user } = useUser()
    const data: { id: string, content: string, imgUrl: string, authorId: string }[] = await getPosts()

    return (
        <>
            <Input />
            {data.map((post) => (
                <h1 key={post.id}>{post.content}</h1>
            ))}
        </>
    )
}

