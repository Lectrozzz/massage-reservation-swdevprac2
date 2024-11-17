import { BookingItem } from "../../../interfaces"

export default async function getBookings(token:string):Promise<BookingItem[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/bookings",
        {
            method:"GET",
            headers: {
                "Authorization":`Bearer ${token}`,
            }
            }
    )
    if (!response.ok) {
        throw new Error("Cannot get bookings")
    }

    const data = await response.json()
    console.log("booking data", data.data)
    return data.data
}