import Input from '@/components/Input'
import Post from '@/components/Post'
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
                <Post key={post.id} post={post} />
            ))}
        </>
    )
}

