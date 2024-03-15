// libs
import * as jwt from 'jsonwebtoken';

// interface
import { JWTPayload } from '../types/user';

export const getToken = (user: JWTPayload) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });

  return token;
};

export const readToken = (token: string) => {
  const decoded = jwt.decode(token);

  return decoded;
};
