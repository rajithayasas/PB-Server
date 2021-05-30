import AlbumRepository from '../repository/album.repository';

import logger from '../helpers/winston';

const getAlbum = async (userId) => {
  try {
    return await AlbumRepository.getAlbum(userId);
  } catch (error) {
    logger.error('Error occured:getAlbum: ', error);
    throw new Error(error);
  }
};

const editAlbum = async (id, entries) => {
  try {
    return await AlbumRepository.editAlbum(id, entries);
  } catch (error) {
    logger.error('Error occured:editAlbum ', error);
    throw new Error(error);
  }
};

const saveAlbum = async (userId, entries) => {
  try {
    return await AlbumRepository.saveAlbum(userId, entries);
  } catch (error) {
    logger.error('Error occured:editAlbum ', error);
    throw new Error(error);
  }
};

const deleteAlbum = async (id) => {
  try {
    return await AlbumRepository.deleteAlbum(id);
  } catch (error) {
    logger.error('Error occured:editAlbum ', error);
    throw new Error(error);
  }
};

export default { getAlbum, editAlbum, saveAlbum, deleteAlbum };
