type Login = {
    email: string,
    password: string
}

export default async function userLogIn(loginData: Login) {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL +"/api/v1/auth/login",{
        method: "POST",
        headers: {
            "Content-Type":"application/json",
        },
        body: JSON.stringify(loginData),
    })
    const data = await response.json()
    console.log(data)
    return data
}