'use client'
import useUserStore from "@/hooks/useUser";
import dayjs, { Dayjs } from "dayjs";
import getBookingByID from "@/libs/bookings/getBookingByID";
import { useEffect, useState } from "react";
import { BookingItem } from "../../../../interfaces";
import { useRouter } from "next/navigation";
import { FormControl, Select, TextField, Button, InputLabel, MenuItem, SelectChangeEvent, CircularProgress } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import removeBookingByID from "@/libs/bookings/removeBookingByID";
import updateBookingByID from "@/libs/bookings/updateBookingByID";
import Modal from '@/components/Modal'
import 'dayjs/locale/en-gb'

export default function BookingDetail( {params}: {params : {bid:string}}){

    const [bookingInfo, setBookingInfo] = useState<BookingItem>()
    const [editable, setEditable] = useState(false)
    const [serviceMinute,setServiceMinute] = useState(60)
    const [bookingDate,setBookingDate] = useState<string>('')
    const [dayJSdate, setDayJSDate] = useState<Dayjs>()
    const {user,token} = useUserStore()

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)

    const removeBooking = async() => {
        if (!token) return
        if (bookingInfo) 
        try {
            setIsDeleteModalOpen(false)
            await removeBookingByID(token,bookingInfo?._id)
            router.push("/mybooking")
        } catch (error) {
            console.error(error)
        }
        return
    }
    const getBookingDetail = async () => {
        if (!token) return
        const bookingDetail = await getBookingByID(token,params.bid)
        setBookingInfo(bookingDetail)
        setBookingDate(bookingDetail.bookingDate)
        setServiceMinute(bookingDetail.serviceMinute)
    }
    const updateBookingDetail = async () => {
        if (!token) return
        if (bookingInfo && bookingDate){
            const toSendBookingDate = bookingDate.split('T')[0]
            const toSendCreatedAt = bookingInfo.createdAt.split('T')[0]
            const booking = {
                bookingDate: toSendBookingDate,
                serviceMinute: serviceMinute,
                createdAt: toSendCreatedAt
            }
            const updateDetail = await updateBookingByID(token,bookingInfo?._id,booking)
            console.log(updateDetail)
            router.push(`/mybooking`)
            setIsSaveModalOpen(false)
        }
    }
    const router = useRouter()

    useEffect(() =>{
        getBookingDetail()
        console.log(bookingInfo)
    },[token])
    if (!token)
        return (
            <main className="text-center p-5 ">
                <div>No Authorization</div>
            </main>
        )
    return (
        <main className="flex flex-col text-center p-5 justify-center items-center">
            <div className="text-3xl font-semibold mb-5 drop-shadow-md">Booking Info</div>
        {bookingInfo? 
        
        <div className="bg-gradient-to-br from-[#a2ab45] to-[#D3D989] rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-7 flex flex-col justify-center mx-auto drop-shadow-xl">

            <FormControl className="text-white w-auto space-y-2">
                <div className="text-2xl font-bold pb-5 d">{bookingInfo.shop.name}</div>
                <TextField variant="standard" className="text-sm pointer-events-none" name="Name" label="Name" value={user?.name}/>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                {/* <div className="flex w-full"> */}
                    {/* <CircularProgress className="absolute right-0"/> */}
                <DateField className={"w-full " + editable? '':'pointer-events-none'} variant="standard" name="Date" label="Date" defaultValue ={dayjs(bookingDate)} value={dayJSdate} onChange={(newValue)=>
                    {if (newValue) 
                    {
                        setBookingDate(newValue.toISOString());
                        setDayJSDate(newValue)
                    }
                     console.log(newValue?.toISOString())}}/>
                {/* </div> */}
                </LocalizationProvider>
                <FormControl className="text-left">
                    <InputLabel variant="standard">Session Duration:</InputLabel>
                    <Select variant="standard" className={editable? '':'pointer-events-none'} value = {serviceMinute.toString()} onChange={(e: SelectChangeEvent)=>{setServiceMinute(parseInt(e.target.value)); console.log(serviceMinute)}}>
                        <MenuItem value="60">60 minutes</MenuItem>
                        <MenuItem value="90">90 minutes</MenuItem>
                        <MenuItem value="120">120 minutes</MenuItem> 
                    </Select>
                </FormControl>
                <div className="flex flex-row justify-end space-x-1">
                    <Button onClick={()=>setIsDeleteModalOpen(true)} className="bg-red-500 text-white">Delete</Button>
                    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handler={removeBooking} text={"Are you sure that you want to delete this booking?"} />
                    <Button onClick={()=>setEditable(!editable)} className="bg-sky-500 text-white">{editable ? "Editing":"Edit"}</Button>
                    <Button disabled={!editable} onClick={()=>setIsSaveModalOpen(true)} className="bg-green-300">Save</Button>
                    <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} handler={updateBookingDetail} text={"Are you sure that you want to make changes to this booking?"} />
                    </div>
            </FormControl>


        </div>
        :<div>Sorry, there is currently no booking information available for this ID.</div>}
        </main>
    )
}