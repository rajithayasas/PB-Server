import { body } from 'express-validator';

export default {
  updateAlbum: [
    body('_id').exists().withMessage('Id is required').trim(),
    body('entries').exists().withMessage('Album(entries) is required'),
  ],
  saveAlbum: [
    body('userId').exists().withMessage('userId is required'),
    body('entries').exists().withMessage('Album(entries) is required'),
  ],
};
