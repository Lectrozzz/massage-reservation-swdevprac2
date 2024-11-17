type CreateBookingData = {
    bookingDate: string,
    serviceMinute: number,
    createdAt: string
}

type param = {
    bookData: CreateBookingData
    token: string
    sid: string
}

export default async function createBooking({bookData, token, sid}: param) {
    
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/shops/"+sid+"/bookings",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
    })
    return response
}