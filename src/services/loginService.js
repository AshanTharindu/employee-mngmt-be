import { Employee } from '../models/Employee';

const loginUser = async ({ username, password }) => {
  const user = await Employee.findByCredentials(username, password);
  const token = user.generateAuthToken()
  return token;
};

export default { loginUser };
