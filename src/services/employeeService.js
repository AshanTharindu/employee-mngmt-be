import employeeRepositary from "../repositories/employeeRepositary"

const getEmployees = async () => {
    return await employeeRepositary.getEmployees();
}
const registerEmployee = async () => {
    return await employeeRepositary.registerEmployee();
}

export default {getEmployees, registerEmployee}