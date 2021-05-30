import httpStatus from 'http-status';
import logger from '../helpers/winston';

import ImageModel from '../models/image.model';
import APIError from '../helpers/api-error';

/** Fetch Image
 * Return: Image Obj
 * @param { String } userId
 */
const getImages = async (userId) => {
  try {
    const imageDetail = ImageModel.findOne({ userId });

    if (imageDetail) {
      return imageDetail;
    }

    throw new APIError({
      message: 'Images is not found',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  } catch (error) {
    logger.error('Error occured:getImages: ', error);
    throw new Error(error);
  }
};

export default { getImages };
