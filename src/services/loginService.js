import { RegisteredEmployee } from '../models/RegisteredEmployee';

/**
 * Verify the username and passoword
 * Generate the JWT token.
 * This token is required for all the protected routes.
 * @param {*} param0 
 * @returns 
 */
const loginUser = async ({ username, password }) => {
  const user = await RegisteredEmployee.findByCredentials(username, password);
  const token = user.generateAuthToken()
  return token;
};

export default { loginUser };
