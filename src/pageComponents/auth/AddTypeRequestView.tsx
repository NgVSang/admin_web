import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import {logout} from '@/reducer/auth.reducer'
import FormHelper from '../FormHelper'
import {setHeaderConfigAxios} from '@/services/axios'
import {addTypeRequestStructure} from '../formStructure/addTypeRequestStructure'
import {IFormData} from '../FormHelper/FormHelper.types'
import toast from 'react-hot-toast'
import {addRequestType} from '@/services/api/request.api'

const AddTypeRequestView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleSubmit = useCallback(async (formData: IFormData) => {
    try {
        const result = await addRequestType(formData.name)
        if (result.status == 1 ) {
            toast.success("Success")
            closeModal()
        }else{ 
            //@ts-ignore
            throw new Error(result.message)
        }
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
      formStructure={addTypeRequestStructure}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClickHandler}
    />
  )
}

export default AddTypeRequestView
