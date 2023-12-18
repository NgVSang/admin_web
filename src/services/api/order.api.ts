import instance from "../axios";

const ENDPOINTS = {
  ORDER: "/order",
};

const getListOrderBySupplier = () => {
  return instance.get(ENDPOINTS.ORDER, {});
};
// const updateUser = (data: any, userId: string) => {
//   return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
// };
const acceptOrderAPI = (id: string, data: any) => {
  return instance.patch(`${ENDPOINTS.ORDER}/${id}/action`, data);
};
const cancelOrderAPI = (id: string, data: any) => {
  return instance.patch(`${ENDPOINTS.ORDER}/${id}/action`, data);
};
export { getListOrderBySupplier, acceptOrderAPI };
