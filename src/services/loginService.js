import { RegisteredEmployee } from '../models/RegisteredEmployee';

const loginUser = async ({ username, password }) => {
  const user = await RegisteredEmployee.findByCredentials(username, password);
  const token = user.generateAuthToken()
  return token;
};

export default { loginUser };
