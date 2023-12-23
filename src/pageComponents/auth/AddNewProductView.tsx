import { useCloseModal } from "@/hooks/application.hooks";
import { createProductAPI } from "@/services/api/product.api";
import { imageTocloudinary } from "@/utils/imageToCloudinary";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import FormHelper from "../FormHelper";
import { IFormData } from "../FormHelper/FormHelper.types";
import { addProductStructure } from "../formStructure/addProductStructure";

const AddNewProductView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCreateUser = useCallback(async (formData: IFormData) => {
    console.log(formData);
    try {
      const uploadImageToCloudinary = await Promise.all(
        formData?.pictureLinks?.map((file: File) => {
          return imageTocloudinary(file);
        })
      );
      formData.pictureLinks = [...uploadImageToCloudinary];
      const data = {
        IDCategory: formData.IDCategory,
        type: formData.type,
        nameProduct: formData.nameProduct,
        pictureLinks: formData.pictureLinks ?? [],
        description: formData.description,
        color:
          formData.color?.map((item: any) =>
            typeof item === "string" ? item : item.value
          ) ?? [],
        size:
          formData.size?.map((item: any) =>
            typeof item === "string" ? item : item.value
          ) ?? [],
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };
      await createProductAPI(data);
      toast.success("Success!");
      closeModal();
      // setTimeout(() => {
      router.reload();
      // }, 1000);
    } catch (err: any) {
      toast.error(err.message);
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
      formStructure={addProductStructure}
      onSubmit={handleCreateUser}
      onBtnClick={onBtnClickHandler}
    />
  );
};

export default AddNewProductView;
