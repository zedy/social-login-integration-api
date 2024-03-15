// utils
import controllerHandler from '../utils/controllerHandler';

const loginUserWithCredentials = controllerHandler(async (req, res) => {
  const { message, token, user } = res.locals;

  return {
    message,
    user,
    token,
  };
});

const loginUserWithJWToken = controllerHandler(async (req, res) => {
  const { message, user } = res.locals;

  return {
    message,
    user,
  };
});

export {
  loginUserWithJWToken,
  loginUserWithCredentials,
};
