import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import logger from '../helpers/winston';
import AlbumService from '../services/album.service';

const fetchAlbum = async (req, res, next) => {
  try {
    logger.debug('Get Album request received');
    const { userId } = req.params;

    const data = await AlbumService.getAlbum(userId);

    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const editAlbum = async (req, res, next) => {
  try {
    logger.debug('Edit album request received');

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Invalid request', errors: errors.array() });
    }

    const { _id, entries } = req.body;

    const response = await AlbumService.editAlbum(_id, entries);
    return res.status(httpStatus.OK).json(response);
  } catch (error) {
    return next(error);
  }
};

const addAlbum = async (req, res, next) => {
  try {
    logger.debug('Save album request received');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ message: 'Invalid request', errors: errors.array() });
    }

    const { userId, entries } = req.body;

    const data = await AlbumService.saveAlbum(userId, entries);

    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteAlbum = async (req, res, next) => {
  try {
    logger.debug('Delete Album request received');
    const { id } = req.params;

    const data = await AlbumService.deleteAlbum(id);

    return res.status(httpStatus.OK).json(data);
  } catch (error) {
    return next(error);
  }
};

export default { fetchAlbum, editAlbum, addAlbum, deleteAlbum };
