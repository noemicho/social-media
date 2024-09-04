import express from 'express';
import SocialMediaFacade from '../Facade/SocialMediaFacade.js';
import userController from '../controllers/userController.js';
import postController from '../controllers/postController.js';
import commentController from '../controllers/commentController.js';
import likeController from '../controllers/likeController.js';
import profileController from '../controllers/profileController.js';
import editProfileController from '../controllers/editProfileController.js';
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';

const router = express.Router();

const socialMediaFacade = new SocialMediaFacade(
    userController,
    registerController,
    loginController,
    postController,
    commentController,
    likeController,
    profileController,
    editProfileController
);

router.patch('/edit-profile', (req, res) => {
    const result = socialMediaFacade.editUserProfile(req, res);
    //res.json(result);
});

export default router;
