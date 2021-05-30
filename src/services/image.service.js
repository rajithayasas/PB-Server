/* eslint-disable import/prefer-default-export */
import ImagesRepository from '../repository/image.repository';

import logger from '../helpers/winston';

const getImages = async (userId) => {
  try {
    return await ImagesRepository.getImages(userId);
  } catch (error) {
    logger.error('Error occured:getImages: ', error);
    throw new Error(error);
  }
};

export default { getImages };
