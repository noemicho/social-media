import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';

router.route('/user').post((request, response) => userController.create(request, response))


export default router