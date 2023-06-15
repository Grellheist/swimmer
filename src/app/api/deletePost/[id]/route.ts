import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { useUser } from "@clerk/nextjs"

interface ParamsInterface {
    id?: string
}

export async function DELETE(request: Request, { params }: { params: ParamsInterface }) {
    const { id } = params
    const { user } = useUser()
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const selectedPost = await prisma.post.findUnique({
        where: {
            id: id
        }
    })
    if (!selectedPost) {
        return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }
    if (selectedPost.authorId !== user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    const deletedPost = await prisma.post.delete({
        where: {
            id: id
        }
    })
    return NextResponse.json(deletedPost)
}
