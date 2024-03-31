/* eslint-disable consistent-return */
// utils
import { getToken } from '../utils/jwt';
import modelFieldStripper from '../utils/modelParser';

// model
import passport from './config/passport';
import { validateHmac } from '../utils/hmac';

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

/**
 * A custom middleware based on HMAC validation.
 * This middleware is used to validate the HMAC signature
 * that is sent in the query params of the request from
 * the client.
 *
 * Client will generate a HMAC signature based on the
 * query params and send it in the request. This middleware
 * will validate the HMAC signature and allow the request
 * to pass through if the signature is valid.
 */
export const hmacMiddleware = (req, res, next) => {
  const { query } = req;

  if (query) {
    const {
      hmac, host, timestamp, session,
    } = query;
    const params = {
      host, session, timestamp,
    };

    if (validateHmac(hmac, params)) return next();

    return res.status(401).json({ message: 'Unauthorized Access!' });
  }

  return res.status(401).json({ message: 'Unauthorized Access!' });
};

export type Session = [any, any];
