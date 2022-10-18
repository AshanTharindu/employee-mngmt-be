import loginService from '../services/loginService';

export const login = async (req, res, next) => {
  try {
    const token = await loginService.loginUser(req.body);
    res.json({ token: token });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};
