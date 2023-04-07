import {LoginData} from "@/types/auth";
import instance from "../axios";

const ENDPOINTS = {
    LOGIN: '/auth/login'
}

const login = (data: LoginData) => {
    return  instance.post(ENDPOINTS.LOGIN, data)
}

export {
    login
}