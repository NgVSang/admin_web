import React, { useCallback, useMemo } from 'react'

import FormHelper from '@/pageComponents/FormHelper'
import { ChangePasswordViewStructure } from '@/pageComponents/formStructure/changePasswordViewStructure'
import { IFormData } from '@/pageComponents/FormHelper/FormHelper.types'
import { useCloseModal } from '@/hooks/application.hooks'
import * as authApi from '@/services/api/auth.api'
import toast from 'react-hot-toast'

const ChangePasswordView: React.FC = (props: any) => {
  const closeModal = useCloseModal()

  const changePassword = useCallback(async (formData: IFormData) => {
    const notifyRePasswordNotMatch = () => toast('Re-password not match!')
    try {
      if (formData.newPassword === formData.confirmPassword) {
        const data = {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        }
        await authApi.changePassword(data)
        toast.success("Change password success!")
        closeModal()
      } else {
        notifyRePasswordNotMatch()
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }, [])

  const cancelUpdate = useCallback(async () => {
    closeModal()
  }, [])

  const onBtnClickHandler = useMemo(
    () => ({
      cancel: cancelUpdate,
    }),
    []
  )

  return (
    <FormHelper
      formStructure={ChangePasswordViewStructure}
      onSubmit={changePassword}
      validationFalseMsg="Update password fail!"
      onBtnClick={onBtnClickHandler}
    />
  )
}

export default ChangePasswordView
