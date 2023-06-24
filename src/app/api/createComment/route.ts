import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { postId, content, userId, imgUrl } = body
    const data = await prisma.comment.create({
        data: {
            userId,
            content,
            imgUrl,
            postId
        },
    });
    return NextResponse.json(data)
}

