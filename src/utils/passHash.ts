// libs
import crypto from 'crypto';

/**
 * This function takes a string (that represents the unhashed password)
 * and a salt and returns a hash and the salt.
 *
 * Use this function in conjunction with checkHashEquality to hash and compare passwords.
 *
 * @param str password
 * @param salt
 * @returns Record<string, string>
 */
export const hashString = (str: string, salt?: string) => {
  const saltVal = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(str, saltVal, 1000, 64, 'sha512').toString('hex');

  return {
    salt: saltVal,
    hash,
  };
};

/**
 * This function takes a password, a salt, and a user's password and returns a boolean.
 * It is used to compare a user's password to the hashed password in the database.
 *
 * @param password
 * @param salt
 * @param userPass
 * @returns boolean
 */
export const checkHashEquality = (password: string, salt: string, userPass: string) => {
  const testHash = hashString(userPass, salt);

  return testHash.hash.toString() === password.toString();
};
