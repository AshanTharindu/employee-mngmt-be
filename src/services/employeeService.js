import { Employee } from '../models/Employee';
import employeeRepositary from '../repositories/employeeRepositary';
import bcrypt from 'bcryptjs'

/**
 * Gets all the employees.
 * @returns
 */
const getEmployees = async () => {
  const employees = Employee.find();
  return employees;
};

/**
 * Registeres the employee.
 * @param {*} employee
 * @returns
 */
const registerEmployee = async (employee) => {
  console.log(
    '🚀 ~ file: employeeService.js ~ line 19 ~ registerEmployee ~ employee',
    employee
  );
  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password, salt);
  const employeeModel = new Employee(employee);
  await employeeModel.save();
};

export default { getEmployees, registerEmployee };
