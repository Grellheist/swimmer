import Input from '@/components/Input'
import Post from '@/components/Post'
import getPosts from '@/utils/getPosts'
import getUser from '@/utils/getUser'
import checkIfUserLiked from '@/utils/checkIfUserLiked'
import { Providers } from '@/utils/providers'
import { useUser } from '@clerk/nextjs'

export default async function Home() {
    const posts = await getPosts()
    const { user } = useUser()
    if (!posts) {
        throw new Error("Something went wrong")
    }

    const fetchUserInformation = async (authorId: string) => {
        const { userImg, username, name } = await getUser(authorId)
        return { userImg, username, name }
    }

    const hasUserLiked = async (authorId: string, postId: string) => {
        const liked = await checkIfUserLiked(authorId, postId)
        return liked
    }

    const postsWithUserInformation = await Promise.all(
        posts.map(async (post) => {
            const { userImg, username, name } = await fetchUserInformation(post.authorId)
            if (user) {
                const liked = await hasUserLiked(user.id, post.id)
                return { ...post, liked, userImg, username, name }
            }
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

