// models
import User from '../models/user';

const createUser = async (req) => {
  const result = await User.create(req.body);

  return result;
};

const updateUser = async (req) => {
  const { id } = req.params;

  const result = await User.update(id, req.body);
  return result;
};

const getUserById = async (req) => {
  const { id } = req.params;

  const result = await User.findByPk(id);
  return result;
};

const deleteUserById = async (req) => {
  const { id } = req.params;

  const result = await User.destroy(id);
  return result;
};

export {
  getUserById,
  createUser,
  updateUser,
  deleteUserById,
};
