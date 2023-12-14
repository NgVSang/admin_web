import * as yup from "yup";

export interface FormComponent {
  type:
    | "text"
    | "number"
    | "datePicker"
    | "button"
    | "submit"
    | "switch"
    | "textarea"
    | "tel"
    | "email"
    | "logo"
    | "dropdown"
    | "space"
    | "password"
    | "checkbox"
    | "link"
    | "file"
    | "multi-file"
    | "title"
    | "element"
    | "country"
    | "dropdown-category"
    | "dropdown-multi"
    | "currency"
    | "text-editor"
    | "autocomplete"
    | "description"
    | "formTitle";
  name: string;
  fieldName?: string;
  subName?: string;
  label?: string;
  placeholder?: string;
  default?: string | Date | number | boolean;
  isFullWidth?: boolean;
  validation?: yup.AnySchema;
  options?: {
    label?: string | number;
    value: string | number;
    name?: string | number;
    default?: boolean;
  }[];
  onSearch?: any;
  disabled?: boolean;
  primary?: boolean;
  outline?: boolean;
  text?: string;
  href?: string;
  description?: string;
  accept?: string;
  customComponent?: React.ReactElement;
  onChange?: any;
  onSubmit?: any;
  renderIcon?: (_: string) => React.ReactNode;
  ratio?: number;
  group?: string;
  subTitle?: {
    label: string;
    link?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

export interface FormStructure {
  title?: string;
  description?: string;
  components: FormComponent[];
}
