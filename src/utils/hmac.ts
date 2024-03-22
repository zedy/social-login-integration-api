import crypto from 'crypto';
import queryString from 'querystring';

import 'dotenv/config';

type Params = {
  host: string | string[];
  timestamp: string | string[];
  session: string | string[];
}

/**
 * Generate HMAC hash from a message.
 *
 * @param message string
 * @returns string
 */
export const generateHmac = (message: string) => {
  const hash = crypto.createHmac('sha256', process.env.SECRET_API_KEY).update(message).digest('hex');
  return hash;
};

/**
 * Validate HMAC hash.
 *
 * @param hmac
 * @param params
 * @returns
 */

export const validateHmac = (hmac: string | string[], params: Params) => {
  if (hmac) {
    const message = queryString.stringify(params);
    const generatedHmac = generateHmac(message);

    return generatedHmac === hmac;
  }

  return false;
};
