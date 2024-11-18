"use client"
import useUserStore from "@/hooks/useUser"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import getBookings from "@/libs/bookings/getBookings"
import { Button, Link } from "@mui/material"
import { removeBooking } from "@/redux/features/bookSlice"
import { BookingItem, PageStatus } from "../../interfaces"

export default function BookingList() {
    const [bookItems, setItems] = useState<BookingItem[]>([])
    const {user,token} = useUserStore()
    const myID = user?.id
    const user_name = user?.name
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
    
    return (
        
        <div>
        <div className="text-center text-4xl m-5 font-semibold drop-shadow">Reservations</div>
        {
            bookItems.length !== 0 ?
            bookItems.map((bookItem)=>(
                <div className="bg-gradient-to-br from-[#B5BF46] to-[#D3D989] rounded px-5 mx-5 py-3 my-2 space-y-2 justify-start drop-shadow"
                    key={bookItem._id}>
                        <div className="text-xl">{`${bookItem.shop.name} (${bookItem.serviceMinute} minutes)`}</div>
                        { user?.role === "admin" ?
                        <div className="text-m">{bookItem.user === myID ?`This is your reservation, ${user_name}`
                        :`This belongs to User ID: ${bookItem.user}`}</div>
                        :<div className="text-m">Name: {user_name}</div>
                        }
                        <div className="text-xl">Date: {dayjs(bookItem.bookingDate).format("YYYY/MM/DD")}</div>
                        <Button href={`/mybooking/${bookItem._id}`} className="text-sm text-white w-1/5 bg-[#668a40] hover:bg-[#416021]">Manage Booking</Button>
                </div>
            ))
        :<div className="text-center text-4xl text-black m-5 font-thin">No Reservation</div>}
        </div>
    );
}