'use client';

import useUserStore from "@/hooks/useUser"
import createShop from "@/libs/shops/createShop"
import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useRouter } from "next/navigation"
import { useState } from "react"
import ErrorModal from "@/components/ErrorModal";

const createShopPage = () => {
    const {token, user} = useUserStore()
    const router = useRouter()

    const [shopName, setShopName] = useState<string>("")
    const [shopAddress, setShopAddress] = useState<string>("")
    const [priceLevel, setPriceLevel] = useState<number>(1)
    const [province, setProvince] = useState<string>("")
    const [postalcode, setPostalcode] = useState<string>("")
    const [tel, setTel] = useState<string>("")
    const [picture, setPicture] = useState<string>("")

    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const createShopHandler = async () => {
        if (!token){
            router.push("/login")
            return
        }
        console.log("Create Shop")
        const shopData = {
            name: shopName,
            address: shopAddress,
            priceLevel: priceLevel,
            province: province,
            postalcode: postalcode,
            tel: tel,
            picture: picture
        }
        const response = await createShop({shopData, token})
        console.log(response)
        if(response.success){
            router.push(`/shops`)
        }
        else{
            setShowError(true)
            setErrorMessage("Failed to create shop. Invalid input data.")
        }
    }

    if(!token){
        return <div>Unauthorized</div>
    }

    if(user?.role !== "admin"){
        return <div>Access Denied</div>
    }

    return (
        <main className="w-[80%] flex flex-col mx-auto items-center">
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Create Shop</div>
            <div className="w-[50%] flex flex-row items-center gap-8 bg-gradient-to-br from-[#a2ab45] to-[#D3D989] p-8 rounded-lg mt-8">
                <div className='w-full relative pb-2'>
                    <FormControl className="w-full flex space-y-3 flex-col">
                        <TextField variant="standard" name="Name" label="Name" value={shopName} required onChange={(e)=>{setShopName(e.target.value)}}/>
                        <TextField variant="standard" name="Address" label="Address" value={shopAddress} required onChange={(e)=>{setShopAddress(e.target.value)}}/>
                        <FormControl>
                            <InputLabel className="-left-[14px]">Price Level</InputLabel>
                            <Select variant="standard" id="hospital" label="Hospital" value={priceLevel.toString()} required onChange={(e: SelectChangeEvent)=>{setPriceLevel(Number(e.target.value))}}>
                                <MenuItem value="1">1</MenuItem>
                                <MenuItem value="2">2</MenuItem>
                                <MenuItem value="3">3</MenuItem>
                                <MenuItem value="4">4</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField variant="standard" name="Province" label="Province" value={province} required onChange={(e)=>{setProvince(e.target.value)}}/>
                        <TextField variant="standard" name="Postalcode" label="Postalcode" value={postalcode} required onChange={(e)=>{setPostalcode(e.target.value)}}/>
                        <TextField variant="standard" name="Tel" label="Tel" value={tel} onChange={(e)=>{setTel(e.target.value)}}/>
                        <TextField variant="standard" name="Picture" label="Picture" value={picture} required onChange={(e)=>{setPicture(e.target.value)}}/>
                        <button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white 
                        font-semibold py-2 px-4 rounded hover:to-[#bcdd15]'
                        onClick={createShopHandler}>
                            Create Shop
                        </button>
                    </FormControl>
                </div>
            </div>
            {showError ? <ErrorModal isOpen={showError} onClose={()=>setShowError(false)} text={errorMessage}/> : null}
        </main>
    )
}

export default createShopPage;