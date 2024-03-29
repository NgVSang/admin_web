import instance from "../axios";

const ENDPOINTS = {
  LISTUSER: "/user/",
  CREATEUSER: "/admin/create-user",
  UPDATEUSER: "/user/",
};

const getListUser = () => {
  return instance.get(ENDPOINTS.LISTUSER, {});
};

const createUser = (data: any) => {
  return instance.post(ENDPOINTS.CREATEUSER, data);
};

const updateUser = (data: any, userId: string) => {
  return instance.put(ENDPOINTS.UPDATEUSER + userId, data);
};
const updateRoleUser = (data: any, userId: string) => {
  return instance.post(ENDPOINTS.UPDATEUSER + userId + "/role", data);
};

export { getListUser, createUser, updateUser, updateRoleUser };

