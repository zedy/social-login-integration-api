// models
import Profile from '../models/profile';

// utils
import controllerHandler from '../utils/controllerHandler';

const createProfile = async (payload) => {
  const profile = await Profile.create({
    ...payload,
  });

  return profile;
};

const updateProfile = controllerHandler(async (req) => {
  const { id } = req.params;

  const result = await Profile.update(id, req.body);
  return result;
});

export {
  createProfile,
  updateProfile,
};
