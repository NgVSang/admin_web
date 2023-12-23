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
const deleteProductAPI = (id: string) => {
  return instance.delete(`${ENDPOINTS.LISTPRODUCT}/${id}`);
}
// const updateUser = (data: any, userId: string) => {
//   return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
// };
const listRequestSupplierAPI = () => {
  return instance.get(`${ENDPOINTS.SUPPLIER}/list-request`, {});
}
const acceptSupplierAPI = (data: any) => {
  return instance.post(`${ENDPOINTS.SUPPLIER}/accept`, {...data});
}
export { acceptSupplierAPI, getListProduct, getListCategory, createProductAPI, updateProductAPI, getListSupplier, getListProductByIdSupplier, deleteProductAPI, listRequestSupplierAPI };

