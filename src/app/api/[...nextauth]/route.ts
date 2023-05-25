import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const GOOGLE_CLIENT_ID: string = `${process.env.GOOGLE_CLIENT_ID}`
const GOOGLE_CLIENT_SECRET: string = `${process.env.GOOGLE_CLIENT_SECRET}`

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        })
    ]
})

export { handler as GET, handler as POST }
