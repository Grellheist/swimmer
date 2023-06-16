import getUser from "@/utils/getUser"
import getSinglePost from "@/utils/getSinglePost"
import Image from "next/image"

export default async function page({ params }: { params: { id: string } }) {
    const post = await getSinglePost(params.id)
    if (!post) {
        return (
            <div>404</div>
        )
    }
    const { userImg, username, name } = await getUser(post.authorId)
    return (
        <div>
            <Image
                src={userImg}
                alt="User image!"
                height={800}
                width={800}
            />
            {name}
            @{username}
            {post.content}
            {post.imgUrl &&
                <Image
                    src={post.imgUrl}
                    alt="Post image!"
                    height={800}
                    width={800}
                />
            }

        </div>
    )
}
