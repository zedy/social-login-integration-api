import { DataTypes } from 'sequelize';
import sequelize from '../db/db-connection';

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bio: {
    type: DataTypes.STRING(1000),
    allowNull: false,
    defaultValue: '',
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'Users', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  socialLoginId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: { model: 'SocialLogins', key: 'id' },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
  },
}, {
  timestamps: true,
});

export default Profile;
