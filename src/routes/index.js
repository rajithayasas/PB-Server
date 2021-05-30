import express from 'express';

import imageRoute from './image.route';
import albumRoute from './album.route';

// base route - /api/v1
const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  return res.status(200).send('UP');
});

router.use('/images', imageRoute);
router.use('/albums', albumRoute);

export default router;
