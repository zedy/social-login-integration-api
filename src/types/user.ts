import { Model } from 'sequelize';

export interface UserType extends Model {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

export type JWTPayload = {
  id: number;
  email: string;
  providerId?: string;
  isSocial?: boolean;
};
