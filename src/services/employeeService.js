import { Employee } from "../models/Employee";
import employeeRepositary from "../repositories/employeeRepositary"

/**
 * Gets all the employees.
 * @returns 
 */
const getEmployees = async () => {
    const employees = Employee.find();
    return employees;
}

/**
 * Registeres the employee.
 * @param {*} employee 
 * @returns 
 */
const registerEmployee = async (employee) => {
    const employeeModel = new Employee(employee);
    await employeeModel.save()
}

export default {getEmployees, registerEmployee}