// models
import User from '../models/user';
import Profile from '../models/profile';

// utils
import controllerHandler from '../utils/controllerHandler';
import { getToken } from '../utils/jwt';
import modelFieldStripper from '../utils/modelFieldStripper';

const createUser = controllerHandler(async (req) => {
  let profile;

  // step 1: create user
  const [user, created] = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      salt: '',
      ...req.body,
    },
  });

  // step 2: create profile if user is created
  if (created) {
    profile = await Profile.create({
      userId: user.getDataValue('id'),
      ...req.body,
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
  const stippedUser = modelFieldStripper(user, 'user');
  const strippedProfile = modelFieldStripper(profile, 'profile');

  // step 2: attach profile to user
  stippedUser.profile = strippedProfile;

  // step 3: create token
  const token = getToken({
    id: stippedUser.id,
    email: stippedUser.email,
  });

  return {
    created,
    message: 'User created successfully.',
    token,
    user: stippedUser,
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
