export default function parseModelData(model, type) {
  if (!model) throw new Error('Model is required');

  // add a new field to user/socialLogin models to indicate if it's a social login or not
  if (type === 'user' || type === 'social') {
    model.setDataValue('isSocial', type === 'social');
  }

  // get the data from the model, we don't want to return the model itself
  const data = model.dataValues;

  // remove any sensitive data
  if (type === 'user') {
    delete data.password;
    delete data.salt;
  }

  // if the Profile model is attached under an alias, we want to
  // normalize the date and replace the alias with the actual model name [profile]
  if (data.userProfile) {
    data.profile = data.userProfile.dataValues;
    delete data.userProfile;
  } else if (data.socialProfile) {
    data.profile = data.socialProfile.dataValues;
    delete data.socialProfile;
  }

  return data;
}
