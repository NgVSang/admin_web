import instance from "../axios"

const ENDPOINTS = {
    UPDATESALARY: '/admin/manage-salary/',
}

const updateSalary = (data: {
    salary :number,
    bonus: number,
    fined: number,
    month: string,
}, id:string) => {
    return instance.post(ENDPOINTS.UPDATESALARY + id,{
        ...data
    })
}

const SalaryApi = {
    updateSalary
}

export default SalaryApi