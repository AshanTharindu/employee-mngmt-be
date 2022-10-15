import employeeRepositary from "../repositories/employeeRepositary"

/**
 * Gets all the employees.
 * @returns 
 */
const getEmployees = async () => {
    return await employeeRepositary.getEmployees();
}

/**
 * Registeres the employee.
 * @param {*} employee 
 * @returns 
 */
const registerEmployee = async (employee) => {
    return await employeeRepositary.registerEmployee(employee);
}

export default {getEmployees, registerEmployee}