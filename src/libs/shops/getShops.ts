export default async function getShops(){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/shops",{
        method:"GET",
    })
    if(!response.ok){
        throw new Error("Cannot get shops")
    }
    const data = await response.json()
    console.log("shops data", data.data)
    return data.data
}