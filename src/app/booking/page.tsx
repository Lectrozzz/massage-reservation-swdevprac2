"use client"
import DateReserve from "@/components/DateReserve"
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useState } from "react"
import dayjs, { Dayjs} from "dayjs"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { BookingItem } from "../../../interfaces"
import { addBooking } from "@/redux/features/bookSlice"

export default function Booking(){
    const [date, setDate] = useState<Dayjs|null>(null)
    const [name, setName] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [hospital, setHospital] = useState<string>('')


    const dispatch = useDispatch<AppDispatch>()

    const makeBooking = () => {
        if(date && name !== '' && id !== '' && lastName !== '' && hospital !== '') {
            const item:BookingItem = {
                name: name,
                surname: lastName,
                id: id,
                hospital: hospital,
                bookDate: dayjs(date).format("YYYY/MM/DD")
            }
            console.log(item)
            dispatch(addBooking(item))
        }
    }
    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-xl font-medium items-center mt-5">Vaccine Booking</div>
            <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-5 flex flex-auto flex-col justify-center mx-auto">
                <FormControl className="w-auto flex space-y-3 flex-col">
                    <TextField variant="standard" name="Name" label="Name" onChange={(e)=>{setName(e.target.value)}}/>
                    <TextField variant="standard" name="Lastname" label="Lastname" onChange={(e)=>{setLastName(e.target.value)}}/>
                    <TextField variant="standard" name="Citizen ID" label="Citizen ID" onChange={(e)=>{setId(e.target.value)}}/>
                    <FormControl>
                        <InputLabel className="-left-[14px]">Hospital</InputLabel>
                        <Select variant="standard" id="hospital" label="Hospital" onChange={(e: SelectChangeEvent)=>{setHospital(e.target.value)}}>
                            <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                            <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                            <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
                        </Select>
                    </FormControl>
                    <DateReserve onDateChange={(value:Dayjs)=>{setDate(value)}}/>
                    <Button name="Book Vaccine" className="p-2 text-white rounded-lg bg-gradient-to-l from-purple-400 to-pink-500 hover:from-blue-500 hover:to-indigo-500" onClick={()=>makeBooking()}>Book Vaccine</Button>
                </FormControl>
            </div>
        </main>
    )
}