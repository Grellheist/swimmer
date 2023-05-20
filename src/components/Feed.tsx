import { HiSparkles } from 'react-icons/hi'
import Input from './Input'
import Post from './Post'

export default function Feed() {
    const posts = [
        {
            id: 1,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            img: "https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=m3wxmja3fdf8mhxwag90by1wywdlfhx8fgvufdb8fhx8fa%3d%3d&auto=format&fit=crop&w=1170&q=80",
            text: "nice view!",
            timestamp: "2h"
        },
        {
            id: 2,
            name: "Grellheist",
            username: "grellheist",
            userImg: "https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2",
            img: "https://plus.unsplash.com/premium_photo-1667760701840-6d2e8ab46af0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=694&q=80",
            text: "forsen monkaS",
            timestamp: "4h"
        },
    ];
    return (
        <div className='xl:ml-[330px] border-l border-gray-600 border-r xl:min-w-[620px] sm:ml-[73px] flex-grow max-w-xl'>
            <div className='flex py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-600'>
                <h2 className='text-lg sm:text-xl font-bold cursor-pointer flex items-center justify-center'>Home</h2>
                <div className='hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9'>
                    <HiSparkles className='h-7' />
                </div>
            </div>
            <Input />
            {posts.map((post) => (
                <Post
                    post={post}
                    key={post.id}
                />
            ))}
        </div>
    )
}
