"use client"
import YouTube from "react-youtube"

export default function More() {
    return (
        <div>
            <div className="text-lg ml-6 mt-5 font-semibold">Why do you want more? Are you not entertained?</div>
            <div className="text-md ml-6 mt-2 font-semibold">No? Here then, watch <span className="font-bold text-blue-500">this</span>:</div>
            <div className="items-center justify-center flex mt-9">
                <YouTube opts={{ height: "100", width: "300" }} videoId="XD7UAgb9JIo" />
            </div>
        </div>
    )
}
