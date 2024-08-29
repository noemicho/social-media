import express from 'express';
const router = express.Router();

import postController from '../controllers/postController.js';

router.route('/post').post((request, response) => postController.create(request, response))
router.route('/post').get((request, response) => postController.getAll(request, response))
router.route('/post/:id').get((request, response) => postController.get(request, response))
router.route('/post/:id').delete((request, response) => postController.delete(request, response))
router.route('/post/:id').patch((request, response) => postController.update(request, response))

export default router