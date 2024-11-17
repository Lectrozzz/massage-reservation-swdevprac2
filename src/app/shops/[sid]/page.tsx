'use client'
 
import getShopById from '@/libs/shops/getShopById'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteShop from '@/libs/shops/deleteShop'
import Modal from '@/components/Modal'

const shopDetailPage = () => {

    const params = useParams<{sid: string}>()
    const router = useRouter()

    const [shopName, setShopName] = useState<string>("")
    const [shopHeaderName, setShopHeaderName] = useState<string>("")
    const [shopAddress, setShopAddress] = useState<string>("")
    const [priceLevel, setPriceLevel] = useState<number>(0)
    const [province, setProvince] = useState<string>("")
    const [postalcode, setPostalcode] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [picture, setPicture] = useState<string>("")
    const [isEditable, setIsEditable] = useState<boolean>(false)

    const regex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/
    const pictureUrl = (regex.test(picture)) ? picture : '/img/default_shop.jpg'

    const createBookingHandler = () => {
        console.log("Create booking")
        router.push(`/shops/${params.sid}/booking`)
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const deleteShopHandler = async () => {
        console.log("Delete shop")
        await deleteShop(params.sid)
        router.push(`/shops`)
    }

    const fetchData = async () => {
        const shopData = await getShopById(params.sid)
        setShopName(shopData.name)
        setShopHeaderName(shopData.name)
        setShopAddress(shopData.address)
        setPriceLevel(shopData.priceLevel)
        setProvince(shopData.province)
        setPostalcode(shopData.postalcode)
        setTel(shopData.tel)
        setPicture(shopData.picture)
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            <h1 className="text-black font-semibold text-2xl mt-8">{shopHeaderName}</h1>
            <div className="w-[75%] flex flex-row items-center gap-8 bg-white p-8 rounded-lg mt-8">
                <div className='w-full'>
                    <Image
                    src={pictureUrl}
                    width={500}
                    height={500}
                    alt="Default picture for massage shop"
                    className='rounded-lg'
                    />
                </div>
                <div className='w-full'>
                    <div className='w-full'>
                        <FormControl className="w-full flex space-y-3 flex-col">
                            <TextField disabled={!isEditable} variant="standard" name="Name" label="Name" value={shopName} onChange={(e)=>{setShopName(e.target.value)}}/>
                            <TextField disabled={!isEditable} variant="standard" name="Address" label="Address" value={shopAddress} onChange={(e)=>{setShopAddress(e.target.value)}}/>
                            <FormControl>
                                <InputLabel className="-left-[14px]">Role</InputLabel>
                                <Select disabled={!isEditable} variant="standard" id="hospital" label="Hospital" value={priceLevel.toString()} required onChange={(e: SelectChangeEvent)=>{setPriceLevel(Number(e.target.value))}}>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField disabled={!isEditable} variant="standard" name="Province" label="Province" value={province} onChange={(e)=>{setProvince(e.target.value)}}/>
                            <TextField disabled={!isEditable} variant="standard" name="Postalcode" label="Postalcode" value={postalcode} onChange={(e)=>{setPostalcode(e.target.value)}}/>
                            <TextField disabled={!isEditable} variant="standard" name="Tel" label="Tel" value={tel} onChange={(e)=>{setTel(e.target.value)}}/>
                        </FormControl>
                    </div>
                    <div className='flex justify-end mt-4 gap-4'>
                        <Button className='bg-red-500 hover:bg-red-400 text-white' onClick={()=>setIsDeleteModalOpen(true)}>Delete</Button>
                        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handler={deleteShopHandler} text={"Are you sure that you want to delete this shop?"} />
                        <Button className='bg-orange-400 hover:bg-orange-300 text-white' onClick={()=>setIsEditable((isEditable)=> !isEditable)}>Edit</Button>
                        <Button disabled={!isEditable} className='bg-green-600 hover:bg-green-500 text-white disabled:bg-gray-500 disabled:text-white'>Save</Button>
                        <Button className='bg-sky-500 hover:bg-sky-400 text-white' onClick={createBookingHandler}>Reserve</Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default shopDetailPage;