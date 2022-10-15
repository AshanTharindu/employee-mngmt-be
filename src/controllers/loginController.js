import loginService from '../services/loginService';

export const login = async (req, res, next) => {
  try {
    await loginService.loginUser();
    res.json('success');
  } catch (err) {
    console.log(err);
    req.err(err);
  }
};
