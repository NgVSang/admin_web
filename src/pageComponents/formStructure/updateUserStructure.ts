import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const updateUserStructure: FormStructure = {
  title: 'Update User',
  components: [
    {
        type: 'text',
        name: 'name',
        label: 'Full name',
        placeholder: 'Full name',
        isFullWidth: true,
        validation: yup
          .string()
          .required()
          .trim()
    },
    {
        type: 'text',
        name: 'email',
        label: 'Email',
        placeholder: 'Email',
        isFullWidth: true,
        validation: yup
          .string()
          .email()
          .required()
          .trim()
    },
    {
        type: 'text',
        name: 'phoneNumber',
        label: 'Phone Number',
        placeholder: 'Phone Number',
        isFullWidth: true,
        validation: yup
          .string()
          .required()
          .trim()
          .matches(/^(\+84|84|0){1}([3|5|7|8|9]){1}([0-9]{8})$/, 'Mush be a valid phone number')
    },
    {
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
        isFullWidth: true,
        validation: yup
          .string()
          .trim()
    },
    {
      type: 'submit',
      name: 'create',
      label: 'Create',
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
