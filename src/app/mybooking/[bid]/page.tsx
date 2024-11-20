'use client'
import useUserStore from "@/hooks/useUser";
import dayjs, { Dayjs } from "dayjs";
import getBookingByID from "@/libs/bookings/getBookingByID";
import { useEffect, useState } from "react";
import { BookingItem } from "../../../../interfaces";
import { useRouter } from "next/navigation";
import { FormControl, Select, TextField, Button, InputLabel, MenuItem, SelectChangeEvent, CircularProgress } from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { ArrowDropDownIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import removeBookingByID from "@/libs/bookings/removeBookingByID";
import updateBookingByID from "@/libs/bookings/updateBookingByID";
import Modal from '@/components/Modal'
import 'dayjs/locale/en-gb'
import { validateBookingDate, validateServiceMinute } from "../../../../AuthFormValidation";


export default function BookingDetail( {params}: {params : {bid:string}}){

    const [bookingInfo, setBookingInfo] = useState<BookingItem>()
    const [serviceMinute,setServiceMinute] = useState<number>(60)
    const [bookingDate,setBookingDate] = useState<string>('')
    const {user,token} = useUserStore()
    const lowestBookingDate = dayjs().add(1,'day')
    const [reason, setReason] = useState<string>("You have no access to said Booking ID.")
    

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)
    const [editable, setEditable] = useState<boolean>(false)
    const [validChange, setValidChange] = useState<boolean>(false)
    const [isDateError, setIsDateError] = useState<boolean>(false)
    const [isServiceMinuteError, setIsServiceMinuteError] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

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
        if (!token){
            setReason("You have no access to said Booking ID.")
            setIsLoading(false)
            return
        }
        setIsLoading(true)
        const response = await getBookingByID(token,params.bid)
        
        if (response.status === 401 || response.status === 500)
        {
            setIsLoading(false)
            return
        }
        const data = await response.json()
        const bookingDetail = data.data
        setBookingInfo(bookingDetail)
        setBookingDate(bookingDetail.bookingDate.split('T')[0])
        
        if(validateBookingDate(bookingDate) !== '') setIsDateError(true)
        setServiceMinute(bookingDetail.serviceMinute)
        setIsLoading(false)
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
            
            router.push(`/mybooking`)
            setIsSaveModalOpen(false)
        }
    }
      
    const checkValidChange = () => {
        
        if (validateBookingDate(bookingDate) !== '') return
        
        
        if (validateServiceMinute(serviceMinute) !== '') return
        if ((bookingDate === bookingInfo?.bookingDate.split('T')[0]) 
            && (serviceMinute === bookingInfo.serviceMinute)) {
        setValidChange(false)
        return
        }
        setIsServiceMinuteError(false)
        setIsDateError(false)
        setValidChange(true)
    }
    const checkValidRetrieve = () => {
        if (!bookingInfo && token)
            setReason("Sorry, no information available.")
    }
    const router = useRouter()

    useEffect(()=> {
        getBookingDetail()
    },[token])
   
    useEffect(() =>{
        checkValidChange()
    },[bookingDate,serviceMinute])
    useEffect(() =>{
        if(!isLoading && token) checkValidRetrieve()
    },[isLoading])

    
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
                <DateField className={editable? '':'pointer-events-none'} focused={editable} variant="standard" name="Date" label="Date" 
                defaultValue ={dayjs(bookingDate)} minDate={lowestBookingDate} 
                onChange={(newValue, context)=>{
                        if (newValue && context.validationError === null) {
                            setIsDateError(false)
                            setBookingDate(newValue.add(1,'day').toISOString().split('T')[0]); 
                            return
                        }
                        setIsDateError(true)
                        }
                    } />
                {/* </div> */}
                </LocalizationProvider>
                <FormControl className="text-left">
                    <InputLabel variant="standard">Session Duration:</InputLabel>
                    <Select variant="standard" className={editable? '':'pointer-events-none'} IconComponent={editable? ArrowDropDownIcon:()=>null} value = {serviceMinute.toString()} onChange={(e: SelectChangeEvent)=>{
                        setServiceMinute(parseInt(e.target.value))
                        checkValidChange()
                        }}>
                        <MenuItem value="60">60 minutes</MenuItem>
                        <MenuItem value="90">90 minutes</MenuItem>
                        <MenuItem value="120">120 minutes</MenuItem> 
                    </Select>
                </FormControl>
                <div className="flex flex-row justify-end space-x-1">
                    <Button onClick={()=>setIsDeleteModalOpen(true)} className="bg-red-500 text-white hover:bg-red-600">Delete</Button>
                    <Button onClick={()=>setEditable(!editable)} className="bg-sky-500 text-white hover:bg-sky-600">{editable ? "Editing":"Edit"}</Button>
                    <Button disabled={!editable || isDateError || isServiceMinuteError ||!validChange} onClick={()=>setIsSaveModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white">Save</Button>
                    
                    </div>
            </FormControl>


        </div>
        :<div>{isLoading ? "Loading..." :`${reason}`}
        
        </div>}
        <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} handler={updateBookingDetail} text={"Are you sure that you want to make changes to this booking?"} />
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handler={removeBooking} text={"Are you sure that you want to delete this booking?"} />
        </main>
    )
}