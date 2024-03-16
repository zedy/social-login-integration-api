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
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
});

export default Profile;
