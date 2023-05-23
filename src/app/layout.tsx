import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import Feed from '@/components/Feed'
import Widgets from '@/components/Widgets'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Whisker',
    description: 'This is a Twitter Clone, not to be taken serious. Developed by @Grellheist.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className='scroll-smooth'>
            <body className={`${inter.className} flex min-h-screen mx-auto`}>
                <Sidebar />
                <Feed />
                <Widgets />
                {children}
            </body>

        </html>
    )
}
