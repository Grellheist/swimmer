import Input from '@/components/Input'
import Post from '@/components/Post'
import getPosts from '@/utils/getPosts'
import getUser from '@/utils/getUser'
import checkIfUserLiked from '@/utils/checkIfUserLiked'
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

    const userHasLiked = async (authorId: string, postId: string) => {
        const hasLiked = await checkIfUserLiked(authorId, postId)
        return hasLiked
    }

    const postsWithUserInformation = await Promise.all(
        posts.map(async (post) => {
            const { userImg, username, name } = await fetchUserInformation(post.authorId)
            const liked = await userHasLiked(post.authorId, post.id)
            console.log(liked)
            return { ...post, liked, userImg, username, name }
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

