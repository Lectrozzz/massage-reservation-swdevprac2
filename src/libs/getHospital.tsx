export default async function getHospital(id:string){
    const response = await fetch(`https://swdevprac2-backend-henna.vercel.app/api/v1/hospitals/${id}`)
    if (!response.ok) {
        throw new Error("Failed to fetch Hospitals")
    }
    return await response.json()
}