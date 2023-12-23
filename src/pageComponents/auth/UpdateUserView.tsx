import { useCloseModal } from "@/hooks/application.hooks";
import { updateRoleUser, updateUser } from "@/services/api/user.api";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import FormHelper from "../FormHelper";
import { IFormData } from "../FormHelper/FormHelper.types";
import { updateUserStructure } from "../formStructure/updateUserStructure";

const UpdateUserView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal();
  const router = useRouter();
  const userInfor = JSON.parse(localStorage.getItem("user") || "");
  const initValue = useMemo(() => {
    return {
      firstName: userInfor.firstName,
      lastName: userInfor.lastName,
      phone: userInfor.phone,
      roles: userInfor?.Roles?.map((item:any)=>({id:item?._id, name:item?.roleName}))
    };
  }, [userInfor]);
  
  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        const {roles,...newDataUpdate} = formData
        await Promise.all([
          updateUser(newDataUpdate, userInfor?._id),
          updateRoleUser({roleIds: roles?.map((item:any)=>item?.value)}, userInfor?._id)
        ]).then(res=>{
          toast.success("Update success");
          closeModal();
          router.reload();
        })
      } catch (err: any) {
        toast.error(err.message);
        closeModal();
      }
    },
    [closeModal, router, userInfor._id]
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
      formStructure={updateUserStructure}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClickHandler}
    />
  );
};

export default UpdateUserView;
