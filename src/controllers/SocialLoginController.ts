// models
import SocialLogin from '../models/socialLogin';

// utils
import controllerHandler from '../utils/controllerHandler';

const createSocialLogin = controllerHandler(async (req) => {
  const data = await SocialLogin.create({
    ...req.body,
  });

  return {
    data,
  };
});

const deleteSocialLoginById = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await SocialLogin.destroy(id);
  return result;
});

export {
  createSocialLogin,
  deleteSocialLoginById,
};
