import instance from "../axios";

const ENDPOINTS = {
  LISTPRODUCT: "/products",
  CATEGORY: "/category",
};

const getListProduct = () => {
  return instance.get(ENDPOINTS.LISTPRODUCT, {});
};

const getListCategory = () => {
  return instance.get(ENDPOINTS.CATEGORY, {});
};

// const updateUser = (data: any, userId: string) => {
//   return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
// };

export { getListProduct, getListCategory };
