import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
// import FormHelper from '@pageComponents/FormHelper/FormHelper'
// import { loginStructure } from '@pageComponents/formStructure/loginStructure'
// import { IFormData } from '@pageComponents/FormHelper/FormHelper.types'
import { useCloseModal, useToggleModal } from '@/hooks/application.hooks'
import { ApplicationModal, setData } from '@/reducer/app.reducer'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const LoginView: React.FC = () => {
  // Form State
  const router = useRouter()
  const openOTPView = useToggleModal(ApplicationModal.OTP_VIEW)
  const openForgot = useToggleModal(ApplicationModal.FORGOT_VIEW)
  const dispatch = useDispatch()
  const closeModal = useCloseModal()

  const handleClick = useCallback(
    (_: React.MouseEvent<HTMLElement>, href: string) => {
      closeModal()
      router.push(href)
    },
    []
  )

  const handleLogin = async (formData: any) => {
    try {
      // const loginOtp = await authApi.login(
      //   formData.username as string,
      //   formData.password as string,
      //   'email'
      //   // isEmailOrPhoneNumber(formData.username as string)
      // )
      // let pathname = '/auth/wait-for-approval'
      // console.log(loginOtp)
      // if (loginOtp.__typename === 'CurrentUser') {
      //   dispatch(setData({ username: formData.username as string }))
      //   openOTPView()
      //   return
      // } else if (loginOtp.message === 'WAITING_APPROVAL') {
      //   closeModal()
      // } else if (loginOtp.message === 'REJECTED_ERROR') {
      //   closeModal()
      //   pathname = `/auth/rejected?u=${formData.username}`
      // } else if (loginOtp.message === 'NEED_MODIFICATION_ERROR') {
      //   closeModal()
      //   pathname = `/auth/need-modify?u=${formData.username}`
      // }

      // router.push(pathname)
    } catch (e: any) {
      toast.error('Username or password not match!')
    }
  }

  return (
    <div>
      <p>Đây là trang login</p>
    </div>
    // <FormHelper
    //   formStructure={loginStructure}
    //   onSubmit={handleLogin}
    //   onBtnClick={onBtnClickHandler}
    // />
  )
}

export default LoginView
