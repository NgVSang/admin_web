import instance from "../axios";

const ENDPOINTS = {
  LISTPRODUCT: "/products",
  CATEGORY: "/category",
  SUPPLIER: "/supplier",
  LISTPRODUCT_BY_SUPPLIER : "/supplier/products"
};

const getListProduct = () => {
  return instance.get(ENDPOINTS.LISTPRODUCT, {});
};

const getListProductByIdSupplier = () => {
  return instance.get(ENDPOINTS.LISTPRODUCT_BY_SUPPLIER, {});
};

const getListSupplier = () => {
  return instance.get(ENDPOINTS.SUPPLIER, {});
};
const getListCategory = () => {
  return instance.get(ENDPOINTS.CATEGORY, {});
};

const updateProductAPI = (id: string,data: any) => {
  return instance.put(`${ENDPOINTS.LISTPRODUCT}/${id}`, data);
}
const createProductAPI = (data: any) => {
  return instance.post(ENDPOINTS.LISTPRODUCT, data);
}

// const updateUser = (data: any, userId: string) => {
//   return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
// };

export { getListProduct, getListCategory, createProductAPI, updateProductAPI, getListSupplier, getListProductByIdSupplier };

