export default async function deleteShop(shopId: string, token: string){
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/v1/shops/" + shopId,{
        method:"DELETE",
        headers: {
            "Authorization":`Bearer ${token}`,
        }
    })
    if(!response.ok){
        throw new Error("Cannot delete shop")
    }
    const data = await response.json()
    return data.data
}