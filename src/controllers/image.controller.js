import httpStatus from 'http-status';
import logger from '../helpers/winston';

import ImageService from '../services/image.service';

const fetchImages = async (req, res, next) => {
  try {
    logger.debug('Get images request received');
    const { userId } = req.params;

    const data = await ImageService.getImages(userId);
    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

export default { fetchImages };
