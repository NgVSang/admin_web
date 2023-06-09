
import {PaggingType} from "@/types/api";
import instance from "../axios";

const ENDPOINTS = {
    LISTUSER: '/admin/users',
    CREATEUSER: '/admin/create-user',
    UPDATEUSER: '/admin/update-user/'
}

const getListUser = ({
    limit,
    skip
}:PaggingType) =>{
    return instance.get(ENDPOINTS.LISTUSER,{
        params:{
            limit,
            skip
        }
    })
}

const createUser = (data: any) => {
    return instance.post(ENDPOINTS.CREATEUSER,data)
}

const updateUser = (data: any, userId: string) => {
    return instance.post(ENDPOINTS.UPDATEUSER+userId,data)
}

export {
    getListUser,
    createUser,
    updateUser
}