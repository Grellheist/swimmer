import { prisma } from "@/lib/prisma"

export default async function Profile() {
    const users = await prisma.user.findMany()
    return (
        <div></div>
    )
}
