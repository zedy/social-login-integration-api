// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import {
  updateUser,
  createUser,
  deleteUserById,
  getUserById,
} from '../controllers/UserController';

const userRoute = Router();

userRoute.post('/create', createRouteHandler(createUser));
userRoute.put('/update/:id', createRouteHandler(updateUser));
userRoute.get('/:id', createRouteHandler(getUserById));
userRoute.delete('/:id', createRouteHandler(deleteUserById));

export default userRoute;
