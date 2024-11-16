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

const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.DEFAULT)

    const router = useRouter()
    const {login} = useUserStore()

    const loginUser = async () =>{
        try {
            const loginResponse = await userLogIn({email, password})
            const token = loginResponse.token

            const userProfile = await getUserProfile(token)
            const userData = {
                name: userProfile.name,
                email: userProfile.email,
                tel: userProfile.tel,
                role: userProfile.role,
            }
            login(userData, token)
            router.push('/')
        }
        catch (error) {
            console.error(error)
            setPageStatus(PageStatus.ERROR)
        }
        return
    }

    // if(pageStatus === PageStatus.SUCCESS) return <Success message={""} />

    if(pageStatus === PageStatus.ERROR) return <Fail message={""} /> 

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-2xl font-medium items-center mt-5">Login</div>
            <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-5 flex flex-auto flex-col justify-center mx-auto">
                <FormControl className="w-auto flex space-y-3 flex-col">
                    <TextField variant="standard" name="Email" label="Email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField variant="standard" name="Password" label="Password" value={password} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Button name="Register" className="p-2 rounded-lg bg-gradient-to-l from-purple-400 to-pink-500 text-white hover:text-gray-400" onClick={()=>loginUser()}>Login</Button>
                </FormControl>
            </div>
        </main>
    )
}

export default LoginPage