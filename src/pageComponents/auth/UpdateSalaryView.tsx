import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import {logout} from '@/reducer/auth.reducer'
import FormHelper from '../FormHelper'
import {setHeaderConfigAxios} from '@/services/axios'
import {updateSalaryStructure} from '../formStructure/updateSalaryStructure'
import {IFormData} from '../FormHelper/FormHelper.types'
import toast from 'react-hot-toast'
import SalaryApi from '@/services/api/salary.api'

const UpdateSalaryView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const dispatch = useDispatch()
  const userId = localStorage.getItem("userId")
  const date = localStorage.getItem("date")

  const handleUpdate = useCallback(async (data: IFormData) => {
    try {
      await SalaryApi.updateSalary({
        salary: parseInt(data.salary) || 0,
        bonus: parseInt(data.bonus) || 0,
        fined: parseInt(data.fined)|| 0,
        month: date || ''
      },userId || '')
      .then((res)=>{
        toast.success("Update success")
        closeModal()
        router.reload()
      })
      .catch((err: any)=>{
        toast.error(err.message)
      })
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
      formStructure={updateSalaryStructure}
      onSubmit={handleUpdate}
      onBtnClick={onBtnClickHandler}
    />
  )
}

export default UpdateSalaryView
