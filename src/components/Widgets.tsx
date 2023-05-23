"use client"
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import News from "./News";
import { Article, NewsData } from './types'

export default function Widgets() {
    const [articleNumber, setArticleNumber] = useState(3);
    const [inputFocused, setInputFocused] = useState(false);
    const [newsData, setNewsData] = useState<NewsData | null>(null);

    const handleInputFocus = () => {
        setInputFocused(true);
    };

    const handleInputBlur = () => {
        setInputFocused(false);
    };

    useEffect(() => {
        const fetchNewsData = async () => {
            const NEWS_URL =
                "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";
            const response = await fetch(NEWS_URL);
            const data = await response.json();
            setNewsData(data);
        };

        fetchNewsData();
    }, []);

    return (
        <div className="xl:w-[600px] hidden xl:inline ml-8 space-y-5">
            {/* Search Input */}
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
                        placeholder="Search Swimmer"
                        className="absolute inset-0 rounded-full text-gray-200 pl-11 border-transparent focus:ring-blue-400 focus:shadow-lg focus:bg-black"
                        style={{ backgroundColor: "rgb(32,35,39)" }}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                </div>
            </div>

            {/* News Section */}
            <div className=" space-y-3 rounded-xl pt-2 w-[75%] xl:w-[100%]" style={{ backgroundColor: "rgb(22,24,28)" }}>
                <h4 className="text-gray-200 text-[20px] font-bold px-4">What&apos;s happening</h4>
                {newsData ? (
                    <div>
                        {newsData.articles.slice(0, articleNumber).map((article: Article) => (
                            <News key={article.title} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center font-bold">Loading...</div>
                )}
                <button onClick={() => setArticleNumber(articleNumber + 3)} className="text-blue-400 pl-4 pb-3">Show more</button>
            </div>

        </div >
    );
}

