import { dark } from '@clerk/themes';
import Sidebar from '@/components/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'react-hot-toast';

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
        <ClerkProvider appearance={{ baseTheme: dark, variables: { colorInputText: "black" } }}>
            <html lang="en" className='scroll-smooth'>
                <Toaster position='bottom-center' toastOptions={{className: "bg-black text-gray-200"}}/>
                <body className={`${inter.className} flex min-h-screen mx-auto`}>
                    <Sidebar />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    )
}
