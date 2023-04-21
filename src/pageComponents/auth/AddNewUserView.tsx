import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import FormHelper from '../FormHelper'
import {addUserStructure} from '../formStructure/addUserStructure'
import {IFormData} from '../FormHelper/FormHelper.types'
import {createUser} from '@/services/api/user.api'
import toast from 'react-hot-toast'

const AddNewUserView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleCreateUser = useCallback(async (formData: IFormData) => {
    try {
      const data = {
        name: formData.name,
        password: formData.password,
        email: formData.email,
        gender: formData.gender,
        phoneNumber: formData.phoneNumber,
        baseSalary: (formData.baseSalary && formData.baseSalary != '' ) ? parseInt(formData.baseSalary) : 3500000
      }
      await createUser(data)
      toast.success("Success!")
      closeModal()
      setTimeout(()=>{
        router.reload()
      },1000)
    } catch (err: any) {
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
      formStructure={addUserStructure}
      onSubmit={handleCreateUser}
      onBtnClick={onBtnClickHandler}
    />
  )
}

export default AddNewUserView
