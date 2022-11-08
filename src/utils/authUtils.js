import bcrypt from 'bcryptjs';

const protectUserPassowrd = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const protectedPassword = await bcrypt.hash(password, salt);
  return protectedPassword;
};

export default { protectUserPassowrd };
