import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useCloseModal } from "@/hooks/application.hooks";
import { useDispatch, useSelector } from "react-redux";
import FormHelper from "../FormHelper";
import { UpdateProfileViewStructure } from "../formStructure/updateProfileStructure";
import { IFormData } from "../FormHelper/FormHelper.types";
import * as authApi from "@/services/api/auth.api";
import { AppDispatch } from "@/store/store";
import toast from "react-hot-toast";
import instance from "@/services/axios";
import { authSelector } from "@/reducer";

const UpdateProfileView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(authSelector);

  const initValue = useMemo(() => {
    return {
      name: user?.account?.userName,
      email: user?.account?.email,
      phoneNumber: user?.phone,
    };
  }, [user]);

  const clickUpdate = useCallback(async (form: IFormData) => {
    try {
      const formData = new FormData();
      if (form.image) {
        formData.append("photos", form.image);
      }
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phoneNumber", form.phoneNumber);
      console.log(formData);
      const data = {
        name: form.name as string,
        email: form.email as string,
        phoneNumber: form.phoneNumber as string,
      };
      console.log(data);

      const imageUrl = await authApi.updateProfile(formData);
      //@ts-ignore
      toast.success("Update success!");
      // dispatch(setCredentials({
      //   ...userInfo,
      //   ...data,
      //   profilePicture: imageUrl.data.imageUrl
      // }))
      closeModal();
    } catch (err) {
      toast.error("Update information fail!");
    }
  }, []);

  const onBtnClickHandler = useMemo(
    () => ({
      cancel: closeModal,
    }),
    []
  );

  return (
    <FormHelper
      formStructure={UpdateProfileViewStructure}
      onSubmit={clickUpdate}
      initValues={initValue}
      onBtnClick={onBtnClickHandler}
    />
  );
};

export default UpdateProfileView;
