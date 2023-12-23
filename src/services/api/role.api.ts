import instance from "../axios";

const ENDPOINTS = {
  ROLE: "/role",
  PERMISSION: "/role/permission"
};

const getListRoleAPI = () => {
  return instance.get(ENDPOINTS.ROLE, {});
};

const getListPermissionAPI = () => {
  return instance.get(ENDPOINTS.PERMISSION, {});
};

const updatePermissionToRole = (id:string,data:any) => {
  return instance.patch(`${ENDPOINTS.ROLE}/${id}/add`,data)
}

export { getListPermissionAPI, getListRoleAPI, updatePermissionToRole };

