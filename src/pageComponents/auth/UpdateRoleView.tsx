import { useCloseModal } from "@/hooks/application.hooks";
import { updatePermissionToRole } from "@/services/api/role.api";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import FormHelper from "../FormHelper";
import { IFormData } from "../FormHelper/FormHelper.types";
import { updateRolestructure } from "../formStructure/updateRoleStructure";

const UpdateRoleView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal();
  const router = useRouter();
  const roleInf = JSON.parse(localStorage.getItem("role") || "");
  
  const initValue = useMemo(() => {
    return {
        ...roleInf,
        IDPermission: roleInf?.IDPermission?.map((item: any) => ({ id: item._id, name: item.title })),
    };
  }, [roleInf]);
  
  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        await updatePermissionToRole(roleInf?._id,{
          ids: formData?.IDPermission?.map((item:any)=> item?.value)
        })
        toast.success("Update success");
        closeModal();
        // setTimeout(() => {
        router.reload();
        // }, 1000);
      } catch (err: any) {
        toast.error(err.message);
        closeModal();
      }
    },
    [closeModal, router, roleInf._id]
  );

  const onBtnClickHandler = useMemo(
    () => ({
      cancel: closeModal,
    }),
    [closeModal]
  );

  return (
    <FormHelper
      initValues={initValue}
      formStructure={updateRolestructure}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClickHandler}
    />
  );
};

export default UpdateRoleView;
