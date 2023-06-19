import Input from '@/components/Input'
import Post from '@/components/Post'
import getPosts from '@/utils/getPosts'
import getUser from '@/utils/getUser'
import { Providers } from '@/utils/providers'

export default async function Home() {
    const posts = await getPosts()
    if (!posts) {
        throw new Error("Something went wrong")
    }

    const fetchUserInformation = async (authorId: string) => {
        const { userImg, username, name } = await getUser(authorId)
        return { userImg, username, name }
    }

    const postsWithUserInformation = await Promise.all(
        posts.map(async (post) => {
            const { userImg, username, name } = await fetchUserInformation(post.authorId)
            return { ...post, userImg, username, name }
        })
    )

    return (
        <>
            <Input />
            <Providers>
                {postsWithUserInformation.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </Providers>
        </>
    )
}

