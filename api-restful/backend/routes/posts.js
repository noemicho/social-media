import express from 'express';
const router = express.Router();

import postController from '../controllers/postController.js';

// Rotas existentes
router.route('/post').post((request, response) => postController.create(request, response));
router.route('/post').get((request, response) => postController.getAll(request, response));
router.route('/post/:id').get((request, response) => postController.get(request, response));
router.route('/post/:id').delete((request, response) => postController.delete(request, response));
router.route('/post/:id').patch((request, response) => postController.update(request, response));

// Nova rota para adicionar comentários
router.route('/post/:id/comment').post((request, response) => postController.addComment(request, response)); // Adicionando a rota para comentários
// Rota para deletar um comentário
router.route('/post/:postId/comment/:commentId').delete((request, response) => postController.deleteComment(request, response));

export default router;
