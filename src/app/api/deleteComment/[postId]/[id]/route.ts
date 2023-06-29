import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface ParamsInterface {
    id?: string
    postId: string
}

export async function DELETE(request: Request, { params }: { params: ParamsInterface }) {
    const { id, postId } = params
    const deletedComment = await prisma.comment.delete({
        where: {
            id: id
        }
    })
    await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            commentCount: {
                decrement: 1
            }
        }
    })
    return NextResponse.json(deletedComment)
}
