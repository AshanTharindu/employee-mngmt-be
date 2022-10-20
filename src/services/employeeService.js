import { Employee } from '../models/Employee';
import employeeRepositary from '../repositories/employeeRepositary';
import bcrypt from 'bcryptjs';

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
  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password, salt);
  const employeeModel = new Employee(employee);
  await employeeModel.save();
};

/**
 * Registeres the employee.
 * @param {*} employee
 * @returns
 */
const addEmployees = async (employees) => {
  const savedEmployees = await Employee.insertMany(employees);
  return savedEmployees;
};

/**
 * Updates the employee with the sent update
 * @param {*} id
 * @param {*} employeeUpdate
 * @returns
 */
const updateEmployee = async (id, employeeUpdate) => {
  const employee = await Employee.findById(id);
  if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is deleted.`
    );
  // Update the document with new data
  Object.keys(employeeUpdate).forEach((empKey) => {
    employee[empKey] = employeeUpdate[empKey];
  });
  // Reason for using save instead of updateOne/update : run the schema validations and middleware
  return await employee.save();
};

const deleteEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is already deleted.`
    );
  employee.archived = 1;
  await employee.save()
};

export default {
  getEmployees,
  registerEmployee,
  addEmployees,
  updateEmployee,
  deleteEmployee,
};
