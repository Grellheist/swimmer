import getUser from "@/utils/getUser"
import getSinglePost from "@/utils/getSinglePost"
import getComments from "@/utils/getComments"
import checkIfUserLiked from "@/utils/checkIfUserLiked"
import Post from "@/components/Post"
import Comment from "@/components/Comment"
import React from "react"
import { currentUser } from "@clerk/nextjs/dist/server-helpers.server"

async function getCurrentUser() {
    const user = await currentUser()
    if (!user) {
        return null
    }
    return user.id
}

export default async function page({ params }: { params: { id: string } }) {
    const post = await getSinglePost(params.id)
    const comments = await getComments(params.id)
    const currentUserId = await getCurrentUser()

    if (!currentUserId) {
        throw new Error("Not logged in")
    }

    if (!comments) {
        throw new Error("Something went wrong!")
    }

    if (!post) {
        return (
            <div>404</div>
        )
    }

    const user = await getUser(post.authorId)
    const hasLiked = await checkIfUserLiked(currentUserId, post.id)
    const postProps = { ...post, ...user, hasLiked }

    const fetchUserInformation = async (authorId: string) => {
        const { userImg, username, name } = await getUser(authorId)
        return { userImg, username, name }
    }

    const commentsWithUserInformation = await Promise.all(
        comments.map(async (comment) => {
            const { userImg, username, name } = await fetchUserInformation(comment.userId)
            return { ...comment, userImg, username, name }
        })
    )


    return (
        <div>
            <Post post={postProps} />
            {commentsWithUserInformation.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    )
}
