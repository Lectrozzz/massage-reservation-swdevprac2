import styles from './topmenu.module.css'
import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { Link } from '@mui/material';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function TopMenu() {
    const session = await getServerSession(authOptions)

    return (
            <div className="h-[50px] bg-[white] fixed z-30 flex flex-row-reverse border-y-[lightgrey] border-t border-solid border-b top-0 inset-x-0">
                <Image src={'/img/logo.png'} className={styles.logoimg} alt="logo" width={0} height={0} sizes='100vh'/>
                <TopMenuItem title="Booking" pageRef='/booking'/>
                <div className='flex flex-row absolute left-0 h-full'>
                {
                    session? <Link href="/api/auth/signout">
                        <div className='flex items-center h-full px-2 text-center text-[10pt] text-[grey] my-auto font-mono hover:font-bold'>
                        {session.user?.name} | Sign-Out </div></Link>
                    :<Link href="/api/auth/signin"><div className='flex items-center h-full px-2 text-center text-[10pt] text-[grey] my-auto font-mono hover:font-bold'>Sign-In</div></Link>
                }
                <TopMenuItem title="My Booking" pageRef='/mybooking'/>
                </div>
            </div>
    );
}