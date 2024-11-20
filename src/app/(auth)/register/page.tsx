'use client'

import { Select,MenuItem,TextField,FormControl,InputLabel, SelectChangeEvent, Button} from "@mui/material"
import { useState } from "react"
import userRegister from "@/libs/userRegister"
import {PageStatus} from "../../../../interfaces"
import Success from "@/components/Success"
import Fail from "@/components/Fail"
import { useRouter } from "next/navigation"
import {validateEmail, validateName, validatePassword, validateTel, validateRole} from "@/utils/AuthFormValidation"

const RegisterPage = () => {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [tel, setTel] = useState<string>('')
    const [role, setRole] = useState<string>('user')
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.DEFAULT)

    const [nameErrorText, setNameError] = useState<string>('')
    const [emailErrorText, setEmailError] = useState<string>('')
    const [passwordErrorText, setPasswordError] = useState<string>('')
    const [telErrorText, setTelError] = useState<string>('')
    const [roleErrorText, setRoleError] = useState<string>('')

    const router = useRouter()

    const validate = () => {
        const nameError = validateName(name)
        setNameError(nameError)
        const emailError = validateEmail(email)
        setEmailError(emailError)
        const passwordError = validatePassword(password)
        setPasswordError(passwordError)
        const telError = validateTel(tel)
        setTelError(telError)
        const roleError = validateRole(role)
        setRoleError(roleError)
        if(nameError || emailError || passwordError || telError) return false
        return true
    }

    const registerUser = async () =>{
        try {
            const isValid = validate()
            if(!isValid) return
            const registerData = { name, email, password, tel, role }
            const data = await userRegister(registerData)
            
            router.push("/login")
        } catch (error) {
            console.error(error)
        }
        return
    }

    if(pageStatus === PageStatus.SUCCESS) return <Success message={""} />

    if(pageStatus === PageStatus.ERROR) return <Fail message={""} />

    return (
        <main className="w-[100%] flex flex-col items-center space-y-3 ">
            <div className="text-center text-4xl m-5 font-semibold drop-shadow">Register</div>
            <div className="bg-gradient-to-br from-[#a2ab45] to-[#D3D989] rounded-lg space-x-5 space-y-2 w-1/3 px-10 py-5 flex flex-auto flex-col justify-center mx-auto">
                <FormControl className="w-auto flex space-y-5 flex-col">
                    <div className="w-full relative pb-6">
                        <TextField className="w-full" variant="standard" name="Name" label="Name" value={name} required onChange={(e)=>{setName(e.target.value)}}/>
                        <div className="text-red-500 text-sm font-normal absolute bottom-0 left-auto right-auto">{nameErrorText}</div>
                    </div>
                    <div className="w-full relative pb-6">
                        <TextField className="w-full" variant="standard" name="Email" label="Email" value={email} required onChange={(e)=>{setEmail(e.target.value)}}/>
                        <div className="text-red-500 text-sm font-normal absolute bottom-0 left-auto right-auto">{emailErrorText}</div>
                    </div>
                    <div className="w-full relative pb-6">
                        <TextField className="w-full" variant="standard" name="Password" label="Password" value={password} type="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
                        <div className="text-red-500 text-sm font-normal absolute bottom-0 left-auto right-auto">{passwordErrorText}</div>
                    </div>
                    <div className="w-full relative pb-6">
                        <TextField className="w-full" variant="standard" name="Tel" label="Tel" value={tel} required onChange={(e)=>{setTel(e.target.value)}}/>
                        <div className="text-red-500 text-sm font-normal absolute bottom-0 left-auto right-auto">{telErrorText}</div>
                    </div>
                    <FormControl>
                        <div className="w-full relative pb-6">
                            <InputLabel className="-left-[14px]">Role</InputLabel>
                            <Select className="w-full" variant="standard" id="hospital" label="Hospital" value={role} required onChange={(e: SelectChangeEvent)=>{setRole(e.target.value)}}>
                                {/* <MenuItem value="admin">Admin</MenuItem> */}
                                <MenuItem value="user">User</MenuItem>
                            </Select>
                            <div className="text-red-500 text-sm font-normal absolute bottom-0 left-auto right-auto">{roleErrorText}</div>
                        </div>
                    </FormControl>
                    <button className='bg-gradient-to-r from-[#71aa48] to-[#314a25] text-white 
                        font-semibold py-2 px-4 rounded hover:to-[#bcdd15]' onClick={registerUser}>
                        Register
                    </button>
                </FormControl>
            </div>
        </main>
    )
}

export default RegisterPage