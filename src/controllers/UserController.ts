// models
import User from '../models/user';

// utils
import controllerHandler from '../utils/controllerHandler';
import { getToken } from '../utils/jwt';

const createUser = controllerHandler(async (req) => {
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      salt: '',
      ...req.body,
    },
  });

  const token = getToken({
    id: user.getDataValue('id'),
    email: user.getDataValue('email'),
  });

  if (!created) {
    return {
      created,
      message: 'Email already registered.',
    };
  }

  return {
    created,
    message: 'User created successfully.',
    token,
    user,
  };
});

const updateUser = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.update(id, req.body);
  return result;
});

const getUserById = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.findByPk(id);
  return result;
});

const deleteUserById = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await User.destroy(id);
  return result;
});

export {
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
