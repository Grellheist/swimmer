"use client"
import React from "react";
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void; }) {
    useEffect(() => {
        console.log(error);
    }, [error]);
    return (
        <div className="bg-black h-screen flex flex-col justify-center items-center z-50">
            <h2 className="text-gray-200 text-lg">Something went wrong!</h2>
            <h2 className="text-gray-200 text-lg">Try reloading the page <span className="text-blue-500">(maybe CTRL + F5?)</span>.</h2>
            <h2 className="text-gray-200 text-lg">Or click the button:</h2>
            <button className="text-gray-200 hover:text-blue-500 text-lg" onClick={() => reset()}>Try again</button>
        </div>
    )
}
