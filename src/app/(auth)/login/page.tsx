'use client'

import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { use, useState } from "react"
import userLogIn from "@/libs/userLogIn"
import {PageStatus} from "../../../../interfaces"
import Success from "@/components/Success"
import Fail from "@/components/Fail"
import { useRouter } from "next/navigation"
import useUserStore from "@/hooks/useUser"
import { log } from "console"
import getUserProfile from "@/libs/getUserProfile"
import ErrorModal from "@/components/ErrorModal"

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showError, setShowError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const router = useRouter()
    const {login} = useUserStore()

    const loginUser = async () =>{
        const loginResponse = await userLogIn({email, password})
        if (!loginResponse.success){
            setShowError(true)
            setErrorMessage("Invalid email or password")
            return
        }

        const token = loginResponse.token

        const userProfile = await getUserProfile(token)
        if (!userProfile){
            setShowError(true)
            setErrorMessage("Failed to get user profile")
            return
        }
        const userData = {
            name: userProfile.name,
            email: userProfile.email,
            tel: userProfile.tel,
            role: userProfile.role,
            id: userProfile._id
        }
        login(userData, token)
        router.push('/')
    }

    // if(pageStatus === PageStatus.SUCCESS) return <Success message={""} />

    // if(pageStatus === PageStatus.ERROR) return <Fail message={""} /> 

    return (
        <main className="w-[100%] h-full flex flex-col items-center ">
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Login</div>
            <div className="bg-gradient-to-br from-[#a2ab45] to-[#D3D989] rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-5 flex flex-auto flex-col justify-center mx-auto">
                <FormControl className="w-auto flex space-y-3 flex-col">
                    <TextField variant="standard" name="Email" label="Email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField variant="standard" name="Password" label="Password" value={password} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    <button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white 
                        font-semibold py-2 px-4 rounded hover:to-[#bcdd15]' onClick={loginUser}>
                        Login
                    </button>
                </FormControl>
            </div>
            {showError ? <ErrorModal isOpen={showError} onClose={()=>setShowError(false)} text={errorMessage}/> : null}
        </main>
    )
}

export default LoginPage