// models
import User from '../models/user';
import Profile from '../models/profile';

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

  if (created) {
    await Profile.create({
      userId: user.getDataValue('id'),
      ...req.body,
    });
  }

  return {
    created,
    user,
  };
});

const registerUser = controllerHandler(async (req, res) => {
  const { created, user } = await createUser(req, res);

  if (!created) {
    return {
      created,
      message: 'Email already registered.',
    };
  }

  const token = getToken({
    id: user.getDataValue('id'),
    email: user.getDataValue('email'),
  });

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

const findUser = async (query) => {
  const result = await User.findOne({ where: query });
  return result;
};

export {
  registerUser,
  findUser,
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
