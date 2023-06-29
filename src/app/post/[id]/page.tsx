import getUser from "@/utils/getUser"
import getSinglePost from "@/utils/getSinglePost"
import getComments from "@/utils/getComments"
import Post from "@/components/Post"
import Comment from "@/components/Comment"
import React from "react"

export default async function page({ params }: { params: { id: string } }) {
    const post = await getSinglePost(params.id)
    const comments = await getComments(params.id)
    if (!comments) {
        throw new Error("Something went wrong!")
    }
    if (!post) {
        return (
            <div>404</div>
        )
    }
    const user = await getUser(post.authorId)
    const postProps = { ...post, ...user }

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
