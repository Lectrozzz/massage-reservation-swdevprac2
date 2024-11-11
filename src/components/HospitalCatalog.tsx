'use client'
import { HospitalJson, HospitalItem } from "../../interfaces"
import Card from "./Card"
import Link from "next/link"
export default async function HospitalCatalog({hospitalsJson}: {hospitalsJson:Promise<HospitalJson>}){
    const hospitalJsonReady = await hospitalsJson
    return (
        <>
        Explore {hospitalJsonReady.count} models in our catalog
        <div className="flex flex-row flex-wrap justify-around content-around m-5">
            {
                hospitalJsonReady.data.map((Hospital:HospitalItem)=>(
                    <Link href={`/hospital/${Hospital.id}`} className="w-1/4">
                    <Card hospitalName={Hospital.name} imgSrc={Hospital.picture} 
            />
            </Link>
                ))
            }
        </div>
        </>
    )
}