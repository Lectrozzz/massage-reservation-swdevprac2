"use client"
import useUserStore from "@/hooks/useUser"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import getBookings from "@/libs/getBookings"
import { Button, Link } from "@mui/material"
import { removeBooking } from "@/redux/features/bookSlice"
import { BookingItem, PageStatus } from "../../interfaces"

export default function BookingList() {
    const [bookItems, setItems] = useState<BookingItem[]>([])
    const {user,token} = useUserStore()
    console.log("token",token)
    console.log("user",user)
    const retrieveBookings = async () => { 
        if (!token) 
            return
        const booking = await getBookings(token)
        console.log(booking)
        setItems(booking) 
            }
    useEffect(() =>{
        retrieveBookings()
        console.log()
    },[token])
    
    if (bookItems.length === 0 ) return (<div className="text-center text-[15pt]">No Reservation</div>)
    return (
        
        <div>
        <div className="text-center text-2xl">Reservations</div>
        {
            bookItems.map((bookItem)=>(
                <div className="bg-gradient-to-r from-blue-500 rounded px-5 mx-5 py-2 my-2 space-y-1 hover:to-blue-300"
                    key={bookItem._id}>
                        <div className="text-xl">Shop: {bookItem.shop.name}</div>
                        <div className="text-xl">Date: {dayjs(bookItem.bookingDate).format("YYYY/MM/DD hh:mm")}</div>
                        <div className="text-m">Name: {user?.name}</div>
                        <div className="text-m">Session Duration: {bookItem.serviceMinute} minutes</div>
                        <Link href={`/mybooking/${bookItem._id}`} className="text-sm text-white w-1/4">Manage Booking</Link>
                </div>
            ))
        }
        </div>
    );
}