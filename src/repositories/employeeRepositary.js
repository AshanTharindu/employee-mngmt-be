import { Employee } from '../models/Employee';
import { RegisteredEmployee } from '../models/RegisteredEmployee';
import { Comment } from '../models/Comment';

/**
 * Gets all the employees.
 * @returns
 */
const findEmployees = async () => {
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

  return employees;
};

const findRegisteredEmployees = async () => {
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

  return registeredEmployees;
};

const findRegisteredEmployeeById = async (id) => {
  const employee = await RegisteredEmployee.findById(id);
  return employee;
};

const findEmployeeById = async (id) => {
  const employee = await Employee.findById(id);
  return employee;
};

const saveEmployees = async (employees) => {
  const savedEmployees = await Employee.insertMany(employees);
  return savedEmployees;
};

const registerEmployee = async (employee) => {
  const registeredEmployeeModel = new RegisteredEmployee(employee);
  await registeredEmployeeModel.save();
};

const findEmployeeByIdWithEnrichedData = async (id) => {
  const employee = await Employee.findById(id).populate([
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
  return employee;
};

const findRegisteredEmployeeByIdWithEnrichedData = async (id, type) => {
  const registeredEmployee = await RegisteredEmployee.findById(id).populate([
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
  return registeredEmployee;
};

const findEmployeeByCredentials = async(username, password) => {
  const user = await RegisteredEmployee.findByCredentials(username, password);
  return user;
}

export default {
  findEmployees,
  findRegisteredEmployees,
  saveEmployees,
  registerEmployee,
  findEmployeeById,
  findRegisteredEmployeeById,
  findRegisteredEmployeeByIdWithEnrichedData,
  findEmployeeByIdWithEnrichedData,
  findEmployeeByCredentials
};
