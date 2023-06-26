import getUser from "@/utils/getUser"
import getSinglePost from "@/utils/getSinglePost"
import Post from "@/components/Post"

export default async function page({ params }: { params: { id: string } }) {
    const post = await getSinglePost(params.id)
    if (!post) {
        return (
            <div>404</div>
        )
    }
    const user = await getUser(post.authorId)
    const combinedProps = { ...post, ...user }
    return (
        <Post post={combinedProps} isPostPage />
    )
}
