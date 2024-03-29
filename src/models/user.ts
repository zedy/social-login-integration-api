import { DataTypes } from 'sequelize';
import sequelize from '../db/db-connection';
import { hashString } from '../utils/passHash';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email'],
    },
  ],
});

// schema hook which will fire prior to user creation
User.beforeCreate((user) => {
  const hashedValues = hashString(user.getDataValue('password'));

  user.setDataValue('salt', hashedValues.salt);
  user.setDataValue('password', hashedValues.hash);
});

export default User;
