// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import {
  updateUser,
  registerUser,
  deleteUserById,
  getUserById,
} from '../controllers/UserController';
import { hmacMiddleware, jwtMiddleware } from '../middleware/auth';

const userRoute = Router();

userRoute.post('/create', hmacMiddleware, createRouteHandler(registerUser));
userRoute.put('/update/:id', jwtMiddleware, createRouteHandler(updateUser));
userRoute.get('/:id', jwtMiddleware, createRouteHandler(getUserById));
userRoute.delete('/:id', jwtMiddleware, createRouteHandler(deleteUserById));

export default userRoute;
