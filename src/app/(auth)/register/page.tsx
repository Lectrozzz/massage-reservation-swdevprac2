'use client'

import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useState } from "react"
import userRegister from "@/libs/userRegister"
import {PageStatus} from "../../../../interfaces"
import Success from "@/components/Success"
import Fail from "@/components/Fail"

const RegisterPage = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [role, setRole] = useState<string>('')
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.DEFAULT)

    const registerUser = async () =>{
        try {
            const registerData = { name, email, password, tel, role }
            const data = await userRegister(registerData)
            setPageStatus(PageStatus.SUCCESS)
        } catch (error) {
            console.error(error)
            setPageStatus(PageStatus.ERROR)
        }
        return
    }

    if(pageStatus === PageStatus.SUCCESS) return <Success message={""} />

    if(pageStatus === PageStatus.ERROR) return <Fail message={""} />

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4 ">
            <div className="text-2xl font-medium items-center mt-5">Register Account</div>
            <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-5 flex flex-auto flex-col justify-center mx-auto">
                <FormControl className="w-auto flex space-y-3 flex-col">
                    <TextField variant="standard" name="Name" label="Name" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                    <TextField variant="standard" name="Email" label="Email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                    <TextField variant="standard" name="Password" label="Password" value={password} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                    <TextField variant="standard" name="Tel" label="Tel" value={tel} required onChange={(e)=>{setTel(e.target.value)}}/>
                    <FormControl>
                        <InputLabel className="-left-[14px]">Role</InputLabel>
                        <Select variant="standard" id="hospital" label="Hospital" value={role} required onChange={(e: SelectChangeEvent)=>{setRole(e.target.value)}}>
                            <MenuItem value="admin">Admin</MenuItem>
                            <MenuItem value="user">User</MenuItem>
                        </Select>
                    </FormControl>
                    <Button name="Register" className="p-2 rounded-lg bg-gradient-to-l from-purple-400 to-pink-500 text-white hover:text-gray-400" onClick={()=>registerUser()}>Register</Button>
                </FormControl>
            </div>
        </main>
    )
}

export default RegisterPage