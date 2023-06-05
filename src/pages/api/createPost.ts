import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
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
