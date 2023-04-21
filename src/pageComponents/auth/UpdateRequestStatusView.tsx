import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import FormHelper from '@/pageComponents/FormHelper/FormHelper'
// import { loginStructure } from '@/pageComponents/formStructure/loginStructure'
// import { IFormData } from '@pageComponents/FormHelper/FormHelper.types'
import { useCloseModal, useToggleModal } from '@/hooks/application.hooks'
import { ApplicationModal, setData } from '@/reducer/app.reducer'
import { useDispatch, useSelector } from 'react-redux'
import {AppDispatch} from '@/store/store'
import {updateRequestStatusStructure} from '../formStructure/updateRequestStatusStructure'
import toast from 'react-hot-toast'
import {getListRequest, updateRequestStatus} from '@/services/api/request.api'
import {setListRequest} from '@/reducer/request.reducer'

const UpdateRequestStatusView: React.FC = () => {
    const closeModal = useCloseModal()
    const {  } = useSelector((state: any) => state.request)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
  
    const clickUpdateStatus = useCallback(async () => {
      try {
            const id = localStorage.getItem('requestId')
            const status = localStorage.getItem('requestStatus')
            console.log(id,status);
            const data = await updateRequestStatus(id || "", parseInt(status || '1'))
            //@ts-ignore
            if (data.status === 0) throw new Error(data.message)
            const res = await getListRequest({})
            const result = {
                requests: res.data.result,
                totalItems: res.data.totalItems
            }
            dispatch(setListRequest(result))
            toast.success("Update success!")
            closeModal()
      } catch (err: any) {
        console.error(err)
        toast.error(err.message)
      }
    }, [])
  
    const onBtnClickHandler = useMemo(
      () => ({
        cancel: closeModal,
      }),
      []
    )
  
    return (
      <FormHelper
        formStructure={updateRequestStatusStructure}
        onSubmit={clickUpdateStatus}
        onBtnClick={onBtnClickHandler}
      />
    )
}

export default UpdateRequestStatusView
