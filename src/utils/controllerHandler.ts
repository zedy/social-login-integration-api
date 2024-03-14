// utils
import logger from '../utils/helpers/errorLogger';

/**
 * HoF to handle the controller.
 * Wraps the controller in a try/catch block and logs any errors.
 *
 * @param callback Function
 * @returns
 */
const controllerHandler = (callback) => async (req, res) => {
  try {
    const data = await callback(req, res);

    return {
      success: true,
      ...data,
    };
  } catch (e) {
    console.debug(e);

    logger.log({
      level: 'error',
      message: e,
    });
    return {
      success: false,
      message: e.message,
    };
  }
};

export default controllerHandler;
