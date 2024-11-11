'use client'
import Card from "./Card"
import { useReducer, useState, useEffect } from "react"
import Link from "next/link"
import getHospitals from "@/libs/getHospitals"
import { HospitalItem } from "../../interfaces"

export default function CardPanel() {
    const [hospitalResponse, setHospitalResponse] = useState<any>(null)

    useEffect(()=> {
        const fetchData = async () => {
            const hospitals = await getHospitals()
            setHospitalResponse(hospitals)
        }
        fetchData()
    }, [])

    const ratingReducer =  (ratingList: Map<string, number>, action:{type:string, hospitalName:string, rating:number} )=>{
        switch(action.type){
            case 'add': {
                if (action.rating == null) action.rating = 0;
                ratingList.set(action.hospitalName,action.rating)
                return new Map(ratingList)
            }
            case 'remove' :{
                ratingList.delete(action.hospitalName)
                return new Map(ratingList)
            }
            default: return ratingList
        }
    }

    const [ ratingList, dispatchRating ] = useReducer(ratingReducer, new Map<string,number>(
        [["Chulalongkorn Hospital",0],["Rajavithi Hospital",0],["Thammasat University Hospital",0]]))

        /*
    const mockHospitalRepo = [
        {hid: "001", name: "Chulalongkorn Hospital", image: "/img/chula.jpg"},
        {hid: "002", name: "Rajavithi Hospital", image: "/img/rajavithi.jpg"},
        {hid: "003", name: "Thammasat University Hospital", image: "/img/thammasat.jpg"}
    ]*/
    if (!hospitalResponse) return (<p>Hospital Panel is Loading ...</p>)

    return (
    <div>
        <div className="flex flex-row flex-wrap justify-around content-around m-5">
            {
                hospitalResponse.data.map((hospitalItem:HospitalItem)=>(
                    <Link href={`/hospital/${hospitalItem.id}`} className="w-1/4">
                    <Card hospitalName={hospitalItem.name} imgSrc={hospitalItem.picture} 
            onRate={(hospital:string,value:number) =>dispatchRating({type:'add',hospitalName:hospital,rating:value})}
            />
            </Link>
                ))
            }
        </div>
        <div className="bg-white text-[#59260B] bg-opacity-35">
            <div className="ml-[5px] mb-[10px] pt-[10px] w-full text-2xl font-serif">Hospital List with Ratings: { ratingList.size }</div>
            <div>
            {Array.from(ratingList).map( ([hospital,rating])=><div data-testid={hospital} key={hospital}
            className="cursor-pointer pt-[10px] pb-[10px] mx-[8px] pl-[4px] mb-[3px] bg-white bg-opacity-80 border-double border-b-[4px] rounded-lg"
            onMouseOver={(e)=>e.currentTarget.classList.remove("bg-opacity-80")}
            onMouseOut={(e)=>e.currentTarget.classList.add("bg-opacity-80")}
            onClick={()=>dispatchRating({type:"remove", hospitalName:hospital, rating:0})}
            >{hospital}: {rating}</div>)}
            </div>
        </div>
    </div>
    )
}