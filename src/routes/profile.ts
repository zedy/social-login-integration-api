// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import { updateProfile } from '../controllers/ProfileController';
import { jwtMiddleware } from '../middleware/auth';

const profileRoute = Router();

profileRoute.put('/:id', jwtMiddleware, createRouteHandler(updateProfile));

export default profileRoute;
