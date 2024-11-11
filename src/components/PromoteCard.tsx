'use client'
import { useState } from "react"
import VideoPlayer from "./VideoPlayer"
import { useWindowListener } from "@/hooks/useWindowListener"

export default function PromoteCard() {

    const [playing, setPlaying] = useState(true)
    useWindowListener("contextmenu", (e)=>{ e.preventDefault()})
    return (
        <div className="w-[80%] shadow-lg mx-[10%] p-2 rounded-lg bg-gradient-to-r from-[#bd87e4] to-[#87ace4] flex flex-row m-2">
            <VideoPlayer vdoSrc="/vdo/getvaccine.mp4" isPlaying={playing}></VideoPlayer>
            <div className="m-5">Get your vaccine today.
            <button className="mt-[2px] block rounded-md bg-gradient-to-r from-[#f48787] text-white border 
            font-semibold px-3 py-2 hover:to-[#b1c5ff] shadow-sm"
            onClick={()=> { setPlaying(!playing)}}>
                {playing? 'Pause':'Play'}
            </button>
            </div>
        </div>

    )
}