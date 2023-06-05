import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { authorId } = request.body
    const data = await prisma.post.create({
        data: {
            authorId: "hahah",
        },
    });
    return NextResponse.json(data)
}
