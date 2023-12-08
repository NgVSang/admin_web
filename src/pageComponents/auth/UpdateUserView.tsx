import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useCloseModal } from "@/hooks/application.hooks";
import FormHelper from "../FormHelper";
import { updateUserStructure } from "../formStructure/updateUserStructure";
import { IFormData } from "../FormHelper/FormHelper.types";
import toast from "react-hot-toast";
import { updateUser } from "@/services/api/user.api";

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
    };
  }, [userInfor]);

  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        console.log(formData);
        await updateUser(formData, userInfor._id);
        closeModal();
        toast.success("Update success");
        router.reload();
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
