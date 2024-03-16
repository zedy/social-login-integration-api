// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import {
  startLoginProceess,
  deleteSocialLoginById,
} from '../controllers/SocialLoginController';

const socialLoginRoute = Router();

socialLoginRoute.post('/login', createRouteHandler(startLoginProceess));
socialLoginRoute.delete('/:id', createRouteHandler(deleteSocialLoginById));

export default socialLoginRoute;
