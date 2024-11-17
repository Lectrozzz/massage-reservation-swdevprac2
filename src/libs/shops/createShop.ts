type UpdateShopData = {
    name: string,
    address: string,
    priceLevel: number,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
}

type param = {
    shopData: UpdateShopData
    token: string
}

export default async function createShop({shopData, token}: param) {
    
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/shops",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`,
        },
        body: JSON.stringify(shopData),
    })
    if(!response.ok){
        console.log(response)
        throw new Error("Failed to update shop")
    }
    const data = await response.json()
    return data
}