import employeeService from '../services/employeeService';

export const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).send(employees);
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};

export const registerEmployee = async (req, res) => {
  try {
    const employee = req.body;
    const registeredEmployee = await employeeService.registerEmployee(employee);
    res.status(201).send(registeredEmployee);
  } catch (err) {
    console.log(err);
    res.json({ msg: err.message });
  }
};

export const addEmployees = async (req, res) => {
  try {
    const { employees } = req.body;
    const savedEmployees = await employeeService.addEmployees(employees);
    res.status(201).send(savedEmployees);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { body, params } = req;
    const updatedEmployee = await employeeService.updateEmployee(
      params.id,
      body
    );
    res.status(200).send(updatedEmployee);
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    await employeeService.deleteEmployee(id);
    res.status(200).send({ msg: `Employee ${id} deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};
