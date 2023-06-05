import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Router from "next/router";

export async function POST(request: Request) {
    const body = await request.json()
    const { content, authorId } = body
    const data = await prisma.post.create({
        data: {
            authorId,
            content,
        },
    });
    Router.reload()
    return NextResponse.json(data)
}
