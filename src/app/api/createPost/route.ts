import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { content, authorId, imgUrl } = body
    const data = await prisma.post.create({
        data: {
            authorId,
            content,
            imgUrl
        },
    });
    return NextResponse.json(data)
}
