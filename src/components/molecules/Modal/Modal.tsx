import { FC, useRef, useEffect, useCallback } from 'react'
import Cross from '@/assets/icons/cross.svg'
import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import { ModalProps } from './Modal.types'
import { FocusTrap } from '../FocusTrap'
import {
  LoginView
  // OtpView,
  // AddCustomerView,
  // AddConsignee,
  // AddBatchView,
} from '@/pageComponents/auth'
import { ApplicationModal } from '@/reducer/app.reducer'
import { useRouter } from 'next/router'
import {
  useModalCurrentOpen,
  useModalIsOpen,
  useCloseModal,
} from '@/hooks/application.hooks'
import s from './Modal.module.css'
// import { Modal as Dialog } from 'antd'
import { Dialog } from '@mui/material'
import LogoutView from '@/pageComponents/auth/LogoutView'
import ChangePasswordView from '@/pageComponents/auth/ChangePasswordView'
import UpdateProfileView from '@/pageComponents/auth/UpdateProfileView'
// import EditAdministratorInfoView from '@pageComponents/auth/EditAdministratorInfoView'

function renderModalContent(view: ApplicationModal | string) {
  switch (view) {
    case ApplicationModal.LOGIN_VIEW:
      return <LoginView />
    case ApplicationModal.LOGOUT_VIEW:
      return <LogoutView />
    case ApplicationModal.CHANGE_PASSWORD_VIEW:
      return <ChangePasswordView />
    case ApplicationModal.UPDATE_PROFILE_VIEW:
      return <UpdateProfileView />
    default:
      return null
  }
}

const Modal: FC<ModalProps> = () => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>
  const router = useRouter()
  const view = useModalCurrentOpen()
  const isOpen = useModalIsOpen(view || ApplicationModal.MENU)
  console.log("Modal View:",isOpen);
  
  const closeModal = useCloseModal()
  useEffect(() => {
    // close search modal when route change
    router.events.on('routeChangeStart', closeModal)
    return () => {
      router.events.off('routeChangeStart', closeModal)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return closeModal()
      }
    },
    [closeModal]
  )

  useEffect(() => {
    const modal = ref.current

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true })
      window?.addEventListener('keydown', handleKey)
    }
    return () => {
      clearAllBodyScrollLocks()
      window?.removeEventListener('keydown', handleKey)
    }
  }, [handleKey])

  return (
    <Dialog open={isOpen}
      disableScrollLock={true}
     style={{
      // width:'80%'
    }}>
      <div className={s.wrapper}>
        <div className={s.modal} role="dialog" ref={ref}>
          <div className={s.modal_header}>
            <div
              onClick={closeModal}
              className={s.close_button}
            >
              {/* <Cross className="" /> */}
              X
            </div>
          </div>
          <FocusTrap focusFirst>{view && renderModalContent(view)}</FocusTrap>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal
