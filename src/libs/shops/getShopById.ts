export default async function getShops(shopId: string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/shops/" + shopId,{
        method:"GET",
    })
    if(!response.ok){
        throw new Error("Cannot get shops")
    }
    const data = await response.json()
    return data.data
}