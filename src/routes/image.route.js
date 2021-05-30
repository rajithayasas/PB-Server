import express from 'express';

import imageController from '../controllers/image.controller';

const router = express.Router();

router.get('/:userId', imageController.fetchImages);

export default router;
