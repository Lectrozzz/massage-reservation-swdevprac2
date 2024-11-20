type Register = {
    name: string,
    email: string,
    password: string,
    tel: string,
    role: string,
}

export default async function userRegister(registerData:Register) {
    
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/auth/register",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(registerData),
    })
    if(!response.ok){
        
        throw new Error("Failed to register user")
    }
    const data = await response.json()
    return data
}