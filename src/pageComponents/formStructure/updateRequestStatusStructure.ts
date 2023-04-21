import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const updateRequestStatusStructure: FormStructure = {
  title: 'Update Status',
  description: 'Are you sure to update this request?',
  components: [
    {
      type: 'submit',
      name: 'update',
      label: 'Update',
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
