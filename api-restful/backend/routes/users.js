import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';

router.route('/user').post((request, response) => userController.create(request, response))
router.route('/user').get((request, response) => userController.getAll(request, response))
router.route('/user/:id').get((request, response) => userController.get(request, response))
router.route('/user/:id').delete((request, response) => userController.delete(request, response))
router.route('/user/:id').patch((request, response) => userController.update(request, response))

export default router