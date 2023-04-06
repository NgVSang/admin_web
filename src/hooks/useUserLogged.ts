import { useEffect, useState } from 'react'
export const USER_LOGGED_KEY = 'userLogged'

export const useUserLogged = () => {
  const [userLogged, setUserLogged] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [companyRepresent, setCompanyRepresent] = useState('')
  const [representDesign, setRepresentDesign] = useState('')
  const [representMobile, setRepresentMobile] = useState('')
  const [financeEmail, setFinanceEmail] = useState('')
  const [companyAdministrator, setCompanyAdministrator] = useState('')
  const [financeAdministratorEmail, setFinanceAdministratorEmail] = useState('')
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('')
  const [logo, setLogo] = useState('')
  const [registrationProfile, setRegistrationProfile] = useState('')

  useEffect(() => {
    const user = localStorage.getItem(USER_LOGGED_KEY)

    if (!userLogged && user) {
      // Get bg from localStorage and push it to the context.
      setUserLogged(user)
      setEmailAddress(user.split(',')[0].split(':')[1])
      setCompanyName(user.split(',')[1].split(':')[1])
      setCompanyAddress(user.split(',')[2].split(':')[1])
      setCompanyRepresent(user.split(',')[3].split(':')[1])
      setRepresentDesign(user.split(',')[4].split(':')[1])
      setRepresentMobile(user.split(',')[5].split(':')[1])
      setFinanceEmail(user.split(',')[7].split(':')[1])
      const logo = user.split(',')[8].split(':')[1]
        ? `${user.split(',')[8].split(':')[1]}:/${user.split(',')[8].split(':')[2]
        }`
        : ''
      setLogo(logo)
      const profile = user.split(',')[9].split(':')[1]
        ? `${user.split(',')[9]?.split(':')[1]}:/${user.split(',')[9]?.split(':')[2]
        }`
        : ''
      setRegistrationProfile(profile)
      setCompanyAdministrator('Administrator')
      setFinanceAdministratorEmail(user.split(',')[0].split(':')[1])
      setCompanyRegistrationNumber('2131221321')
    }
    if (!localStorage.getItem(USER_LOGGED_KEY)) {
      localStorage.setItem(USER_LOGGED_KEY, '')
    }
  }, [userLogged])

  return {
    userLogged,
    emailAddress,
    companyName,
    companyAddress,
    companyRepresent,
    representDesign,
    representMobile,
    companyAdministrator,
    financeAdministratorEmail,
    companyRegistrationNumber,
    financeEmail,
    logo,
    registrationProfile,
    useUserLogged,
  }
}
