'use client'
import { useState } from "react"
import VideoPlayer from "./VideoPlayer"
import Image from 'next/image';
import {useRouter} from "next/navigation";
import { Button } from "@mui/material";

export default function MassageCard() {

    const router = useRouter()

    return (
        <div className="w-[95%] shadow-xl my-[5%] mx-[2.5%] p-2 rounded-lg bg-gradient-to-r from-[#dca74b] via-[#eaa35c] to-[#dca74b] flex flex-col font-serif">
            <div className="flex flex-row">
            <div className="w-1/4 flex flex-row px-2 py-3 ">
                <Image src='/img/icon1.png' alt='icon1' 
                width={100} height={100}
                priority/>
                <div className="px-3 font-extralight">Experienced Massage Therapist</div>
            </div>
            <div className="w-1/4 flex flex-row px-2 py-3">
                <Image src='/img/icon2.png' alt='icon2' 
                width={100} height={100}
                priority/>
                <div className="px-3 font-extralight">Full-body Massage</div>
            </div>
            <div className="w-1/4 flex flex-row px-2 py-3">
                <Image src='/img/icon3.png' alt='icon3' 
                width={100} height={100}
                priority/>
                <div className="px-3 font-extralight">Herbal Sensation</div>
            </div>
            <div className="w-1/4 flex flex-row px-2 py-3">
                <Image src='/img/icon4.png' alt='icon4' 
                width={100} height={100}
                priority/>
                <div className="px-3 font-extralight">Mineral Oil</div>
            </div>
            </div>
            <Button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white border font-extralight
            hover:font-semibold py-2 px-2 m-2 rounded z-30 hover:to-[#bcdd15] self-end w-[10%]'
            onClick={(e)=>{e.stopPropagation(); router.push('/shops')}} style={{textShadow: "1px 1px 1px black"}}>
                Have a look
            </Button>
        </div>

    )
}