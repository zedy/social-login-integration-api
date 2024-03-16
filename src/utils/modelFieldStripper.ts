export default function modelFieldStripper(model, type) {
  const data = model.dataValues;

  if (type === 'user') {
    delete data.password;
    delete data.salt;
  }

  return data;
}
