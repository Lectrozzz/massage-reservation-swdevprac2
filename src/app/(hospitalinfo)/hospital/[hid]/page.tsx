import getHospital from "@/libs/getHospital";
import Image from "next/image";
export default async function HospitalDetailPage( {params} : {params : {hid:string}}) {

    const hospitalDetail = await getHospital(params.hid)
    
    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium" >{hospitalDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={hospitalDetail.data.picture} alt="Hospital Image"
                width={0}
                height={0} sizes="100vw" className="rounded-lg w-[30%]"/>
                <div className="text-left">
                <div className="text-md mx-5">{hospitalDetail.data.name}</div>
                <div className="text-md mx-5">Address: {hospitalDetail.data.address}</div>
                <div className="text-md mx-5">District: {hospitalDetail.data.district}</div>
                <div className="text-md mx-5">Province: {hospitalDetail.data.province}</div>
                <div className="text-md mx-5">Postal Code: {hospitalDetail.data.postalcode}</div>
                <div className="text-md mx-5">Telephone Number: {hospitalDetail.data.tel}</div>
                </div>
            </div>
        </main>
    )
}