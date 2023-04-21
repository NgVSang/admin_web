
import {PaggingType} from "@/types/api";
import instance from "../axios";

const ENDPOINTS = {
    LISTUSERWORKING: '/admin/users-salary',
    USERATTENDANCE: '/admin/user-attendance/',
}

const getListUserWorking = (month: string) =>{
    return instance.get(ENDPOINTS.LISTUSERWORKING,{
        params:{
            month
        }
    })
}

const getUserAttendance = (userId: string, date:string) => {
    return instance.get(ENDPOINTS.USERATTENDANCE+userId,{
        params:{
            date
        }
    })
}

export {
    getListUserWorking,
    getUserAttendance
}