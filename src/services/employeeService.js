import bcrypt from 'bcryptjs';
import { Employee } from '../models/Employee';
import { RegisteredEmployee } from '../models/RegisteredEmployee';

/**
 * Gets all the employees.
 * @returns
 */
const getEmployees = async () => {
  const employees = await Employee.find({ archived: 0 });
  const registeredEmployees = await RegisteredEmployee.find({ archived: 0 });
  return [...employees, ...registeredEmployees];
};

/**
 * Registeres the employee.
 * @param {*} employee
 * @returns
 */
const registerEmployee = async (employee) => {
  const salt = await bcrypt.genSalt(10);
  employee.password = await bcrypt.hash(employee.password, salt);
  employee.registered = 1;
  const registeredEmployeeModel = new RegisteredEmployee(employee);
  await registeredEmployeeModel.save();
};

/**
 * Registeres the employee.
 * @param {*} employee
 * @returns
 */
const addEmployees = async (employees) => {
  employees = employees.map((employee) => {
    employee.registered = 0;
    return employee;
  });
  const savedEmployees = await Employee.insertMany(employees);
  return savedEmployees;
};

/**
 * Updates the employee with the sent update
 * Error if employee not found or already delete
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

/**
 * Deletes the employee of given id.
 * Error if employee not found or already deleted
 * @param {*} id
 */
const deleteEmployee = async (id) => {
  const employee = await Employee.findById(id);
  if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is already deleted.`
    );
  employee.archived = 1;
  await employee.save();
};

export default {
  getEmployees,
  registerEmployee,
  addEmployees,
  updateEmployee,
  deleteEmployee,
};
