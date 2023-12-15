import { IFormData } from "@/pageComponents/FormHelper/FormHelper.types";
import { FormComponent } from "@/types";

export interface MultiFileUpload {
    onFilesAdded: (files: File[]) => void;
    component?: FormComponent
    onChangeFile?: React.ChangeEventHandler<HTMLInputElement>
    onDeleteFile?: React.MouseEventHandler<HTMLButtonElement>
    formData?: IFormData
    register?: any
    isError?: boolean
    errMsg?: string
}