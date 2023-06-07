import Input from '@/components/Input'
import getPosts from '@/utils/getPosts'

export default async function Home() {
    const posts = await getPosts()
    if (!posts) {
        throw new Error("Something went wrong")
    }
    return (
        <>
            <Input />
            {posts.map((post) => (
                <h1 key={post.id}>{post.content}</h1>
            ))}
        </>
    )
}

