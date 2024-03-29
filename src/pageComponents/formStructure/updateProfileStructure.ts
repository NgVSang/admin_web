import * as yup from 'yup'
import { FormStructure } from '@/types/form'
import { passwordRegExp } from '@/constants/value'

export const UpdateProfileViewStructure: FormStructure = {
  title: 'Update profile',
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
      type: 'file',
      name: 'image',
      label: 'Image Profile',
      accept: 'image/png, image/gif, image/jpeg, image/jpg',
      placeholder: 'Image Profile',
      isFullWidth: true,
      // validation: yup
      //   .object()
      //   .shape({
      //     lastModified: yup.string(),
      //     name: yup.string(),
      //     size: yup.string(),
      //     lastModifiedDate: yup.string(),
      //     type: yup.string(),
      //     webkitRelativePath: yup.string(),
      //   })
      //   .required('File is required'),
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
