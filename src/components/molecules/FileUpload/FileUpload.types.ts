import { IFormData } from "@/pageComponents/FormHelper/FormHelper.types";
import { FormComponent } from "@/types/form";

export interface FileUploadProps {
    component: FormComponent
    onChangeFile?: React.ChangeEventHandler<HTMLInputElement>
    onDeleteFile?: React.MouseEventHandler<HTMLButtonElement>
    formData?: IFormData
    register?: any
    isError?: boolean
    errMsg?: string
}