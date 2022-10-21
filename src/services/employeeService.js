import bcrypt from 'bcryptjs';
import { EMPLOYEE_TYPES } from '../constants/constants';
import { Employee } from '../models/Employee';
import { RegisteredEmployee } from '../models/RegisteredEmployee';

/**
 * Gets all the employees.
 * @returns
 */
const getEmployees = async () => {
  const employees = await Employee.find({ archived: 0 }).lean();
  const registeredEmployees = await RegisteredEmployee.find({ archived: 0 });

  return [
    ...employees.map((emp) => {
      emp.registered = 0;
      return emp;
    }),
    ...registeredEmployees.map((regEmp) => {
      regEmp.registered = 1;
      return regEmp;
    }),
  ];
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
const updateEmployee = async (id, type, employeeUpdate) => {
  let employee;
  if (type === EMPLOYEE_TYPES.REGISTERED) {
    employee = await RegisteredEmployee.findById(id);
  } else {
    employee = await Employee.findById(id);
  }
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
const deleteEmployee = async (id, type) => {
  let employee;
  if (type === EMPLOYEE_TYPES.REGISTERED) {
    employee = await RegisteredEmployee.findById(id);
  } else {
    employee = await Employee.findById(id);
  }
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
