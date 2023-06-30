import Image from "next/image"
import getUser from "@/utils/getUser"
import { currentUser } from "@clerk/nextjs"
import checkIfUserLiked from "@/utils/checkIfUserLiked"
import getUserPosts from "@/utils/getUserPosts"
import Post from "@/components/Post"

async function getCurrentUser() {
    const user = await currentUser()
    if (!user) {
        return null
    }
    return user.id
}

export default async function Profile({ params }: { params: { id: string } }) {
    const user = await getUser(params.id)
    const posts = await getUserPosts(params.id)
    const currentUserId = await getCurrentUser()

    if (!currentUserId) {
        throw new Error("Not logged in")
    }

    if (!posts) {
        return (
            <div>404</div>
        )
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

    if (!user) return <div>404</div>

    return (
        <div>
            <div>{user.name}</div>
            <div>@{user.username}</div>
                <Image
                    src={user.userImg}
                    alt="user image"
                    className="rounded-full xl:mr-2 w-11 h-11"
                    width="150"
                    height="150"
                />
                {postsWithUserInformation.map((post) => (
                    <Post key={post.id} post={post}/>
                ))}
        </div>
    )
}
