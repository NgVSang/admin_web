import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Home from '@/app/page'
import { useSelector } from 'react-redux'
// import { useToggleModal } from 'hooks/application.hooks'
// import { ApplicationModal } from 'reducers/app.reducer'

export function AuthGuard({ children }: { children: JSX.Element }) {
  const router = useRouter()

  const { userInfo } = useSelector((state: any) => state.auth)
  // const openLoginView = useToggleModal(ApplicationModal.LOGIN_VIEW)

  useEffect(() => {
    if (!userInfo) {
      router.push('/auth/login')
      // openLoginView()
    }
  }, [userInfo])

  // if auth initialized with a valid user show protected page
  if (userInfo) {
    return <>{children}</>
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return (
    <>
      <Home />
    </>
  )
}
