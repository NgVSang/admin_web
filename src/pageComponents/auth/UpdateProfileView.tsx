import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch, useSelector} from 'react-redux'
import FormHelper from '../FormHelper'
import {UpdateProfileViewStructure} from '../formStructure/updateProfileStructure'
import {IFormData} from '../FormHelper/FormHelper.types'
import * as authApi from '@/services/api/auth.api'
import {AppDispatch} from '@/store/store'
import toast from 'react-hot-toast'
import {setCredentials} from '@/reducer/auth.reducer'

const UpdateProfileView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { userInfo } = useSelector((state: any) => state.auth)

  const initValue = useMemo(()=>{
    return{
      name: userInfo?.name,
      email: userInfo?.email,
      phoneNumber: userInfo?.phoneNumber
    }
  },[userInfo])

  const clickUpdate = useCallback(async (formData: IFormData) => {
    try {
      const data ={
        name: formData.name as string,
        email: formData.email as string,
        phoneNumber: formData.phoneNumber as string
      }
      await authApi.updateProfile(data)
      //@ts-ignore
      toast.success("Update success!")
      dispatch(setCredentials({
        ...userInfo,
        ...data
      }))
      closeModal()
    } catch (err) {
      toast.error("Update information fail!")
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
        formStructure={UpdateProfileViewStructure}
        onSubmit={clickUpdate}
        initValues={initValue}
        onBtnClick={onBtnClickHandler}
    />
  )
}

export default UpdateProfileView
