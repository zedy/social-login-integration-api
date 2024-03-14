// models
import User from '../models/user';

// utils
import controllerHandler from '../utils/controllerHandler';

const createUser = controllerHandler(async (req) => {
  const result = await User.create(req.body);

  return result;
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
