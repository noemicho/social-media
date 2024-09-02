import express from 'express';
import likeController from '../controllers/likeController.js';

const router = express.Router();

router.route('/like').patch((request, response) =>likeController.like(request, response))

export default router;
