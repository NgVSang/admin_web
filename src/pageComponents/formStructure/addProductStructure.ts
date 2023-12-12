import { FormStructure } from "@/types/form";
import * as yup from "yup";

export const addProductStructure: FormStructure = {
  title: "Create Product",
  components: [
    {
      type: "text",
      name: "nameProduct",
      label: "Name Product",
      placeholder: "Name Product",
      isFullWidth: true,
      validation: yup.string().required().trim(),
    },
    {
      type: "text",
      name: "price",
      label: "Price",
      placeholder: "Price",
      isFullWidth: true,
      validation: yup.number().required().default(100),
    },
    {
      type: "dropdown-multi",
      name: "color",
      label: "Color",
      placeholder: "Color",
      isFullWidth: true,
    },
    // {
    //   type: "dropdown-multi",
    //   name: "type",
    //   label: "Color",
    //   placeholder: "Color",
    //   isFullWidth: true,
    // },
    {
      type: "multi-file",
      name: "image",
      label: "Image Profile",
      accept: "image/png, image/gif, image/jpeg, image/jpg",
      placeholder: "Image Product",
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
      type: "submit",
      name: "create",
      label: "Create",
      placeholder: "",
      isFullWidth: false,
    },
    {
      type: "button",
      name: "cancel",
      label: "Cancel",
      placeholder: "",
      isFullWidth: false,
    },
  ],
};
