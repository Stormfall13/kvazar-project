import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";


export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    console.log("Registration data:", data);
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    console.log("Login data:", data)
    localStorage.setItem('token', data.token)
    console.log(data.token);
    return jwtDecode(data.token)
}

export const check = async () => {
    try {
        const {data} = await $authHost.get('api/user/auth')
        localStorage.setItem('token', data.token)
        return jwtDecode(data.token)
    } catch (error) {
        console.log(error)
    }
}

export const logOut = async () => {
    try {
        const {data} = await $host.post('api/user/logout')
        localStorage.removeItem('token', data.token)
    } catch (error) {
        console.log(error)
    }
}