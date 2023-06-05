import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json()
    const { content, authorId } = body
    const data = await prisma.post.create({
        data: {
            authorId,
            content,
        },
    });
    NextResponse.redirect("/home")
    return NextResponse.json(data)
}
