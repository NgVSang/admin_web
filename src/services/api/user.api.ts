
import {PaggingType} from "@/types/api";
import instance from "../axios";

const ENDPOINTS = {
    LISTUSER: '/admin/users',
    CREATEUSER: '/admin/create-user',
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

export {
    getListUser,
    createUser
}