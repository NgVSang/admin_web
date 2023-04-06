import { useEffect, useState } from 'react'

export const useVerifyOTP = (name = 'verifyOTP') => {
  const [verifyOTP, setVerifyOTP] = useState('')

  useEffect(() => {
    const isVerify = localStorage.getItem(name)
    if (!verifyOTP && isVerify) {
      setVerifyOTP(isVerify)
    }
    if (!localStorage.getItem(name)) {
      localStorage.setItem(name, '')
    }
  }, [name, verifyOTP])

  return {
    verifyOTP,
    setVerifyOTP,
    useVerifyOTP,
  }
}
