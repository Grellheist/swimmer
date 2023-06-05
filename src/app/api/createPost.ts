import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
    if (req.method === "POST") {
        const { textValue } = req.body;

        try {
            const entry = await prisma.post.create({
                data: {
                    authorId: "hahah",
                    content: textValue,
                },
            });

            res.status(201).json(entry);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create entry" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
