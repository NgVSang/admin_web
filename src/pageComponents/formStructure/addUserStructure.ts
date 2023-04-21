import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const addUserStructure: FormStructure = {
  title: 'Create User',
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
        type: 'text',
        name: 'gender',
        label: 'Gender',
        placeholder: 'Gender',
        isFullWidth: true,
        validation: yup
            .string()
            .required()
            .trim()
            .oneOf(['male','female'], 'Gender must male or female'),
    },
    {
      type: 'text',
      name: 'baseSalary',
      label: 'Base Salary',
      placeholder: 'Base Salary',
      isFullWidth: true,
      // validation: yup
      //   .number()
      //   .integer()
      //   .default(3500000)
      //   .min(3500000,"Salary must be bigger than 3.500.000 VNĐ")
    },
    {
        type: 'password',
        name: 'password',
        label: 'Password',
        placeholder: 'Password',
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
          .oneOf([yup.ref('password'), null], 'Passwords must match'),
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
