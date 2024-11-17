'use client';

import useShopList from "@/hooks/useShopList";
import getShops from "@/libs/shops/getShops";
import { useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useRouter } from "next/navigation";

const shopItem = (shop: any) => {
    //validate picture url or file path
    const regex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/
    const pictureUrl = (regex.test(shop.picture)) ? shop.picture : '/img/default_shop.jpg'
    console.log("picture url",pictureUrl)
    return (
        <div key={shop.id} className="bg-pink-200 rounded-lg space-x-5 space-y-2 w-full px-5 py-5 flex flex-auto flex-col justify-center mx-auto">
            <div>
                <Image
                src={pictureUrl}
                width={300}
                height={300}
                alt="Default picture for massage shop"
                />
            </div>
            <div className="w-full flex justify-start">
                <div className="text-black">
                    <Link href={`/shops/${shop.id}`}className="text-xl font-semibold text-br hover:text-gray-700">{shop.name}</Link>
                    <div>Level: {shop.priceLevel}</div>
                    <div>{shop.tel}</div>
                </div>
            </div>
        </div>
    )
}

const shopsPage = () => {
    const { shops, setShops } = useShopList()
    const router = useRouter()

    const createShopHandler = () => {
        console.log("Create shop")
        router.push(`/createshop`)
    }

    const fetchData = async () => {
        const shopData = await getShops()
        const shops = shopData.map((shop: any) => {
            return {
                id: shop._id,
                name: shop.name,
                priceLevel: shop.priceLevel,
                address: shop.address,
                province: shop.province,
                postalcode: shop.postalcode,
                tel: shop.tel,
                picture: shop.picture,
            }
        })
        setShops(shops)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main className="w-[50%] flex flex-col mx-auto items-center mt-4">
            <h1 className="text-black font-semibold text-2xl mt-4">Shops</h1>
            <div className="text-black my-4">You can find various massage shops here.</div>
            <div className="flex w-full justify-between mt-4">
                <div className="text-black">
                    Total Shops: {shops.length}
                </div>
                <div>
                    <Button className='bg-sky-500 hover:bg-sky-400 text-white' onClick={createShopHandler}>Reserve</Button>
                </div>
            </div>
            <div className="flex flex-row gap-6 mt-4">
                {shops.map((shop) => shopItem(shop))}
            </div>
        </main>
    );
}

export default shopsPage;