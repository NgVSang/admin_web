import { useRouter } from 'next/router'
import { logoutStructure } from '@/pageComponents/formStructure/logoutStructure'
import { useCallback, useMemo } from 'react'
import { useCloseModal } from '@/hooks/application.hooks'
import {useDispatch} from 'react-redux'
import {logout} from '@/reducer/auth.reducer'
import FormHelper from '../FormHelper'
import {setHeaderConfigAxios} from '@/services/axios'

const LogoutView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal()
  const router = useRouter()
  const dispatch = useDispatch()

  const clickLogout = useCallback(async () => {
    try {
      // await userApi.logout()
      dispatch(logout())
      setHeaderConfigAxios()
    } catch (err) {
      console.error(err)
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
      formStructure={logoutStructure}
      onSubmit={clickLogout}
      onBtnClick={onBtnClickHandler}
    />
  )
}

export default LogoutView
