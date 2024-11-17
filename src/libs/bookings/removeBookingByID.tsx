export default async function removeBookingByID(token:string,id:string) {
const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/bookings/"+id,
    {
        method:"DELETE",
        headers: {
            "Authorization":`Bearer ${token}`,
        }
        }
)
if (!response.ok) {
    throw new Error("Booking was not found for deletion")
}

const data = await response.json()
return data.success
}