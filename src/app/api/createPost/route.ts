import { prisma } from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
    const { authorId } = req.body
    const data = await prisma.post.create({
        data: {
            authorId: "hahah",
        },
    });
    return NextResponse.json(data)
}
