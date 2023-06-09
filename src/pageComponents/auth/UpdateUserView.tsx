import { useRouter } from 'next/router'
import { logoutStructure } from '@/pageComponents/formStructure/logoutStructure'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import {logout} from '@/reducer/auth.reducer'
import FormHelper from '../FormHelper'
import {updateUserStructure} from '../formStructure/updateUserStructure'
import {IFormData} from '../FormHelper/FormHelper.types'
import toast from 'react-hot-toast'
import {updateUser} from '@/services/api/user.api'

const UpdateUserView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const userInfor = JSON.parse(localStorage.getItem('user') || "")

  const initValue = useMemo(()=>{
    return {
        email: userInfor.email,
        name:userInfor.name,
        phoneNumber: userInfor.phoneNumber,
    }
  },[userInfor])
  

  const handleSubmit = useCallback(async (formData: IFormData) => {
    try {
        console.log(formData);
        
        let data 
        if (formData.password && formData.password != "" ) {
            data = {
                email: formData.email,
                name:formData.name,
                phoneNumber: formData.phoneNumber,
                password: formData.password
            }
        }else{
            data = {
                email: formData.email,
                name:formData.name,
                phoneNumber: formData.phoneNumber,
            }
        }
        console.log(data);
        await updateUser(data,userInfor._id)
        closeModal()
        toast.success("Update success")
        router.reload()
    } catch (err: any) {
        toast.error(err.message)
        closeModal()
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
        initValues={initValue}
        formStructure={updateUserStructure}
        onSubmit={handleSubmit}
        onBtnClick={onBtnClickHandler}
    />
  )
}

export default UpdateUserView
