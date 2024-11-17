'use client'

import useUserStore from "@/hooks/useUser";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import 'dayjs/locale/en-gb'
import createBooking from "@/libs/bookings/createBooking";
import Modal from "@/components/Modal";
import ErrorModal from "@/components/ErrorModal";

const createBookingPage = () => {
    const params = useParams<{sid: string}>()
    const { user, token } = useUserStore();
    const router = useRouter()

    const shopId = params.sid;
    const userId = user?.id;
    const [serviceMinute,setServiceMinute] = useState<number>(60)
    const [bookingDate, setBookingDate] = useState<string>(dayjs().toISOString().split('T')[0])
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

    const createBookingHandler = async () => {
        if(!token) return
        const bookData = {
            bookingDate: bookingDate,
            serviceMinute: serviceMinute,
            createdAt: dayjs().toISOString().split('T')[0]
        }
        console.log("Create Booking")
        const response = await createBooking({bookData, token, sid:shopId})
        console.log(response.status)
        if (response.status === 400 || response.status === 404){
            setIsCreateModalOpen(false)
            setShowError(true)
            setErrorMessage(response.status === 400? "You already created 3 bookings.": "That shop doesn't exist anymore.")
            return
        }
        router.push(`/mybooking`)
    }
    // TODO: Implement the create booking form here. Goodluck :D
    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            <h1 className="text-black font-semibold text-2xl mt-8">Create Booking</h1>
            <FormControl className = "w-2/5 bg-white rounded-lg space-y-2 m-5 p-4">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DateField variant="standard" name="Date" label="Date" defaultValue ={dayjs()} onChange={(newValue)=>{
                    if (newValue) setBookingDate(newValue.toISOString().split('T')[0])}
                    
                     }/>
                </LocalizationProvider>
                <FormControl className="text-left">
                    <InputLabel variant="standard">Session Duration:</InputLabel>
                    <Select variant="standard" value = {serviceMinute.toString()} onChange={(e: SelectChangeEvent)=>setServiceMinute(parseInt(e.target.value))}>
                        <MenuItem value="60">60 minutes</MenuItem>
                        <MenuItem value="90">90 minutes</MenuItem>
                        <MenuItem value="120">120 minutes</MenuItem> 
                    </Select>
                </FormControl>
                <div className='absolute right-0 bg-white-200'>
                            {showError ? <ErrorModal isOpen={showError} onClose={()=>setShowError(false)} text={errorMessage}/> : null}
                        </div>
                <div className="justify-end flex">
                    <Button className="bg-sky-500 text-white" onClick={()=>setIsCreateModalOpen(true)}>Create Booking</Button>
                    <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} 
                    handler={createBookingHandler} text={"Are you sure that you want to create booking with this information?"} />
                </div>
            </FormControl>
        </main>
    );
}

export default createBookingPage;