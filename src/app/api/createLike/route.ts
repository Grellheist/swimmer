import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { postId, userId } = body
    const data = await prisma.like.create({
        data: {
            postId,
            userId
        }
    })
    return NextResponse.json(data)
}
