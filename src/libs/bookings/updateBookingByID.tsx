type Booking = {
    bookingDate: string,
    serviceMinute: number,
    createdAt: string
}

export default async function updateBookingByID(token:string,id:string,bookingData:Booking) {
    console.log(JSON.stringify(bookingData))
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/bookings/"+id,
        {
            method:"PUT",
            headers: {
                "Authorization":`Bearer ${token}`,
                "Content-Type":"application/json",
            },
            body: JSON.stringify(bookingData)
            }
    )
    if (!response.ok) {
        throw new Error("Booking was not found for update")
    }
    console.log(response)
    const data = await response.json()
    console.log("booking data", data.data)
    return data.data
    }