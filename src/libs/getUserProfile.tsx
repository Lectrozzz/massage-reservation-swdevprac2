export default async function getUserProfile(token:string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/auth/me",{
        method:"GET",
        headers: {
            "Authorization":`Bearer ${token}`,
        }
        })
    const data = await response.json()
    
    return data.data
}