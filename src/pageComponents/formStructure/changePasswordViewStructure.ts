import * as yup from 'yup'
import { FormStructure } from '@/types/form'
import { passwordRegExp } from '@/constants/value'

export const ChangePasswordViewStructure: FormStructure = {
  title: 'Change password',
  components: [
    {
      type: 'password',
      name: 'oldPassword',
      label: 'Password',
      placeholder: 'Password',
      isFullWidth: true,
      validation: yup
        .string()
        .required()
        .trim()
    },
    {
      type: 'password',
      name: 'newPassword',
      label: 'New Password',
      placeholder: 'New Password',
      isFullWidth: true,
      validation: yup
        .string()
        .min(6,'At least 6 characters long')
        .trim()
        .required()
        .oneOf([yup.ref('confirmPassword'), null], 'Passwords must match'),
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'ReType Password',
      placeholder: 'ReType Password',
      isFullWidth: true,
      validation: yup
        .string()
        .min(6,'At least 6 characters long')
        .required()
        .oneOf([yup.ref('confirmPassword'), null], 'Passwords must match'),
    },
    {
      type: 'submit',
      name: 'update',
      label: 'Change',
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
