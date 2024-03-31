// libs
import { Router } from 'express';

// utils
import { loginMiddleware, jwtMiddleware } from '../middleware/auth';
import createRouteHandler from '../utils/routeHandler';
import { loginUserWithCredentials } from '../controllers/AuthController';

const authRoute = Router();

authRoute.post('/login', loginMiddleware, createRouteHandler(loginUserWithCredentials));
authRoute.post('/user', jwtMiddleware, createRouteHandler(loginUserWithCredentials));
authRoute.get('/test', createRouteHandler(async (req, res) => {
  res.json({ message: 'Test route' });
}));

export default authRoute;
