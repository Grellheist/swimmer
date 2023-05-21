"use client"
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Widgets() {
    const [inputFocused, setInputFocused] = useState(false);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    return (
        <div className="xl:w-[600px] hidden xl:inline ml-8 space-y-5">
            <div className="w-[90%] xl:w-[100%] sticky top-0 bg-black py-1.5 z-50">
                <div className="flex items-center p-3 rounded-full relative">
                    <div
                        className={`text-[20px] z-50 ${inputFocused ? "text-blue-400" : "text-gray-500"
                            }`}
                    >
                        <AiOutlineSearch />
                    </div>
                    <input
                        type="text"
                        placeholder="Search Twitter"
                        className="absolute inset-0 rounded-full text-gray-200 pl-11 border-gray-600 bg-gray-900 focus:ring-blue-400 focus:shadow-lg focus:bg-black"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
            </div>
        </div>
    );
}

