import loginService from '../services/loginService';

export const login = async (req, res, next) => {
  try {
    const token = await loginService.loginUser(req.body);
    res.status(200).send({ token: token });
  } catch (err) {
    console.log(err);
    res.status(401).send({ msg: `Authentication Failed` });
  }
};
