"use client"
import { useDispatch } from "react-redux"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { Button } from "@mui/material"
import { removeBooking } from "@/redux/features/bookSlice"

export default function BookingList() {

    const bookItems = useAppSelector( (state)=> state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()

    if (bookItems.length === 0 ) return (<div className="text-center text-[15pt] text-[#002977]">No Vaccine Booking</div>)
    return (
        <>
        {
            bookItems.map((bookItem)=>(
                <div className="bg-gradient-to-l from-blue-500 rounded px-5 mx-5 py-2 my-2"
                    key={bookItem.id}>
                        <div className="text-xl">{bookItem.name} {bookItem.surname}</div>
                        <div className="text-sm">Citizen ID: {bookItem.id}</div>
                        <div className="text-sm">Hospital: {bookItem.hospital}</div>
                        <div className="text-sm">Date: {bookItem.bookDate}</div>
                        <Button name="Book Vaccine" className="p-2 text-white rounded-lg bg-gradient-to-l from-purple-400 to-pink-500 hover:from-blue-500 hover:to-indigo-500" 
                        onClick={()=> dispatch(removeBooking(bookItem.id))}>Cancel Booking</Button>
                </div>
            ))
        }
        </>
    )
}