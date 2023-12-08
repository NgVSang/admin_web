import * as yup from "yup";
import { FormStructure } from "@/types/form";

export const updateUserStructure: FormStructure = {
  title: "Update User",
  components: [
    {
      type: "text",
      name: "firstName",
      label: "First name",
      placeholder: "First name",
      isFullWidth: true,
      validation: yup.string().required().trim(),
    },
    {
      type: "text",
      name: "lastName",
      label: "Last name",
      placeholder: "Last name",
      isFullWidth: true,
      validation: yup.string().required().trim(),
    },
    {
      type: "text",
      name: "phone",
      label: "Phone Number",
      placeholder: "Phone Number",
      isFullWidth: true,
      validation: yup
        .string()
        .required()
        .trim()
        .matches(
          /^(\+84|84|0){1}([3|5|7|8|9]){1}([0-9]{8})$/,
          "Mush be a valid phone number"
        ),
    },
    {
      type: "submit",
      name: "create",
      label: "Update",
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
