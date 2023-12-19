import instance from "../axios";

const ENDPOINTS = {
  ORDER: "/order",
};

const getListOrderBySupplier = () => {
  return instance.get(`${ENDPOINTS.ORDER}/list`, {});
};
// const updateUser = (data: any, userId: string) => {
//   return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
// };
const acceptOrderAPI = (id: string, data: any) => {
  return instance.patch(`${ENDPOINTS.ORDER}/${id}/action`, data);
};
const deleteOrderAPI = (id: string) => {
  return instance.delete(`${ENDPOINTS.ORDER}/${id}`, {});
};
export { getListOrderBySupplier, acceptOrderAPI, deleteOrderAPI };
