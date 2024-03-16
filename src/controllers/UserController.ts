// models
import User from '../models/user';

// utils
import controllerHandler from '../utils/controllerHandler';
import { getToken } from '../utils/jwt';
import parseModelData from '../utils/modelParser';
import { createProfile } from './ProfileController';

const createUser = controllerHandler(async (req) => {
  const { email } = req.body;
  let profile;

  // step 1: create user
  const [user, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      salt: '',
      ...req.body,
    },
  });

  // step 2: create profile if user is created
  if (created) {
    profile = await createProfile({
      ...req.body,
      userId: user.getDataValue('id'),
    });
  }

  return {
    created,
    profile,
    user,
  };
});

const registerUser = controllerHandler(async (req, res) => {
  const { created, profile, user } = await createUser(req, res);

  // if user is not created, return warning message
  if (!created) {
    return {
      created,
      message: 'Email already registered.',
    };
  }

  // step 1: strip all sensitive data from user object and profile object
  // and parse the db model data to plain object
  const parsedUser = parseModelData(user, 'user');
  const parsedProfile = parseModelData(profile, 'profile');

  // step 2: attach profile to user
  parsedUser.profile = parsedProfile;

  // step 3: create token
  const token = getToken({
    id: parsedUser.id,
    email: parsedUser.email,
  });

  return {
    created,
    message: 'User created successfully.',
    token,
    user: parsedUser,
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
