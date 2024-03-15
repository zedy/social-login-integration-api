// libs
import { Router } from 'express';

// utils
import { loginMiddleware, jwtMiddleware } from '../middleware/auth';
import createRouteHandler from '../utils/routeHandler';
import { loginUserWithCredentials } from '../controllers/AuthController';

const authRoute = Router();

authRoute.post('/login', loginMiddleware, createRouteHandler(loginUserWithCredentials));
authRoute.post('/user', jwtMiddleware, createRouteHandler(loginUserWithCredentials));

export default authRoute;
