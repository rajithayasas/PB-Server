import express from 'express';

import validations from '../validations/album.validatation';
import albumController from '../controllers/album.controller';

const router = express.Router();

router.get('/:userId', albumController.fetchAlbum);
router.delete('/:id', albumController.deleteAlbum);
router.put('/update', validations.updateAlbum, albumController.editAlbum);
router.post('/save', validations.saveAlbum, albumController.addAlbum);

export default router;
