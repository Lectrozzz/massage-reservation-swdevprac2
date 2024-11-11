import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from "@mui/material";

export default function Card( {hospitalName, imgSrc, onRate} : {hospitalName:string, imgSrc:string, onRate?:Function}){
    
    return (
        <InteractiveCard>
            <div className="h-[70%] w-full relative rounded-t-lg">
                <Image src ={imgSrc}
                alt="Product Picture"
                fill={true}
                objectFit='cover'
                className='object-contain rounded-t-lg'
                />
            </div>
            <div className="pl-[10px] h-[15%] p-[10px] text-[#59260B] text-xl font-serif font-thin">{hospitalName}</div>
            {
                onRate? <Rating defaultValue={0} precision={0.5} className="pl-[5px]" name={hospitalName+" Rating"} id={hospitalName+" Rating"} data-testid = {hospitalName+" Rating"}
                onChange={(e,newValue)=>{e.stopPropagation(); onRate(hospitalName,newValue)}} onClick = {(e)=>{e.stopPropagation();}}/> : ''
            }
        </InteractiveCard>
    );
}