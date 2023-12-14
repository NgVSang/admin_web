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
      type: "dropdown-category",
      name: "IDCategory",
      label: "IDCategory",
      placeholder: "IDCategory",
      isFullWidth: true,
      validation: yup.string().required().trim(),
    },
    {
      type: "dropdown",
      name: "type",
      label: "Type",
      placeholder: "Type",
      isFullWidth: true,
      options: [
        { value: "Analog" },
        { value: "Digital" },
      ],
    },
    {
      type: "dropdown-multi",
      name: "color",
      label: "Color",
      placeholder: "Color",
      isFullWidth: true,
      options: [
        { value: "gold" },
        { value: "black" },
        { value: "green" },
        { value: "blue" },
      ],
    },
    {
      type: "dropdown-multi",
      name: "size",
      label: "size",
      placeholder: "Size",
      isFullWidth: true,
      options: [
        { value: "19cm" },
        { value: "20cm" },
        { value: "20.5cm" },
        { value: "21cm" },
        { value: "21.5cm" },
      ],
    },
    {
      type: "text",
      name: "quantity",
      label: "Quantity",
      placeholder: "Quantity",
      isFullWidth: true,
      validation: yup.number().required().default(100),
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
      type: "textarea",
      name: "description",
      label: "Description",
      placeholder: "Description",
      isFullWidth: true,
      validation: yup.string().required().trim(),
    },
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
