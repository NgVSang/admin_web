import { FormStructure } from '@/types/form'
import * as yup from 'yup'
// import { passwordRegExp } from '@constants/value'

export const loginStructure: FormStructure = {
  title: 'Sign in',
  components: [
    {
      type: 'text',
      name: 'email',
      label: 'Enter your email',
      placeholder: 'Enter your email',
      isFullWidth: true,
      validation: yup.string().trim().required('Email is required'),
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
        // .min(7, 'Passwords must be longer than 7 chars and include numbers.')
        .required('Please enter a valid password!')
        // .matches(
        //   passwordRegExp,
        //   'Passwords must be longer than 7 chars and include numbers.'
        // ),
    },
    // {
    //   type: 'checkbox',
    //   name: 'rememberMe',
    //   label: 'Remember me',
    //   isFullWidth: false,
    // },
    // {
    //   type: 'link',
    //   name: 'forgotPassword',
    //   label: 'Forgot password?',
    //   isFullWidth: false,
    //   outline: false,
    // },
    {
      type: 'submit',
      name: 'logIn',
      label: 'Log In',
      placeholder: '',
      isFullWidth: true,
    },
    // {
    //   type: 'link',
    //   name: 'joinNow',
    //   label: 'Join now',
    //   text: 'New to Arbre?',
    //   isFullWidth: true,
    // },
  ],
}
