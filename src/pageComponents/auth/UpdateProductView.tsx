import { useCloseModal } from "@/hooks/application.hooks";
import { updateProductAPI } from "@/services/api/product.api";
import { imageTocloudinary } from "@/utils/imageToCloudinary";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import FormHelper from "../FormHelper";
import { IFormData } from "../FormHelper/FormHelper.types";
import { updateProductStructure } from "../formStructure/updateProductStructure";

const UpdateProductView: React.FC = () => {
  // Form State
  const closeModal = useCloseModal();
  const router = useRouter();
  const productInf = JSON.parse(localStorage.getItem("product") || "");
  
  const initValue = useMemo(() => {
    return {
      IDCategory: productInf?.IDCategory[0]?._id,
      type: productInf.type,
      nameProduct: productInf.nameProduct,
      pictureLinks: productInf.pictureLinks,
      description: productInf.description,
      color: productInf.color.map((item: any) => ({ id: item, name: item })),
      size: productInf.size.map((item: any) => ({ id: item, name: item })),
      price: Number(productInf.price),
      quantity: Number(productInf.quantity),
    };
  }, [productInf]);
  
  const handleSubmit = useCallback(
    async (formData: IFormData) => {
      try {
        const uploadImageToCloudinary = await Promise.all(
          formData?.pictureLinks?.map((file: File) => {
            if (typeof file === "string") {
              return file;
            }
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
          color: formData.color?.map((item: any) => typeof item === "string"? item: item.value) ?? [],
          size: formData.size?.map((item: any) =>  typeof item === "string"? item: item.value) ?? [],
          price: Number(formData.price),
          quantity: Number(formData.quantity),
        };
        await updateProductAPI(productInf._id,data);
        toast.success("Update success");
        closeModal();
        setTimeout(() => {
          router.reload();
        }, 1000);
      } catch (err: any) {
        toast.error(err.message);
        closeModal();
      }
    },
    [closeModal, router, productInf._id]
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
      formStructure={updateProductStructure}
      onSubmit={handleSubmit}
      onBtnClick={onBtnClickHandler}
    />
  );
};

export default UpdateProductView;
