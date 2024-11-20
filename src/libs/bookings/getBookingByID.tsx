import { BookingItem } from "../../../interfaces"

export default async function getBookingByID(token:string,bid:string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/bookings/"+bid,
        {
            method:"GET",
            headers: {
                "Authorization":`Bearer ${token}`,
            }
            }
    )
    return response
}