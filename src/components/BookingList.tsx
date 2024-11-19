"use client"
import useUserStore from "@/hooks/useUser"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import getBookings from "@/libs/bookings/getBookings"
import { Button, Checkbox, FormControl,InputLabel,ListItemText,ListSubheader,MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material"
import { BookingItem} from "../../interfaces"
import FilterModal from "./FilterModal"

export default function BookingList() {
    const [bookItems, setBookItems] = useState<BookingItem[]>([])
    const [originalBookItems, setOriginalBookItems] = useState<BookingItem[]>([])
    const [minuteList, setMinuteList] = useState<string[]>(['60','90','120']); 
    const [sort, setSort] = useState<string>("none")
    const {user,token} = useUserStore()
    const myID = user?.id
    const user_name = user?.name
    const minutes = ["60","90","120"]
    const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false)
    
    const handleOption = (event: SelectChangeEvent<typeof minuteList>) => {
        const {
            target: { value},
        } = event;
        setMinuteList(
            typeof value === 'string' ? value.split(',') : value,
        )
    }
    const retrieveBookings = async () => { 
        if (!token) 
            return
        const booking = await getBookings(token)
        console.log(booking)
        setOriginalBookItems(booking)
        setBookItems(booking) 
            }
    useEffect(() =>{
        retrieveBookings()
        console.log()
    },[token])

    const sortBookItems = (option: string) => {
        if (bookItems.length === 0){
            setBookItems([])
        }
        else if(option === "none"){
            setBookItems(originalBookItems)
        }
        else if(option === "ascendingDate"){
            const sortedbookItems = [...bookItems].sort((a: BookingItem, b: BookingItem) => {
                const aDate = new Date(a.bookingDate)
                const bDate = new Date(b.bookingDate)
                if (aDate > bDate) return 1
                if (aDate < bDate) return -1
                return 0
            })
            setBookItems(sortedbookItems)
        }
        else if(option === "descendingDate"){
            const sortedbookItems = [...bookItems].sort((a: BookingItem, b: BookingItem) => {
                const aDate = new Date(a.bookingDate)
                const bDate = new Date(b.bookingDate)
                if (aDate > bDate) return -1
                if (aDate < bDate) return 1
                return 0
            })
            setBookItems(sortedbookItems)
        }
        else if(option === "ascendingService"){
            const sortedbookItems = [...bookItems].sort((a: BookingItem, b: BookingItem) => {
                return a.serviceMinute - b.serviceMinute
            })
            setBookItems(sortedbookItems)
        }
        else if(option === "descendingService"){
            const sortedbookItems = [...bookItems].sort((a: BookingItem, b: BookingItem) => {
                return b.serviceMinute - a.serviceMinute
            })
            setBookItems(sortedbookItems)
        }
        setSort(option)
    }
    const filterBooking = (minuteList: string[]) => {
        if (minuteList.length === 0){
            setBookItems(originalBookItems)
        }
        else if(minuteList.includes("Default")){
            setBookItems(originalBookItems)
        }
        else{
            const filteredBookItems = originalBookItems.filter((bookItem) => minuteList.includes(bookItem.serviceMinute.toString()))
            setBookItems(filteredBookItems)
        }
        setIsFilterModalOpen(false)
    }
    
    return (
        <div>
            <FilterModal isOpen= {isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} handler={filterBooking} text={"Select your filter"} />
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Reservations</div>
            <div className="flex w-full justify-end p-5">
            <FormControl>
                            <InputLabel>Sort</InputLabel>
                            <Select
                                labelId="sort"
                                id="sort"
                                value={sort}
                                variant="outlined"
                                label="Sort"
                                onChange={(e: SelectChangeEvent) => {sortBookItems(e.target.value)}}
                            >
                                <MenuItem value={"none"}>Default Ordering</MenuItem>
                                <MenuItem value={"ascendingDate"}>Date, Ascending</MenuItem>
                                <MenuItem value={"descendingDate"}>Date, Descending</MenuItem>
                                <MenuItem value={"ascendingService"}>Service Duration, ascending</MenuItem>
                                <MenuItem value={"descendingService"}>Service Duration, descending</MenuItem>
                            </Select>
                        </FormControl>
                        <Button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white border font-extralight
            hover:font-semibold py-2 px-2 m-2 rounded hover:to-[#bcdd15] self-end w-[10%]'
            onClick={()=>{setIsFilterModalOpen(true)}} style={{textShadow: "1px 1px 1px black"}}>
                Filter Options
            </Button>
            </div>
                <div className="">
                {
                    bookItems.length !== 0 ?
                    bookItems.map((bookItem)=>(
                        <div className="bg-gradient-to-br from-[#B5BF46] to-[#D3D989] rounded px-5 mx-5 py-5 my-5 space-y-2 justify-start drop-shadow"
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
            </div>
    );
}