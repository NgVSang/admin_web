import { ChangePassWordData, LoginData } from "@/types/auth";
import instance from "../axios";

const ENDPOINTS = {
    // LOGIN: '/auth/login',
    // CHANGEPASSWORD: '/user/change-password',
    // UPDATEPROFILE: '/user/update-profile',
    // ADDIMAGETRAINING: '/admin/add-image-user/',
    // TRAININGUSER: '/admin/training-user/',
    LOGIN: '/auth/login',
    PROFILE: '/user/me',
    REGISTER: '/auth/register',
}

const login = (data: LoginData) => {
    return  instance.post(ENDPOINTS.LOGIN, data)
}

const changePassword = (data: ChangePassWordData) => {
    console.log(data);
    
    // return  instance.post(ENDPOINTS.CHANGEPASSWORD, data)
}
const getProfile = () => {
    return instance.get(ENDPOINTS.PROFILE);
  };
const updateProfile = (data: FormData) => {
    // return instance.post(ENDPOINTS.UPDATEPROFILE, data,{
    //     headers: {
    //     'Content-Type': 'multipart/form-data',
    //     },
    // })
}

const addImageTraining = (id:string,data: FormData) => {
    // return instance.post(ENDPOINTS.ADDIMAGETRAINING + id, data,{
    //     headers: {
    //     'Content-Type': 'multipart/form-data',
    //     },
    // })
}

const trainingUser = (id:string) => {
    // return instance.post(ENDPOINTS.TRAININGUSER + id)
}

export {
    login,
    changePassword,
    updateProfile,
    addImageTraining,
    trainingUser,
    getProfile
};

