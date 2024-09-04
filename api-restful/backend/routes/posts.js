import express from 'express';
import SocialMediaFacade from '../Facade/SocialMediaFacade.js';
import userController from '..//controllers/userController.js';
import postController from '..//controllers/postController.js';
import commentController from '..//controllers/commentController.js';
import likeController from '..//controllers/likeController.js';
import profileController from '..//controllers/profileController.js';
import editProfileController from '..//controllers/editProfileController.js';
import registerController from '..//controllers/registerController.js';
import loginController from '..//controllers/loginController.js';

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

router.post('/post', (req, res) => {
    const result = socialMediaFacade.createPost(req, res);
    //res.json(result);
});

router.get('/post', (req, res) => {
    const result = socialMediaFacade.getAllPosts(req, res);
    //res.json(result);
});

router.get('/post/:id', (req, res) => {
    const result = socialMediaFacade.getPostById(req, res);
    //res.json(result);
});

router.delete('/post/:id', (req, res) => {
    const result = socialMediaFacade.deletePost(req, res);
    //res.json(result);
});

router.patch('/post/:id', (req, res) => {
    const result = socialMediaFacade.updatePost(req, res);
    //res.json(result);
});

router.post('/post/:id/comment', (req, res) => {
    const result = socialMediaFacade.commentOnPost(req, res);
    //res.json(result);
});

router.delete('/post/:postId/comment/:commentId', (req, res) => {
    const result = socialMediaFacade.deleteComment(req, res);
    //res.json(result);
});

export default router;
