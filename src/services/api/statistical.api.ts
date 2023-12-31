import instance from "../axios";

const ENDPOINTS = {
    STATISTICAL: "/statistical",
};

const getStatistical = (data: any) => {
    return instance.patch(ENDPOINTS.STATISTICAL, { ...data });
};

const getStatisticalBySupplier = (id: any, data: any) => {
    return instance.patch(`${ENDPOINTS.STATISTICAL}/${id}`, { ...data });
};
const getStatisticalTotalBySupplier = (id: any) => {
    return instance.get(`${ENDPOINTS.STATISTICAL}/${id}/total`);
};

export { getStatistical, getStatisticalBySupplier, getStatisticalTotalBySupplier };

