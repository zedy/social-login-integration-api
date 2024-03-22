// models
import { Op } from 'sequelize';
import SocialLogin from '../models/socialLogin';

// utils
import controllerHandler from '../utils/controllerHandler';

// models
import Profile from '../models/profile';
import parseModelData from '../utils/modelParser';
import { getToken } from '../utils/jwt';
import { createProfile } from './ProfileController';

/**
 * When the oauth process is completed on the client side, the client will send the
 * user's email and providerId to the server to start the login process.
 *
 * We will create a new social login if the user is not found in the database.
 * Where we match the user by email or providerId. (as not all providers return both).
 *
 * If the user is found, we will return the user's data and a token.
 * If the user is not found, we will create a new social login and a new profile.
 *
 * Before returning the user's data, we will strip any sensitive data and parse the
 *
 */
const startLoginProceess = controllerHandler(async (req) => {
  const { email, provider, providerId } = req.body;
  let profile;

  // step 1: create or find social login aka "user"
  const [socialLogin, created] = await SocialLogin.findOrCreate({
    where: {
      [Op.or]: [{ email }, { providerId }],
      provider,
    },
    include: [
      {
        model: Profile,
        as: 'socialProfile',
      },
    ],
    defaults: {
      ...req.body,
    },
  });

  // step 2: stip any sensitive data and parse the db model data
  const parsedUser = parseModelData(socialLogin, 'social');

  // step 3: create profile if social login is created
  if (created) {
    profile = await createProfile({
      ...req.body,
      socialLoginId: socialLogin.getDataValue('id'),
    });

    // step 3.1: strip any sensitive data and parse the db model data
    const parsedProfile = parseModelData(profile, 'profile');

    // step 3.2: attach profile to user
    parsedUser.profile = parsedProfile;
  }

  // step 5: create token
  const token = getToken({
    id: parsedUser.id,
    email: parsedUser.email,
    isSocial: true,
    providerId: parsedUser.providerId,
  });

  return {
    message: 'Login successful.',
    token,
    user: parsedUser,
  };
});

const getSocialLoginById = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await SocialLogin.findByPk(id);
  return result;
});

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
  startLoginProceess,
  createSocialLogin,
  deleteSocialLoginById,
  getSocialLoginById,
};
