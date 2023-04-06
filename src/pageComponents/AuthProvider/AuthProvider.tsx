import React from 'react'
import { useSelector } from 'react-redux'

const AuthContext = React.createContext(null)
const { Provider } = AuthContext

interface Props {
  children?: JSX.Element
}

const AuthProvider = ({ children }: Props) => {
  const { userInfo } = useSelector((state: any) => state.auth)

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!userInfo) {
      return false
    }
  }

  return (
    <Provider
      //@ts-ignore
      value={{
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
