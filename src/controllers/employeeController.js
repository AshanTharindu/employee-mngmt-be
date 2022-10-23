import employeeService from '../services/employeeService';


/**
 * Employee controller
 * @param {*} req 
 * @param {*} res 
 */
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
    // todo this can be moved to a error handler middleware 
    if (
      err.message.includes(
        'E11000 duplicate key error collection: test.registeredemployees index: username_1 dup key'
      )
    ) {
      res.status(500).send({ msg: 'username already taken' });
    }
    else if (
      err.message.includes(
        'E11000 duplicate key error collection: test.registeredemployees index: email_1 dup key'
      )
    ) {
      res.status(500).send({ msg: 'email already taken' });
    } else {
      res.status(500).send({ msg: err.message });
    }
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
    const { body, params, query } = req;
    const updatedEmployee = await employeeService.updateEmployee(
      params.id,
      query.type,
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
    const { params, query } = req;
    await employeeService.deleteEmployee(params.id, query.type);
    res.status(200).send({ msg: `Employee ${params.id} deleted.` });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};
