import express from 'express';
import editProfileController from '../controllers/editProfileController.js';

const router = express.Router();

router.route('/edit-profile').patch((request, response) =>editProfileController.edit(request, response))

export default router;
