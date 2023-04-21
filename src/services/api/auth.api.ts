import {ChangePassWordData, LoginData, UpdateProfileData} from "@/types/auth";
import instance from "../axios";

const ENDPOINTS = {
    LOGIN: '/auth/login',
    CHANGEPASSWORD: '/user/change-password',
    UPDATEPROFILE: '/user/update-profile'
}

const login = (data: LoginData) => {
    return  instance.post(ENDPOINTS.LOGIN, data)
}

const changePassword = (data: ChangePassWordData) => {
    console.log(data);
    
    return  instance.post(ENDPOINTS.CHANGEPASSWORD, data)
}

const updateProfile = (data: FormData) => {
    return instance.post(ENDPOINTS.UPDATEPROFILE, data,{
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    })
}

export {
    login,
    changePassword,
    updateProfile
}