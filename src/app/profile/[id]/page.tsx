import Image from "next/image"
import getUser from "@/utils/getUser"
import { currentUser } from "@clerk/nextjs"
import checkIfUserLiked from "@/utils/checkIfUserLiked"
import getUserPosts from "@/utils/getUserPosts"
import Post from "@/components/Post"
import Head from "next/head"

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
        <>
            <Head>
                <title>{user.username}</title>
            </Head>
            <div className="relative h-36 bg-slate-600">
                <Image
                    src={user.userImg}
                    alt={`${user.username}'s profile pic`}
                    width={128}
                    height={128}
                    className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
                />
            </div>
            <div className="h-[64px]"></div>
            <div className="pl-4 pt-4 text-2xl font-bold">{user.name}</div>
            <div className="pl-4 pb-4 text-md text-gray-500">{`@${user.username}`}</div>
            <div className="w-full border-b border-gray-600" />
            {postsWithUserInformation.map((post) => (
                <Post key={post.id} post={post} />
            ))
            }
        </>
    )
}
