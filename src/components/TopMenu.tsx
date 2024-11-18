'use client'
import TopMenuItem from './TopMenuItem';
import { Link } from '@mui/material';
import useUserStore from '@/hooks/useUser';
import { useRouter } from 'next/navigation';


export default function TopMenu() {
    const {user, logout} = useUserStore()
    const router = useRouter()

    const signOut = () =>{
        logout()
        router.push('/')
    }

    return (
            <div className="h-[50px] bg-[#fff6e0] fixed z-30 flex flex-row border-y-[lightgrey] border-t border-solid border-b top-0 inset-x-0">
                <div className='flex flex-row absolute left-0 h-full'>
                    <TopMenuItem title="Home" pageRef='/'/>
                    <div className='text-gray-400 flex h-full items-center font-extralight'>|</div>
                    <TopMenuItem title="Shops" pageRef='/shops'/>
                </div>
                <div className='flex flex-row absolute right-0 h-full'>
                {
                    user? 
                    <>
                        <TopMenuItem title="My Booking" pageRef='/mybooking'/>
                        <div className='flex items-center h-full px-2 text-center text-[11pt] text-[grey] my-auto font-mono'>
                            {user.name} |
                        </div>
                        <div className='flex items-center h-full px-2 text-center text-[11pt] text-[grey] my-auto font-mono hover:font-bold cursor-pointer' onClick={signOut}>
                            Sign-Out
                        </div>
                    </> 
                    :<>
                        <Link href="/register"><div className='flex items-center h-full px-2 text-center text-[11pt] text-[grey] my-auto font-mono hover:font-bold'>Register</div></Link>
                        <div className='text-gray-400 flex h-full items-center font-extralight'>|</div>
                        <Link href="/login"><div className='flex items-center h-full px-2 text-center text-[11pt] text-[grey] my-auto font-mono hover:font-bold'>Login</div></Link>
                    </>
                }
                </div>
            </div>
    );
}