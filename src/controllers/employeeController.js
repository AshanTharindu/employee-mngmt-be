import employeeService from '../services/employeeService';

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees();
    res.json(employees);
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};

export const registerEmployee = async (req, res, next) => {
  try {
    const employee = req.body;
    const registeredEmployee = await employeeService.registerEmployee(employee);
    res.json(registeredEmployee);
  } catch (err) {
    console.log(err);
    res.json({msg: err.message})
  }
};
