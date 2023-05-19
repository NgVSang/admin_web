import * as yup from 'yup'
import { FormStructure } from '@/types/form'

export const addImagesTrainingStructure: FormStructure = {
  title: 'Images training',
  components: [
    {
        type: 'file',
        name: 'images',
        label: 'Image Profile',
        accept: 'image/png, image/gif, image/jpeg, image/jpg',
        placeholder: 'Image Profile',
        isFullWidth: true,
    },  
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
