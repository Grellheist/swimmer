import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { postId, userId } = body
    const existingLike = await prisma.like.findFirst({
        where: {
            postId,
            userId
        }
    })
    if (!existingLike) {
        const data = await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
        await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likeCount: {
                    decrement: 1,
                }
            }
        })
        return NextResponse.json(data)
    } else {
        const data = await prisma.like.delete({
            where: {
                id: existingLike.id
            }
        })
        await prisma.post.update({
            where: {
                id: postId,
            },
            data: {
                likeCount: {
                    increment: 1,
                }
            }
        })
        return NextResponse.json(data)
    }
}
