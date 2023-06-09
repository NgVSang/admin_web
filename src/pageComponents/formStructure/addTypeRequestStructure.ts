import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const addTypeRequestStructure: FormStructure = {
  title: 'Update Salary',
  components: [
    {
        type: 'text',
        name: 'name',
        label: 'Type name',
        placeholder: 'Type name',
        isFullWidth: true,
        validation: yup
          .string()
          .required()
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
