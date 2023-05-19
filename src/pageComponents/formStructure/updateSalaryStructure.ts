import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const updateSalaryStructure: FormStructure = {
  title: 'Update Salary',
  components: [
    {
        type: 'number',
        name: 'salary',
        label: 'Salary',
        placeholder: 'Salary',
        isFullWidth: true,
        validation: yup
          .number()
          .required()
    },
    {
        type: 'number',
        name: 'bonus',
        label: 'Bonus',
        placeholder: 'bonus',
        isFullWidth: true,
        validation: yup
          .number()
          .required()
    },
    {
        type: 'number',
        name: 'fined',
        label: 'Fined',
        placeholder: 'Fined',
        isFullWidth: true,
        validation: yup
          .number()
          .required()
    },
    // {
    //     type: 'text',
    //     name: 'paytime',
    //     label: 'Paytime (YYYY-MM-DD)',
    //     placeholder: 'Paytime (YYYY-MM-DD)',
    //     isFullWidth: true,
    //     validation: yup
    //         .string()
    //         .required()
    //         .trim()
    //         .matches(/^(\d{4})-(\d{2})-(\d{2})$/,"Please enter the format YYYY-MM-DD")
    // },
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
