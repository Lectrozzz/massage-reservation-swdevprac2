export default async function getUserProfile(token:string){
    const response = await fetch(process.env.BACKEND_URL + "/api/v1/auth/me",{
        method:"GET",
        headers: {
            "Authorization":`Bearer ${token}`,
        }
        })
    if(!response.ok) {
        throw new Error("Cannot get user profile")
    }
    const data = await response.json()
    return data
}