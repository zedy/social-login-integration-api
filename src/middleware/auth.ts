/* eslint-disable consistent-return */
import { getToken } from '../utils/jwt';
import modelFieldStripper from '../utils/modelParser';

// model
import passport from './config/passport';

/**
 * This middleware is used to login the user based off
 * of their email and password. (aka personal credentials)
 *
 * It uses the passport local strategy to authenticate the user.
 *
 * @see https://www.passportjs.org/
 */
export const loginMiddleware = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err);

    if (!user) {
      res.locals.user = null;
      res.locals.message = 'Username or password are incorrect';

      return next();
    }

    req.login(
      user,
      { session: false },
      async (error) => {
        if (error) return next(error);

        const token = getToken({
          email: user.email,
          id: user.id,
          isSocial: false,
        });

        res.locals.token = token;
        res.locals.user = modelFieldStripper(user, 'user');
        res.locals.message = 'Login successfull.';
      },
    );

    next();
  })(req, res, next);
};

/**
 * This middleware is used to login the user based off
 * of the JWT token that we would generate at any previous step.
 *
 * It uses the passport jwt strategy to authenticate the user.
 * @see https://www.passportjs.org/
 */
export const jwtMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: 'Unauthorized Access!' });

    res.locals.user = modelFieldStripper(user, 'user');
    req.user = user;
    next();
  })(req, res, next);
};

export type Session = [any, any];
