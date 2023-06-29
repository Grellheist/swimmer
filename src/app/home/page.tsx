import Input from '@/components/Input'
import Post from '@/components/Post'
import getPosts from '@/utils/getPosts'
import getUser from '@/utils/getUser'
import checkIfUserLiked from '@/utils/checkIfUserLiked'
import { Providers } from '@/utils/providers'
import { currentUser } from "@clerk/nextjs"

async function getCurrentUser() {
    const user = await currentUser()
    if (!user) {
        return null
    }
    return user.id
}

export default async function Home() {
    const posts = await getPosts()
    const currentUserId = await getCurrentUser()
    if (!currentUserId) {
        throw new Error("Not logged in")
    }
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
            const hasLiked = await hasUserLiked(currentUserId, post.id)
            return { ...post, hasLiked, userImg, username, name }
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

