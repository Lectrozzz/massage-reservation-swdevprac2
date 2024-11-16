export default async function getUserProfile(token:string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/me",{
        method:"GET",
        headers: {
            "Authorization":`Bearer ${token}`,
        }
        })
    if(!response.ok) {
        throw new Error("Cannot get user profile")
    }
    const data = await response.json()
    console.log("user data", data.data)
    return data.data
}