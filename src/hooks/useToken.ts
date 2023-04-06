import { useEffect, useState } from 'react'

export const useTokenRequest = (name = 'tokenRequest') => {
  const [tokenRequest, setTokenRequest] = useState('')

  useEffect(() => {
    const token = localStorage.getItem(name)
    if (!tokenRequest && token) {
      // Get bg from localStorage and push it to the context.
      setTokenRequest(token)
    }
    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, '')
    }
  }, [])

  return {
    tokenRequest,
    setTokenRequest,
  }
}
