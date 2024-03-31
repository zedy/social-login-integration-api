import { rateLimit } from 'express-rate-limit';

/**
 * Rate limiting middleware
 *
 * TODO: add redis support?
 */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // minutes * seconds * milliseconds
  limit: 15,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

export default limiter;
