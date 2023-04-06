import { FormStructure } from '@/types/form'

export interface FormHelperProps {
  formStructure: FormStructure
  initValues?: IFormData
  onSubmit?: (formData: IFormData) => Promise<void>
  errorText?: string
  localStorageName?: string
  validationFalseMsg?: string
  onBtnClick?: {
    [name: string]: (e: React.MouseEvent<HTMLButtonElement>) => void
  }
  isMultipleFile?: boolean
  onChangeHandler?: {
    [name: string]: (e: React.ChangeEvent<any>) => void
  }
  onKeyBoardHandler?: {
    [name: string]: (e: React.KeyboardEvent<HTMLInputElement>) => void
  }
  formDirection?: 'horizontal' | 'vertical'
  onAddFile?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile?: (file: File) => void
  customStyle?: string
}

export interface IParam {
  key: string
  value: string
}

export interface IFormData {
  [key: string]:
  | string
  | number
  | boolean
  | File
  | FileList
  | null
  | undefined
  | any
}
