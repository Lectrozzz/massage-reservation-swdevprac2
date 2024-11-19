'use client';

import useShopList from "@/hooks/useShopList";
import getShops from "@/libs/shops/getShops";
import { useEffect } from "react";
import Image from 'next/image'
import Link from "next/link";
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useRouter } from "next/navigation";
import useUserStore from "@/hooks/useUser";

const shopItem = (shop: any) => {
    //validate picture url or file path
    const regex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/
    const pictureUrl = (regex.test(shop.picture)) ? shop.picture : '/img/default_shop.jpg'
    console.log("picture url",pictureUrl)
    return (
        <div key={shop.id} className="bg-gradient-to-br from-[#a2ab45] to-[#D3D989] rounded-lg w-full px-5 py-5 flex flex-auto flex-col justify-center mx-auto">
            <div>
                <Link href={`/shops/${shop.id}`}>
                    <Image
                    src={pictureUrl}
                    width={300}
                    height={300}
                    alt="Default picture for massage shop"
                    />
                </Link>
            </div>
            <div className="w-full flex justify-start mt-2">
                <div className="">
                    <Link href={`/shops/${shop.id}`}className="text-xl font-semibold text-br hover:text-gray-100">{shop.name}</Link>
                    <div>Price Level: {shop.priceLevel}</div>
                    <div>Tel: {shop.tel}</div>
                </div>
            </div>
        </div>
    )
}

const shopsPage = () => {
    const { shops, setShops } = useShopList()
    const {user} = useUserStore()
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
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Shops</div>
            <div className= "my-3 text-lg">You can find various massage shops here.</div>
            <div className="flex w-full justify-between mt-4 items-center">
                <div className="text-lg font-medium drop-shadow-sm">
                    Total Shops: {shops.length}
                </div>
                <div>
                    {
                        user?.role === "admin" ? <button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white border 
                        font-semibold py-2 px-4 m-2 rounded hover:to-[#bcdd15]'
                        onClick={createShopHandler}>
                            Create
                        </button> : null
                    }
                </div>
            </div>
            { shops.length === 0 ? 
                <div className="text-center text-2xl text-black m-5 font-thin">No Shop Available</div> :
                <div className="grid grid-cols-3 gap-3 w-full mt-4 px-5">
                    {shops.map((shop) => shopItem(shop))}
                </div>
            }
        </main>
    );
}

export default shopsPage;