import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Post from '@/components/Post'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Twitter Clone',
    description: 'This is a Twitter clone',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} flex min-h-screen mx-auto`}>
                <Sidebar />
                <Feed />
                {children}
            </body>

        </html>
    )
}
