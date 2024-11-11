import Link from 'next/link';

export default function TopMenuItem({title,pageRef} : {title:string, pageRef:string}) {
    return (
            <Link href = {pageRef} className="w-[120px] text-center text-[10pt] text-[grey] my-auto font-mono hover:font-bold">
                {title}
            </Link>
    );
}