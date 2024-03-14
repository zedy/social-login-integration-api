import { DataTypes } from 'sequelize';
import sequelize from '../db/db-connection';
import { hashString } from '../utils/passHash';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
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
});

// schema hook which will fire prior to user creation
User.beforeCreate((user) => {
  const hashedValues = hashString(user.getDataValue('password'));

  user.setDataValue('salt', hashedValues.salt);
  user.setDataValue('password', hashedValues.hash);
});

export default User;
