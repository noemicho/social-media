import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();

router.route('/register').post((request, response) =>registerController.register(request, response))

export default router;
