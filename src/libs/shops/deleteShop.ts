export default async function deleteShop(shopId: string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/shops/" + shopId,{
        method:"DELETE",
    })
    if(!response.ok){
        throw new Error("Cannot delete shop")
    }
    const data = await response.json()
    console.log("shop data", data.data)
    return data.data
}