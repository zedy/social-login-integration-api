// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import {
  startLoginProceess,
  deleteSocialLoginById,
} from '../controllers/SocialLoginController';
import { hmacMiddleware } from '../middleware/auth';

const socialLoginRoute = Router();

socialLoginRoute.post('/login', hmacMiddleware, createRouteHandler(startLoginProceess));
socialLoginRoute.delete('/:id', hmacMiddleware, createRouteHandler(deleteSocialLoginById));

export default socialLoginRoute;
