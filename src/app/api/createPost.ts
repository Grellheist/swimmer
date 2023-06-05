import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const post = JSON.parse(req.body);
        try {
            const data = await prisma.post.create({
                data: {
                    authorId: "hahah",
                },
            });

            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Failed to create entry" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
