import {ChangePassWordData, LoginData, UpdateProfileData} from "@/types/auth";
import {AxiosProgressEvent} from "axios";
import instance from "../axios";

const ENDPOINTS = {
    LOGIN: '/auth/login',
    CHANGEPASSWORD: '/user/change-password',
    UPDATEPROFILE: '/user/update-profile',
    ADDIMAGETRAINING: '/admin/add-image-user/',
    TRAININGUSER: '/admin/training-user/',
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

const addImageTraining = (id:string,data: FormData) => {
    return instance.post(ENDPOINTS.ADDIMAGETRAINING + id, data,{
        headers: {
        'Content-Type': 'multipart/form-data',
        },
    })
}

const trainingUser = (id:string) => {
    return instance.post(ENDPOINTS.TRAININGUSER + id)
}

export {
    login,
    changePassword,
    updateProfile,
    addImageTraining,
    trainingUser
}