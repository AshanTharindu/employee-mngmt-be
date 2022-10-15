import employeeService from '../services/employeeService';

export const getEmployees = async (req, res, next) => {
  try {
    await employeeService.getEmployees();
    res.json([
      { name: 'ashan', role: 'admin' },
      { name: 'ashan', role: 'manager' },
    ]);
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};

export const registerEmployee = async (req, res, next) => {
  try {
    return await employeeService.registerEmployee();
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};
