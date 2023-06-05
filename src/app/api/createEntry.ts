import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
    if (req.method === "POST") {
        const { textValue, imgUrl, authorId } = req.body;

        try {
            const entry = await prisma.post.create({
                data: {
                    authorId: authorId,
                    content: textValue,
                    imgUrl: imgUrl
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
