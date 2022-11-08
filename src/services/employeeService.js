import { EMPLOYEE_TYPES } from '../constants/constants';
import employeeRepositary from '../repositories/employeeRepositary';
import authUtils from '../utils/authUtils';

/**
 * Gets all the employees.
 * @returns
 */
const getEmployees = async () => {
  const employees = await employeeRepositary.findEmployees();
  const registeredEmployees =
    await employeeRepositary.findRegisteredEmployees();

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
  employee.password = await authUtils.protectUserPassowrd(employee.password);
  employee.registered = 1;
  await employeeRepositary.registerEmployee(employee);
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
  const savedEmployees = await employeeRepositary.saveEmployees(employees);
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
    employee = await employeeRepositary.findRegisteredEmployeeById(id);
  } else {
    employee = await employeeRepositary.findEmployeeById(id);
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
  await employee.save();
  employee = await getEmployeeById(id, type);
  return employee;
};

/**
 * Deletes the employee of given id.
 * Not hard deleting from the database, becasue we might need that data later,
 * Instead deleting add the archive flag.
 * Error if employee not found or already deleted
 * @param {*} id
 */
const deleteEmployee = async (id, type) => {
  let employee;
  if (type === EMPLOYEE_TYPES.REGISTERED) {
    employee = await employeeRepositary.findRegisteredEmployeeById(id);
  } else {
    employee = await employeeRepositary.findEmployeeById(id);
  }
  if (employee.archived)
    throw new Error(
      `Employee ${employee.firstname} ${employee.lastname} is already deleted.`
    );
  employee.archived = 1;
  await employee.save();
};

const getEmployeeById = async (id, type) => {
  if (type === EMPLOYEE_TYPES.REGISTERED)
    return employeeRepositary.findRegisteredEmployeeByIdWithEnrichedData(id);

  return employeeRepositary.findEmployeeByIdWithEnrichedData(id);
};

const getEmployeeByCredentials = async (username, password) => {
  const user = await employeeRepositary.findEmployeeByCredentials(
    username,
    password
  );
  return user;
};

export default {
  getEmployees,
  registerEmployee,
  addEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  getEmployeeByCredentials
};
