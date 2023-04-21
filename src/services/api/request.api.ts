
import {PaggingType} from "@/types/api";
import instance from "../axios";

const ENDPOINTS = {
    LISTREQUEST: '/admin/users-request',
    UPDATEREQUEST: '/admin/update-request',
}

const getListRequest = ({
    limit,
    skip
}:PaggingType) =>{
    return instance.get(ENDPOINTS.LISTREQUEST,{
        params:{
            limit,
            skip
        }
    })
}

const updateRequestStatus = (requestId: string, status:number) => {
    return instance.post(ENDPOINTS.UPDATEREQUEST,{
        requestId: requestId,
        status: status
        
    })
}

export {
    getListRequest,
    updateRequestStatus
}