import {ChangePassWordData, LoginData} from "@/types/auth";
import instance from "../axios";

const ENDPOINTS = {
    LOGIN: '/auth/login',
    CHANGEPASSWORD: '/user/change-password'
}

const login = (data: LoginData) => {
    return  instance.post(ENDPOINTS.LOGIN, data)
}

const changePassword = (data: ChangePassWordData) => {
    console.log(data);
    
    return  instance.post(ENDPOINTS.CHANGEPASSWORD, data)
}

export {
    login,
    changePassword
}