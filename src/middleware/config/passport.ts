// libs
import { ExtractJwt, Strategy } from 'passport-jwt';
import passport from 'passport';

// custom
import { Strategy as LocalStrategy } from 'passport-local';

// utils
import { checkHashEquality } from '../../utils/passHash';
import logger from '../../utils/helpers/errorLogger';
import { findUser } from '../../controllers/UserController';

// models
import SocialLogin from '../../models/socialLogin';
import User from '../../models/user';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// Strategy for auth based login
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  session: false,
}, async (email, password, done) => {
  try {
    const user = await findUser({ email });

    if (!user) return done(null, false);

    if (!checkHashEquality(user.getDataValue('password'), user.getDataValue('salt'), password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(e, false);
  }
}));

// Strategy for auth based on JWT
passport.use('jwt', new Strategy(opts, async (jwtPayload, done) => {
  try {
    const model = jwtPayload.user.isSocial ? SocialLogin : User;
    const user = await model.findByPk(jwtPayload.user.id);

    if (!user) {
      return done(null, false, { message: 'User not found' });
    }

    return done(null, user, { message: 'Auth successfull' });
  } catch (e) {
    logger.log({
      level: 'error',
      message: e,
    });

    return done(null, false, { message: 'Error during auth!' });
  }
}));

export default passport;
