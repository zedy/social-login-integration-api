// libs
import { Router } from 'express';

// utils
import createRouteHandler from '../utils/routeHandler';

// controllers
import { updateProfile } from '../controllers/ProfileController';

const profileRoute = Router();

profileRoute.put('/:id', createRouteHandler(updateProfile));

export default profileRoute;
