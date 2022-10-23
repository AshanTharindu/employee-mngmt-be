import bcrypt from 'bcryptjs';
import { EMPLOYEE_TYPES } from '../constants/constants';
import { Comment } from '../models/Comment';
import { Employee } from '../models/Employee';
import { RegisteredEmployee } from '../models/RegisteredEmployee';

/**
 * Gets all the employees.
 * @returns employee list
 */
const getEmployees = async () => {
  const employees = await Employee.find({ archived: 0 })
    .lean()
    .populate([
      {
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'author',
            model: RegisteredEmployee,
            select: 'firstname lastname',
          },
        ],
      },
    ]);
  const registeredEmployees = await RegisteredEmployee.find({
    archived: 0,
  })
    .lean()
    .populate([
      {
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'author',
            model: RegisteredEmployee,
            select: 'firstname lastname',
          },
        ],
      },
    ]);
  // contact both registered/unregistered employees
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
 * @returns registered employee
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
 * @returns added employees list
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
 * @returns updated employee
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
  await employee.save();
  employee = await getEmployeeById(id, type);
  return employee;
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

/**
 * Get employee by the id of the employee
 * @param {*} id 
 * @param {*} type 
 * @returns employee
 */
const getEmployeeById = async (id, type) => {
  let employee;
  if (type === EMPLOYEE_TYPES.REGISTERED) {
    employee = await RegisteredEmployee.findById(id).populate([
      {
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'author',
            model: RegisteredEmployee,
            select: 'firstname lastname',
          },
        ],
      },
    ]);
  } else {
    employee = await Employee.findById(id).populate([
      {
        path: 'comments',
        model: Comment,
        populate: [
          {
            path: 'author',
            model: RegisteredEmployee,
            select: 'firstname lastname',
          },
        ],
      },
    ]);
  }

  return employee;
};

export default {
  getEmployees,
  registerEmployee,
  addEmployees,
  updateEmployee,
  deleteEmployee,
};
