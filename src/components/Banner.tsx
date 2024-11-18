'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function Banner () {
    const covers = ['/img/massage1.png','/img/massage2.png','/img/massage3.png']
    const [index, setIndex] = useState(0)
    const router = useRouter()

    return (
        <div className='block w-screen h-[80vh] relative m-0 p-[5px]' onClick={()=>{setIndex(index+1)}}>
            <Image src={covers[(index)%3]}
            alt='cover'
            fill={true}
            objectFit='cover'
            priority/>
            <div className="flex justify-center">
                <div className='relative z-20 top-[100px] text-center bg-gradient-to-r from-[#b48d52] to-[#caaf82] text-white rounded-[50%] shadow-lg p-5'>
                    <h1 className='px-12 text-3xl font-semibold font-mono tracking-tight' style={{textShadow: "1px 1px 2px black"}}>Massage Hub</h1>
                    <h3 className='text-xl font-extralight drop-shadow-lg'>Relax. Take a Massage</h3>
                </div>
            </div>
            <button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white border 
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-5 hover:to-[#bcdd15]'
            onClick={(e)=>{e.stopPropagation(); router.push('/shops')}} style={{textShadow: "1px 1px 1px black"}}>
                Have a look
            </button>
        </div>
    );
}