import { FormStructure } from "@/types/form";
import * as yup from "yup";
export const updateRolestructure: FormStructure = {
  
  title: "Update Role",
  components: [
    {
      name: "roleName",
      label: "Role Name",
      placeholder: "Role Name",
      isFullWidth: true,
      validation: yup.string().required().trim(),
      disabled:true
    },
    {
      type: "dropdown-multi-permission",
      name: "IDPermission",
      label: "Permission",
      placeholder: "Permission",
      isFullWidth: true,
      options: [],
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
