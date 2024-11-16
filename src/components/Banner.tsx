'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Banner () {
    const covers = ['/img/cover.jpg','/img/cover2.jpg','/img/cover3.jpg','/img/cover4.jpg']
    const [index, setIndex] = useState(0)
    const router = useRouter()

    return (
        <div className='block w-screen h-[80vh] relative m-0 p-[5px]' onClick={()=>{setIndex(index+1)}}>
            {/* <Image src={covers[(index)%4]}
            alt='cover'
            fill={true}
            objectFit='cover'
            priority/> */}
            <div className="flex justify-center">
                <div className='relative z-20 top-[100px] text-center bg-gradient-to-r from-[#f48787] to-[#b1c5ff] text-white rounded-lg shadow-lg border-black border-2'>
                    <h1 className='text-3xl font-extrabold font-mono tracking-tight drop-shadow-xl' style={{textShadow: "1px 1px 2px black"}}>Vaccine Service Center</h1>
                    <h3 className='text-xl font-serif font-thin drop-shadow-lg'>Get your required vaccination from us today!</h3>
                </div>
            </div>
            <button className='bg-gradient-to-r from-[#f48787] text-white border 
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-5 hover:to-[#b1c5ff]'
            onClick={(e)=>{e.stopPropagation(); router.push('/hospital')}} style={{textShadow: "1px 1px 1px black"}}>
                Select Hospital
            </button>
        </div>
    );
}