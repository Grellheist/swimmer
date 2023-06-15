import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

interface ParamsInterface {
    id?: string
}

export async function DELETE(request: Request, { params }: { params: ParamsInterface }) {
    const { id } = params
    const deletedPost = await prisma.post.delete({
        where: { 
            id: id
        }
    })
    return NextResponse.json(deletedPost)
}
