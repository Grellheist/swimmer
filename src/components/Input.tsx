import { BsFillEmojiSmileFill } from "react-icons/bs";
import { HiPhotograph } from "react-icons/hi";

export default function Input() {
    return (
        <div className='flex border-b border-gray-600 p-3 space-x-3'>
            <img
                src="https://preview.redd.it/wk01okjvpar61.jpg?width=960&crop=smart&auto=webp&s=12cc4ee8093e75a6e0e69f24beefae50cfbfa2e2"
                alt="user image"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
            />
            <div className="w-full divide-y divide-gray-600">
                <div className="">
                    <textarea className="w-full border-none focus:ring-0 text-gray-200 bg-black text-lg tracking-wide min-h-[50px]" placeholder="What is happening?!" rows={2} />
                </div>
                <div className="flex items-center justify-between pt-2.5">
                    <div className="flex">
                        <HiPhotograph className="h-10 w-10 hoverEffect p-2 text-sky-400 hover:bg-gray-900" />
                        <BsFillEmojiSmileFill className="h-10 w-10 hoverEffect p-2 text-sky-400 hover:bg-gray-900" />
                    </div>
                    <button className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
                </div>
            </div>
        </div>
    )
}
