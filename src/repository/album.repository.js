import httpStatus from 'http-status';
import mongoose from 'mongoose';
import logger from '../helpers/winston';
import AlbumModel from '../models/album.model';
import APIError from '../helpers/api-error';

/** Fetch Image
 * Return: Image Obj
 * @param { Number } userId
 */
const getAlbum = async (userId) => {
  try {
    const albumDetail = AlbumModel.findOne({ userId });

    if (albumDetail) {
      return albumDetail;
    }

    throw new APIError({
      message: 'Album is not found',
      status: httpStatus.INTERNAL_SERVER_ERROR,
    });
  } catch (error) {
    logger.error('Error occured:getAlbum: ', error);
    throw new Error(error);
  }
};

/** Update Albulm
 * Return: Album Obj
 * @param { String } _id
 * @param { Array } entries
 */
const editAlbum = async (id, entries) => {
  try {
    const albumData = await AlbumModel.findOneAndUpdate(
      { _id: id },
      {
        entries,
      },
      { new: true }
    );

    if (albumData) {
      return albumData;
    }

    throw new APIError({
      message: 'Failed to update album',
      status: httpStatus.BAD_REQUEST,
      isPublic: true,
    });
  } catch (error) {
    logger.error('Error occured:editAlbum ', error);
    throw new Error(error);
  }
};

/** Save Album
 * Return: Album Obj
 * @param { String } userId
 * @param { Array } entries
 */
const saveAlbum = async (userId, entries) => {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const album = new AlbumModel({
      userId,
      entries,
    });

    const addAlbum = await album.save({ session });
    if (addAlbum) {
      await session.commitTransaction();
      return addAlbum.transform();
    }

    throw new APIError({
      message: 'Save album failed',
      status: httpStatus.BAD_REQUEST,
      isPublic: true,
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error('Error occured:saveAlbum: ', error);
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

/** Delete Album
 * Return: Album Obj
 * @param { String } _id
 */
const deleteAlbum = async (_id) => {
  let session = null;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const removePO = await AlbumModel.remove({ _id }, { session });
    if (!removePO) throw new Error('Oops! Something went wrong. Album is not removed');

    await session.commitTransaction();

    return {
      message: 'Album delete successfully',
      data: true,
    };
  } catch (error) {
    logger.error('Error occured:deleteAlbum: ', error);
    await session.abortTransaction();
    throw new Error(error);
  } finally {
    session.endSession();
  }
};

export default { getAlbum, editAlbum, saveAlbum, deleteAlbum };
