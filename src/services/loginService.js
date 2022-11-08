import employeeService from './employeeService';

const loginUser = async ({ username, password }) => {
  const user = await employeeService.getEmployeeByCredentials(
    username,
    password
  );
  const token = user.generateAuthToken();
  return token;
};

export default { loginUser };
