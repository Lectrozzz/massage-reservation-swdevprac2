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
import { validateBookingDate, validateServiceMinute } from "../../../../../AuthFormValidation";

const createBookingPage = () => {
    const params = useParams<{sid: string}>()
    const { user, token } = useUserStore();
    const router = useRouter()
    const lowestBookingDate = dayjs().add(1,'day')

    const shopId = params.sid;
    const userId = user?.id;
    const [serviceMinute,setServiceMinute] = useState<number>(60)
    const [bookingDate, setBookingDate] = useState<string>(dayjs().add(1,'day').toISOString().split('T')[0])
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [isDateError, setIsDateError] = useState<boolean> (false)
    const [isServiceMinuteError, setIsServiceMinuteError] = useState<boolean>(false)

    const createBookingHandler = async () => {
        if(!token) return
        if (validateBookingDate(bookingDate) !== '') return
        if (!checkValidBooking()) return
        const bookData = {
            bookingDate: bookingDate,
            serviceMinute: serviceMinute,
            createdAt: dayjs().toISOString().split('T')[0]
        }
       
        const response = await createBooking({bookData, token, sid:shopId})
       
        if (response.status === 400 || response.status === 404){
            setIsCreateModalOpen(false)
            setShowError(true)
            setErrorMessage(response.status === 400? "You already created 3 bookings.": "That shop doesn't exist anymore.")
            return
        }
        router.push(`/mybooking`)
    }

    const checkValidBooking = async () => {
        if (validateBookingDate(bookingDate) !== '') return false
        
        if (validateServiceMinute(serviceMinute) !== '') return
        
        setIsServiceMinuteError(false)
        setIsDateError(false)
        return true
    }

    if (!user) {
        router.push('/login')
        return null
    }

    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Create Booking</div>
            <FormControl className = "w-2/5 bg-gradient-to-br from-[#a2ab45] to-[#D3D989] rounded-lg space-y-2 m-5 p-4">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DateField variant="standard" name="Date" label="Date" defaultValue ={dayjs(bookingDate)} minDate={lowestBookingDate} onChange={(newValue, context)=>{
                    if (newValue && context.validationError === null) {
                        setBookingDate(newValue.add(1,'day').toISOString().split('T')[0]); 
                        setIsDateError(false)
                        return
                    }
                    setIsDateError(true)
                    }
                    } />
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
                    <Button className="bg-sky-500 text-white" disabled ={isDateError} onClick={()=>{setIsCreateModalOpen(true)}}>Create Booking</Button>
                    <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} 
                    handler={createBookingHandler} text={"Are you sure that you want to create booking with this information?"} />
                </div>
            </FormControl>
        </main>
    );
}

export default createBookingPage;