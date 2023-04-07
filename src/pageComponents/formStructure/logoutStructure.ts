import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const logoutStructure: FormStructure = {
  title: 'Logout',
  description: 'Are you sure to logout?',
  components: [
    {
      type: 'submit',
      name: 'logout',
      label: 'Logout',
      placeholder: '',
      isFullWidth: false,
    },
    {
      type: 'button',
      name: 'cancel',
      label: 'Cancel',
      placeholder: '',
      isFullWidth: false,
    },
  ],
}
