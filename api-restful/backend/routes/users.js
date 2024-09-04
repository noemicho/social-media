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

router.post('/users', (req, res) => {
    const result = socialMediaFacade.registerUser(req, res);
    //res.json(result);
});

router.get('/users', (req, res) => {
    const result = socialMediaFacade.getAllUsers(req, res);
    //res.json(result);
});

router.get('/users/:id', (req, res) => {
    const result = socialMediaFacade.getUserById(req, res);
    //res.json(result);
});

router.delete('/users/:id', (req, res) => {
    const result = socialMediaFacade.deleteUser(req, res);
    //res.json(result);
});

router.patch('/users/:id', (req, res) => {
    const result = socialMediaFacade.updateUser(req, res);
    //res.json(result);
});

export default router;
