import express from 'express';
import profileController from '../controllers/profileController.js';

const router = express.Router();

router.route('/profile').post((request, response) =>profileController.getProfile(request, response))

export default router;
