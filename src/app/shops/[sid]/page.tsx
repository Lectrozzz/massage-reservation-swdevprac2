'use client'
 
import getShopById from '@/libs/shops/getShopById'
import { useParams } from 'next/navigation'
import { useEffect, useState } from "react"
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import deleteShop from '@/libs/shops/deleteShop'
import Modal from '@/components/Modal'
import useUserStore from '@/hooks/useUser'
import updateShop from '@/libs/shops/updateShop'
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

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
    const [newPictureUrl, setNewPictureUrl] = useState<string>("")
    const [isEditable, setIsEditable] = useState<boolean>(false)

    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {token, user} = useUserStore()

    const regex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif)/
    const pictureUrl = (regex.test(picture)) ? picture : '/img/default_shop.jpg'

    const createBookingHandler = () => {
        if(!token){
            router.push("/login")
            return
        }
        console.log("Create booking")
        router.push(`/shops/${params.sid}/booking`)
    }

    const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)
    const updateShopHandler = async () => {
        if(!token) return
        try{
            //TODO: update shop
            const shopData = {
                name: shopName,
                address: shopAddress,
                priceLevel: priceLevel,
                province: province,
                postalcode: postalcode,
                tel: tel,
                picture: newPictureUrl
            }
            console.log("Update shop")
            const response = await updateShop({shopId: params.sid, shopData, token})
            router.push(`/shops`)
        }
        catch(e){
            console.error(e)
            setIsSaveModalOpen(false)
            setShowError(true)
            setErrorMessage("Cannot update shop")  
        }
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const deleteShopHandler = async () => {
        if(!token) return
        try{
            console.log("Delete shop")
            await deleteShop(params.sid, token)
            router.push(`/shops`)
        }
        catch(e){
            console.error(e)
            setIsDeleteModalOpen(false)
            setShowError(true)
            setErrorMessage("Cannot delete shop")  
        }
    }

    const fetchData = async () => {
        try{
            const shopData = await getShopById(params.sid)
            setShopName(shopData.name)
            setShopHeaderName(shopData.name)
            setShopAddress(shopData.address)
            setPriceLevel(shopData.priceLevel)
            setProvince(shopData.province)
            setPostalcode(shopData.postalcode)
            setTel(shopData.tel)
            setPicture(shopData.picture)
            setNewPictureUrl(shopData.picture)
            setIsLoading(false)
        }
        catch(e){
            console.error(e)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            { !shopHeaderName?
            <h1 className="font-semibold text-2xl mt-8 drop-shadow "> { isLoading ? "Loading..." : "No shop data found"} </h1>
            :
            <>
            <h1 className="font-semibold text-2xl mt-8 drop-shadow ">{shopHeaderName}</h1>
            <div className="w-[75%] flex flex-row items-center gap-8 bg-gradient-to-br from-[#a2ab45] to-[#D3D989] p-8 rounded-lg mt-8">
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
                    <div className='w-full relative pb-4'>
                        <FormControl className="w-full flex space-y-4 flex-col">
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Name" label="Name" value={shopName} onChange={(e)=>{setShopName(e.target.value)}}/>
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Address" label="Address" value={shopAddress} onChange={(e)=>{setShopAddress(e.target.value)}}/>
                            <FormControl>
                                <InputLabel className="-left-[14px]">Price Level</InputLabel>
                                <Select className={(!isEditable)?'pointer-events-none': ''} IconComponent={isEditable? ArrowDropDownIcon:()=>null} variant="standard" id="hospital" label="Hospital" value={priceLevel.toString()} required onChange={(e: SelectChangeEvent)=>{setPriceLevel(Number(e.target.value))}}>
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Province" label="Province" value={province} onChange={(e)=>{setProvince(e.target.value)}}/>
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Postalcode" label="Postalcode" value={postalcode} onChange={(e)=>{setPostalcode(e.target.value)}}/>
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Tel" label="Tel" value={tel} onChange={(e)=>{setTel(e.target.value)}}/>
                            <TextField className={(!isEditable)?'pointer-events-none': ''} variant="standard" name="Picture" label="Picture" value={newPictureUrl} onChange={(e)=>{setNewPictureUrl(e.target.value)}}/>
                        </FormControl>
                        <div className='absolute right-0'>
                            {showError ? <p className="text-red-500 text-sm my-2">{errorMessage}</p> : null}
                        </div>
                    </div>
                    <div className='flex justify-end mt-4 gap-4'>
                        {
                            user?.role === "admin" && token ?
                                <>
                                    <Button className='bg-red-500 hover:bg-red-400 text-white' onClick={()=>setIsDeleteModalOpen(true)}>Delete</Button>
                                    <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handler={deleteShopHandler} text={"Are you sure that you want to delete this shop?"} />
                                    <Button className='bg-orange-400 hover:bg-orange-300 text-white' onClick={()=>setIsEditable((isEditable)=> !isEditable)}>Edit</Button>
                                    <Button disabled={!isEditable} className='bg-green-600 hover:bg-green-500 text-white disabled:bg-gray-500 disabled:text-white' onClick={()=> setIsSaveModalOpen(true)}>Save</Button>
                                    <Modal isOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} handler={updateShopHandler} text={"Are you sure that you want to update this shop information?"} />
                                </>
                            : null
                        }  
                        
                        <Button className='bg-sky-500 hover:bg-sky-400 text-white' onClick={createBookingHandler}>Reserve</Button>
                    </div>
                </div>
            </div>
            </>
            }
        </main>
    );
}

export default shopDetailPage;